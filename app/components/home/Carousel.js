import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Platform, View, ScrollView, Text, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Spinner from 'react-native-loading-spinner-overlay';
import { sliderWidth, itemWidth } from './SliderEntry.style';
import SliderEntry from './SliderEntry';
import styles, { colors } from './index.style';
import { ENTRIES1, ENTRIES2 } from 'app/static/entries';
import { scrollInterpolators, animatedStyles } from 'app/utils/animations';
import { createStructuredSelector } from 'reselect';
import { categoryMusic, topSinger, topComposer } from 'app/reselects/musicReselect';
import { startLoadingMusic } from 'app/reselects/loadingMusicReselect';
import { getDataMusic } from 'app/actions/musicActions';

const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;
const SLIDER_2_FIRST_ITEM = 3;
const SLIDER_3_FIRST_ITEM = 5;

class CarouselComponent extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            slider2ActiveSlide: SLIDER_2_FIRST_ITEM,
            slider3ActiveSlide: SLIDER_3_FIRST_ITEM,
        };
    }

    componentDidMount () {
        this.props.getDataHomeScreen();
    }

    _renderItem ({item, index}) {
        return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
    }

    _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <SliderEntry
              data={item}
              even={(index + 1) % 2 === 0}
              parallax={true}
              parallaxProps={parallaxProps}
            />
        );
    }

    _renderLightItem ({item, index}) {
        return <SliderEntry data={item} even={false} />;
    }

    _renderDarkItem ({item, index}) {
        return <SliderEntry data={item} even={true} />;
    }

    
    ListCategory () {
        const { slider1ActiveSlide } = this.state;
        if(!this.props.categoryMusic){
            return null;
        }

        return (
            <View style={styles.exampleContainer}>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Category') }>
                    <Text style={styles.title}>Music Category</Text>
                    <Text style={styles.subtitle}>view all</Text>
                </TouchableOpacity>
                
                <Carousel
                  ref={c => this._slider1Ref = c}
                  data={this.props.categoryMusic}
                  renderItem={this._renderItemWithParallax}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  hasParallaxImages={true}
                  firstItem={SLIDER_1_FIRST_ITEM}
                  inactiveSlideScale={0.94}
                  inactiveSlideOpacity={0.7}
                  // inactiveSlideShift={20}
                  containerCustomStyle={styles.slider}
                  contentContainerCustomStyle={styles.sliderContentContainer}
                  loop={true}
                  loopClonesPerSide={2}
                  autoplay={true}
                  autoplayDelay={500}
                  autoplayInterval={3000}
                  onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                />
                <Pagination
                  dotsLength={this.props.categoryMusic.length}
                  activeDotIndex={slider1ActiveSlide}
                  containerStyle={styles.paginationContainer}
                  dotColor={'rgba(255, 255, 255, 0.92)'}
                  dotStyle={styles.paginationDot}
                  inactiveDotColor={colors.black}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                  carouselRef={this._slider1Ref}
                  tappableDots={!!this._slider1Ref}
                />
            </View>
        );
    }
    
   
    ListSingers (number, title) {
      const { slider2ActiveSlide } = this.state;
      if(!this.props.topSinger){
        return null;
      }
      return (
          <View style={styles.exampleContainer}>
            <TouchableOpacity onPress={ () => this.props.navigation.navigate('Singer') }>
                <Text style={styles.title}>Top singers</Text>
                <Text style={styles.subtitle}>View all</Text>
            </TouchableOpacity>
              
              <Carousel
                data={this.props.topSinger}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                inactiveSlideScale={0.95}
                inactiveSlideOpacity={1}
                enableMomentum={true}
                activeSlideAlignment={'start'}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                loop={true}
                loopClonesPerSide={2}
                autoplay={true}
                autoplayDelay={500}
                autoplayInterval={3000}
                activeAnimationType={'spring'}
                activeAnimationOptions={{
                    friction: 4,
                    tension: 40
                }}
                onSnapToItem={(index) => this.setState({ slider2ActiveSlide: index }) }
              />
              <Pagination
                dotsLength={this.props.topSinger.length}
                activeDotIndex={slider2ActiveSlide}
                containerStyle={styles.paginationContainer}
                dotColor={'rgba(255, 255, 255, 0.92)'}
                dotStyle={styles.paginationDot}
                inactiveDotColor={colors.black}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                carouselRef={this._slider1Ref}
                tappableDots={!!this._slider1Ref}
              />
          </View>
      );
    }
    
    
    ListComposers (type) {
        const isTinder = type === 'tinder';
        const { slider3ActiveSlide } = this.state;
        if(!this.props.topComposer){
            return null;
        }
        return (
            <View style={styles.exampleContainer}>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Singer') }>
                    <Text style={styles.title}>Top composers</Text>
                    <Text style={styles.subtitle}>View all</Text>
                </TouchableOpacity>
                <Carousel
                  data={this.props.topComposer}
                  renderItem={isTinder ? this._renderLightItem : this._renderItem}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  containerCustomStyle={styles.slider}
                  contentContainerCustomStyle={styles.sliderContentContainer}
                  layout={type}
                  loop={true}
                  loopClonesPerSide={2}
                  autoplay={true}
                  autoplayDelay={500}
                  autoplayInterval={3000}
                  onSnapToItem={(index) => this.setState({ slider3ActiveSlide: index }) }
                />
                <Pagination
                  dotsLength={this.props.topComposer.length}
                  activeDotIndex={slider3ActiveSlide}
                  containerStyle={styles.paginationContainer}
                  dotColor={'rgba(255, 255, 255, 0.92)'}
                  dotStyle={styles.paginationDot}
                  inactiveDotColor={colors.black}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                  carouselRef={this._slider1Ref}
                  tappableDots={!!this._slider1Ref}
                />
            </View>
        );
    }

    customExample (number, title, refNumber, renderItemFunc) {
        const isEven = refNumber % 2 === 0;

        // Do not render examples on Android; because of the zIndex bug, they won't work as is
        return !IS_ANDROID ? (
            <View style={[styles.exampleContainer, isEven ? styles.exampleContainerDark : styles.exampleContainerLight]}>
                <Text style={[styles.title, isEven ? {} : styles.titleDark]}>Top composers</Text>
                <Text style={[styles.subtitle, isEven ? {} : styles.titleDark]}>View all</Text>
                <Carousel
                  data={isEven ? ENTRIES2 : ENTRIES1}
                  renderItem={renderItemFunc}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  containerCustomStyle={styles.slider}
                  contentContainerCustomStyle={styles.sliderContentContainer}
                  scrollInterpolator={scrollInterpolators[`scrollInterpolator${refNumber}`]}
                  slideInterpolatedStyle={animatedStyles[`animatedStyles${refNumber}`]}
                  useScrollView={true}
                />
            </View>
        ) : false;
    }

    get gradient () {
        return (
            <LinearGradient
              colors={[colors.background1, colors.background2]}
              startPoint={{ x: 1, y: 0 }}
              endPoint={{ x: 0, y: 1 }}
              style={styles.gradient}
            />
        );
    }

    render () {
        const Categories = this.ListCategory(1, 'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots');
        const Singers = this.ListSingers(2, 'Momentum | Left-aligned | Active animation| | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots');
        const Composers = this.ListComposers('stack');
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <StatusBar
                      translucent={true}
                      backgroundColor={'rgba(0, 0, 0, 0.3)'}
                      barStyle={'light-content'}
                    />
                    { this.gradient }
                    {this.props.loadingMusic ? (
                        <Spinner
                            visible={this.props.loadingMusic}
                            textContent={'Loading...'}
                        />
                    ) : (
                        <ScrollView
                            style={styles.scrollview}
                            scrollEventThrottle={200}
                            directionalLockEnabled={true}
                        >
                            { Categories }
                            { Singers }
                            { Composers }
                        </ScrollView>
                    )}
                    
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    loadingMusic: startLoadingMusic,
    categoryMusic: categoryMusic,
    topSinger: topSinger,
    topComposer: topComposer
});

const mapDispatchToProps = dispatch => ({
    getDataHomeScreen: () => dispatch(getDataMusic())
});

export default connect(mapStateToProps, mapDispatchToProps)(CarouselComponent);
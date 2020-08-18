import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Toast } from '@ant-design/react-native';
import { connect } from 'react-redux';
import AlbumArt from './AlbumArt';
import TrackDetails from './TrackDetails';
import SeekBar from './SeekBar';
import Controls from './Controls';
import Video from 'react-native-video';
import LyricSong from './Lyric';
import { getDetailSongById } from 'app/actions/detailSongActions';
import defaultString from '../global-style';

class Player extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      paused: true,
      totalLength: 1,
      currentPosition: 0,
      repeatOn: false,
      shuffleOn: true
    };
  }

  setDuration(data) {
    this.setState({ 
      totalLength: Math.floor(data.duration),
    }, () => {
      this.setState({paused: false});
    });
  }

  setTime(data) {
    this.setState({ currentPosition: Math.floor(data.currentTime) });
  }

  seek(time) {
    time = Math.round(time);
    this.refs.audioElement && this.refs.audioElement.seek(time);
    console.log(time);
    this.setState({
      currentPosition: time,
      paused: false,
    });
  }

  onBack() {
      this.refs.audioElement.seek(this.state.currentPosition - 10);
      this.setState({
        currentPosition: this.state.currentPosition - 10,
      });
  }

  onForward() {
    this.refs.audioElement.seek(this.state.currentPosition + 10);
    this.setState({
      currentPosition: this.state.currentPosition + 10,
    });
  }

  onNextSong(id) {
    this.props.nextPrevSong(id, 1);
    this.refs.audioElement.seek(0);
    this.setState({
      currentPosition: 0,
      paused: false
    });
  }

  onPreviousSong(id) {
    this.props.nextPrevSong(id, 0);
    this.refs.audioElement.seek(0);
    this.setState({
      currentPosition: 0,
      paused: false
    });
  }

  isEmpty(obj) {
    for(let prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return JSON.stringify(obj) === JSON.stringify({});
  }

  onEnd = () => {
    if(this.state.repeatOn){
      this.refs.audioElement.seek(0);
      this.setState({
        currentPosition: 0,
        paused: false
      });
    } else if(this.state.shuffleOn) {
      this.props.nextPrevSong(this.props.tracks.id, 1);
    } else {
      this.setState({paused: true});
    }
  }

  videoError = () => {
    Toast.fail('Load failed !!!');
  }


  render() {

    const track = this.props.tracks;
    const { goBack } = this.props.navigation;

    const video = this.isEmpty(track) ? null : (
      <Video source={{ uri: track.url_song }} // Can be a URL or a local file.
        ref="audioElement"
        playInBackground={true}
        playWhenInactive={true}
        paused={this.state.paused}   // Pauses playback entirely.
        resizeMode="cover"           // Fill the whole screen at aspect ratio.
        repeat={this.state.repeatOn}  
        // onLoadStart={this.loadStart} // Callback when video starts to load
        // onReadyForDisplay={this.readyForPlay}
        onLoad={this.setDuration.bind(this)}    // Callback when video loads
        onProgress={this.setTime.bind(this)}    // Callback every ~250ms with currentTime
        onEnd={this.onEnd}           // Callback when playback finishes
        onError={this.videoError}    // Callback when video cannot be loaded
        style={styles.audioElement}
      />
    );

    return (
      <>
      { this.isEmpty(track) ? null : (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => goBack()}>
            <Image 
              style={{ tintColor: defaultString.darkColor, marginLeft: 24 }}
              source={require('app/components/img/left-arrow.png')}
            />
          </TouchableOpacity>
          <AlbumArt url={track.url_image} />
          <TrackDetails title={track.name_song} artist={track.name_singer} />
          <SeekBar
            onSeek={this.seek.bind(this)}
            trackLength={this.state.totalLength}
            onSlidingStart={() => this.setState({ paused: true })}
            currentPosition={this.state.currentPosition}
          />
          <Controls
            onPressRepeat={() => this.setState({ repeatOn: !this.state.repeatOn, shuffleOn: false })}
            repeatOn={this.state.repeatOn}
            shuffleOn={this.state.shuffleOn}
            onPressShuffle={() => this.setState({ shuffleOn: !this.state.shuffleOn, repeatOn: false })}
            onPressPlay={() => this.setState({ paused: false })}
            onPressPause={() => this.setState({ paused: true })}
            onBack={this.onBack.bind(this)}
            onForward={this.onForward.bind(this)}
            paused={this.state.paused}
            onPrevious={() => this.onPreviousSong(track.id)}
            onNext={() => this.onNextSong(track.id)}
          />
          {video}
          <LyricSong lyric={track.lyric_song}/>
        </View>
      )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  nextPrevSong: (id, status) => dispatch(getDetailSongById(id, status))
})

export default connect(null, mapDispatchToProps)(Player);

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  audioElement: {
    height: 0,
    width: 0,
  }
};
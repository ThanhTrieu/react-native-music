import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useDebounce } from 'use-debounce';
import { StyleSheet, SafeAreaView, ScrollView, View  } from 'react-native';
import { Searchbar, Divider, List } from 'react-native-paper';
import { searchMusic } from 'app/actions/searchActions';
import { searchMusicData } from 'app/reselects/searchReselect';

const Search = ({ navigation }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState(''); 
  const [keyword] = useDebounce(searchQuery, 500);
  const onChangeSearch = query => setSearchQuery(query);
  const { listMusics } = useSelector(createStructuredSelector({
    listMusics: searchMusicData
  }));


  const searchDataMusic = (key) => {
    dispatch(searchMusic(key))
  }

  React.useEffect(() => {
    if(keyword.length > 0){
      searchDataMusic(keyword);
    }
  }, [keyword]);


  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <ScrollView>
      { listMusics.map((item, index) => (
        <View key={index}>
          <List.Item
            title={item.name_song}
            description={item.name_singer}
            onPress={() => navigation.navigate('SoundRoute',{ id: item.id_song })}
          />
          <Divider/>
        </View>
      )) }
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    textAlign: 'center',
  }
});

export default React.memo(Search);
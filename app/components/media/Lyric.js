import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView 
} from 'react-native';


const LyricSong = ({lyric}) => {
  return(
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.text_song}>
          <Text>{lyric}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default React.memo(LyricSong);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  text_song: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  }
});
import React from 'react';
import { View } from 'react-native';
import SearchData from 'app/components/search/Search';
import styles from './styles';

export default function Search({ navigation }) {
  return (
    <View style={styles.container}>
      <SearchData navigation={navigation} />
    </View>
  );
}

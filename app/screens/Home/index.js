import React from 'react';
import { View } from 'react-native';
import CarouselComponent from 'app/components/home/Carousel';
import styles from './styles';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <CarouselComponent navigation={navigation} />
    </View>
  );
}

import React from 'react';
import { View } from 'react-native';
import CarouselComponent from 'app/components/home/Carousel';
import styles from './styles';

export default function Home() {
  return (
    <View style={styles.container}>
      <CarouselComponent/>
    </View>
  );
}

import * as React from 'react';
import { Text, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import {
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import styles from './styles';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={{backgroundColor: '#E5E5EA'}}>
      <View style={styles.container}>
        <Avatar.Image size={90} source={require('app/assets/author-info.png')} />
        <Text style={styles.text_author}>Nguyen Thanh Trieu</Text>
        <Text style={styles.text_author}>My music version 1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  );
}

import React from 'react';
import defaultString from '../global-style';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

const TrackDetails = ({
  title,
  artist,
  onTitlePress,
  onArtistPress
}) => (
  <View style={styles.container}>
    <View style={styles.detailsWrapper}>
      <Text style={styles.title} onPress={onTitlePress}>{title}</Text>
      <Text style={styles.artist} onPress={onArtistPress}>{artist}</Text>
    </View>
  </View>
);

export default React.memo(TrackDetails);

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    paddingRight: 20,
  },
  detailsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: defaultString.darkColor,
    textAlign: 'center',
  },
  artist: {
    color: defaultString.darkColor,
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    opacity: 0.72,
  },
  moreButton: {
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 2,
    opacity: 0.72,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreButtonIcon: {
    height: 17,
    width: 17,
  }
});
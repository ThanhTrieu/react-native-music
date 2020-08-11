import React from 'react';
import defaultString from '../global-style';

import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const Controls = ({
  paused,
  shuffleOn,
  repeatOn,
  onPressPlay,
  onPressPause,
  onBack,
  onForward,
  onPressShuffle,
  onPressRepeat,
  onNext,
  onPrevious
}) => (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.0} onPress={onPressShuffle}>
        <Image style={[{ tintColor: defaultString.darkColor } , styles.secondaryControl, shuffleOn ? [] : styles.off]}
          source={require('app/components/img/ic_shuffle_white.png')} />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={onBack} activeOpacity={0.0} style={styles.replay}>
        <Image style={[{ tintColor: defaultString.darkColor } , styles.secondaryControlBackNext, styles.off ]}
          source={require('app/components/img/ic_replay_10_40.png')} />
      </TouchableOpacity>

      <View style={{ width: 40 }} />
      <TouchableOpacity
        onPress={() => onPrevious()}
      >
        <Image style={{ tintColor: defaultString.darkColor }} source={require('app/components/img/ic_skip_previous_white_36pt.png')} />
      </TouchableOpacity>
      <View style={{ width: 20 }} />
      {!paused ?
        <TouchableOpacity onPress={onPressPause}>
          <View style={styles.playButton}>
            <Image style={{ tintColor: defaultString.darkColor }} source={require('app/components/img/ic_pause_white_48pt.png')} />
          </View>
        </TouchableOpacity> :
        <TouchableOpacity onPress={onPressPlay}>
          <View style={styles.playButton}>
            <Image style={{ tintColor: defaultString.darkColor }} source={require('app/components/img/ic_play_arrow_white_48pt.png')} />
          </View>
        </TouchableOpacity>
      }
      <View style={{ width: 20 }} />
      <TouchableOpacity
        onPress={() => onNext()}
      >
        <Image 
          style={{ tintColor: defaultString.darkColor }}
          source={require('app/components/img/ic_skip_next_white_36pt.png')} 
        />
      </TouchableOpacity>
      <View style={{ width: 40 }} />

      <TouchableOpacity onPress={onForward} activeOpacity={0.0} style={styles.forward}>
        <Image style={[{ tintColor: defaultString.darkColor } , styles.secondaryControlBackNext, styles.off ]}
          source={require('app/components/img/ic_forward_10_40.png')} />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.0} onPress={onPressRepeat}>
        <Image style={[{ tintColor: defaultString.darkColor }, styles.secondaryControl, repeatOn ? [] : styles.off]}
          source={require('app/components/img/ic_repeat_white.png')} />
      </TouchableOpacity>
    </View>
  );

export default React.memo(Controls);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  playButton: {
    height: 72,
    width: 72,
    borderWidth: 1,
    borderColor: defaultString.darkColor,
    borderRadius: 72 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryControl: {
    height: 20,
    width: 20,
  },
  secondaryControlBackNext: {
    height: 25,
    width: 25,
  },
  off: {
    opacity: 0.30,
  },
  replay: {
    marginLeft: 8
  },
  forward: {
    marginRight: 8
  }
})
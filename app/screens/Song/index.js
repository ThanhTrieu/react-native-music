import React from 'react';
import ListSongView from 'app/components/commons/ListSongView';

export default function Song({route, navigation}) {
  return(
    <>
      <ListSongView route={route} navigation={navigation} />
    </>
  )
}
import React from 'react';
import ListBoxView from 'app/components/commons/ListBoxView';
export default function Composer({route, navigation}) {
  return(
    <>
      <ListBoxView typeCallApi="3" route={route} navigation={navigation} />
    </>
  )
}
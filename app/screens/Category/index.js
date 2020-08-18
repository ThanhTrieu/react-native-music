import React from 'react';
import ListBoxView from 'app/components/commons/ListBoxView';

export default function Category({route, navigation}) {
  return(
    <>
      <ListBoxView typeCallApi="1" route={route} navigation={navigation} />
    </>
  )
}

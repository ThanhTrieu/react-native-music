import * as React from 'react';
import { List, Avatar, Divider, Button } from 'react-native-paper';

const ListView = ({data, navigation}) => {
  // console.log(data);
  return(
    <>
      <List.Item
        title={data.name_song}
        titleStyle={{fontSize: 22}}
        titleNumberOfLines={2}
        left={() => <Avatar.Image size={90} source={{uri: data.url_image}} />}
        onPress={() => navigation.navigate('SoundRoute', { id: data.id })}
      />
      <Divider/>
    </>
  )
}
export default React.memo(ListView);
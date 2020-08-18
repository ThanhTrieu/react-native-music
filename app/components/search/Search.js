import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar,  RadioButton, Text, Divider } from 'react-native-paper';

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [value, setValue] = React.useState('1');
  const onChangeSearch = query => setSearchQuery(query);
  return (
    <>
      <View style={styles.container}>
        {/* <View style={styles.conditionSearch}>
          <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
            <View style={styles.conditionItem}>
              <Text>Song</Text>
              <View>
                <RadioButton value="1" />
              </View>
            </View>
            <View style={styles.conditionItem}>
              <Text>Singer</Text>
              <View>
                <RadioButton value="2" />
              </View>
            </View>
            <View style={styles.conditionItem}>
              <Text>composer</Text>
              <View>
                <RadioButton value="3" />
              </View>
            </View>
          </RadioButton.Group>
        </View> */}
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <View style={styles.content}>
          <Text>Apple</Text>
          <Divider />
          <Text>Orange</Text>
          <Divider />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  conditionSearch: {
    flexDirection: 'row',
    marginTop: 1,
    elevation: 7, 
    shadowColor: '#d9d9d9',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    backgroundColor: '#ffffff',
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  conditionItem: {
    flexWrap: 'nowrap',
    justifyContent: 'center',
    marginLeft: 20,
  },
  content: {
    flex: 1,
    flexWrap: 'wrap',
    marginTop: 10
  }
});

export default React.memo(Search);
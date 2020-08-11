import * as React from 'react';
import { Searchbar } from 'react-native-paper';

export default class HeaderSearch extends React.Component {
  state = {
    searchQuery: '',
  };

  _onChangeSearch = query => this.setState({ searchQuery: query });

  render() {
    const { searchQuery } = this.state;
    return (
      <Searchbar
        placeholder="Search"
        onChangeText={this._onChangeSearch}
        value={searchQuery}
      />
    );
  }
}
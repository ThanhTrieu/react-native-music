import React from 'react';
import Player from 'app/components/media/Player';
import { BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { detailSongData } from 'app/reselects/detailSongReselect';
import { getDetailSongById } from 'app/actions/detailSongActions';

class MusicPlayer extends React.PureComponent {

  constructor(props) {
    super(props);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentDidMount() {
    this.props.getSongByID(this.props.route.params.id, -1)
  }

  handleBackButton = () => {
    Actions.pop();
    return true;
  };
  render() {
    return <Player navigation={this.props.navigation} tracks={this.props.infoSong} />
  }
}

const mapStateToProps = createStructuredSelector({
  infoSong: detailSongData,
});

const mapDispatchToProps = (dispatch) => ({
  getSongByID: (id, status) => dispatch(getDetailSongById(id, status)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
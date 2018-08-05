import React from 'react';
import Bandstand from "../components/Bandstand";
import BandstandVisited from "../components/BandstandVisited";

export default class BandstandScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const selectBandstand = this.props.navigation.getParam('itemId', 0);
    const hasVisited = visited.includes(selectBandstand);
    if (!hasVisited) {
      return (
        <Bandstand selectBandstand={selectBandstand} />
      )
    } else {
      return (
        <BandstandVisited selectBandstand={selectBandstand} />
      )
    }
  }
}
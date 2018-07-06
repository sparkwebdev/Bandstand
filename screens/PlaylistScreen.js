import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class PlaylistScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    names: [
       {
          id: 0,
          name: 'Ben',
       },
       {
          id: 1,
          name: 'Susan',
       },
       {
          id: 2,
          name: 'Robert',
       },
       {
          id: 3,
          name: 'Mary',
       }
    ]
 }

  render() {
    return (
      <View> 
          {
            this.state.names.map((item, index) => (
              <Text style = {styles.text}>
                {item.name}
              </Text>
            ))
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

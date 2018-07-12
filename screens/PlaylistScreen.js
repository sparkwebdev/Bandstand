import React from 'react';
import { ScrollView, TouchableHighlight, View, Text, Image, StyleSheet, AsyncStorage } from 'react-native';
import Expo, { Asset } from 'expo';
import bandStands from '../constants/Bandstands';

class Icon {
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}

const ICON_PLAY_BUTTON = new Icon(require('../assets/images/icon_play.png'), 34, 34);
const ICON_PAUSE_BUTTON = new Icon(require('../assets/images/icon_pause.png'), 34, 34);
const ICON_BANDSTAND = new Icon(require('../assets/images/icon_bandstand.png'), 34, 34);

export default class PlaylistScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    visited: null,
    count: 0
  }

  componentDidMount() {
    this.getKey();
  }
  
  async getKey() {
    try {
      const value = await AsyncStorage.getItem('@VisitedStore:key');
      let visited = JSON.parse(value);
      this.setState({visited: visited});
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  hasVisited(id) {
    if (this.state.visited !== null) {
      if (this.state.visited.includes(id)) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {
          bandStands.bandStands.map((item, index) => (
            <View key={index} style={[styles.box, (!this.hasVisited(item.id)) ? styles.notvisited : null]}>
              <View style={[styles.description, this.hasVisited(item.id) ? styles.visited : null]}>
                <Text>
                  {item.id}. {item.title}
                </Text>
                <Text>
                  Duration: {item.song.duration}
                </Text>
              </View>
              <View style={styles.actions}>
                {this.hasVisited(item.id) ? 
                  <TouchableHighlight>
                  <Image style={styles.icon}
                    source={this.state.isPlaying ? ICON_PAUSE_BUTTON.module : ICON_PLAY_BUTTON.module}
                  />
                  </TouchableHighlight>
                : null}
                <TouchableHighlight onPress={() => this.props.navigation.navigate('Bandstand', {
                  itemId: item.id,
                })}>
                  <Image style={styles.icon}
                    source={ICON_BANDSTAND.module}
                  />
                </TouchableHighlight>
              </View>
            </View>
          ))
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  box: {
    backgroundColor: '#fff',
    borderColor: "#62d3a2",
    borderWidth: 2,
    marginBottom: 20,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notvisited: {
    borderColor: "#ccc",
  },
  description: {
    //Top: 10,
    //marginBottom: 10,
    paddingTop: 20,
    paddingRight: 10,
    paddingBottom: 20,
    paddingLeft: 10,
    borderLeftColor: "#fff",
    borderLeftWidth: 10,
    width: "70%"
  },
  visited: {
    borderLeftColor: "#62d3a2",
  },
  actions: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    width: "30%",
    justifyContent: "flex-end"
  },
  icon: {
    width: 34,
    height: 34,
    marginLeft: 10
  },
  button: {
    width: 256,
    height: 256/1.618,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});

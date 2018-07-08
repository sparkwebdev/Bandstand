import React from 'react';
import { ScrollView, TouchableHighlight, TouchableOpacity, View, Text, Image, StyleSheet, AsyncStorage } from 'react-native';
import { Asset } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import bandStands from '../constants/Bandstands';

class Icon {
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}

const ICON_BANDSTAND = new Icon(require('../assets/images/icon_bandstand.png'), 34, 34);
const ICON_BANDSTAND_ALT = new Icon(require('../assets/images/icon_bandstand_alt.png'), 34, 34);
const ICON_BANDSTAND_ALT_2 = new Icon(require('../assets/images/icon_bandstand_alt_2.png'), 34, 34);

export default class BandstandsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    visited: null,
    sound: null
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
            <View key={index} style={[styles.route, !this.hasVisited(item.id) ? styles.routenotvisited : null, item.id == 1 ? {paddingTop: 60} : null, item.id == bandStands.bandStands.length ? {paddingBottom: 100} : null]}>
              <View style={[{paddingBottom: (5*item.relDistanceFromPrev)}]}>
                <Image style={styles.marker}
                  source={this.hasVisited(item.id) ? ICON_BANDSTAND_ALT.module : ICON_BANDSTAND_ALT_2.module}
                />
                <View style={[styles.box, (!this.hasVisited(item.id)) ? styles.notvisited : null]}>
                  <View style={[styles.description, this.hasVisited(item.id) ? styles.visited : null]}>
                    <Text style={styles.title}>
                      {item.title}
                    </Text>
                    <Text style={styles.subtitle}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[{paddingBottom: (5*item.relDistanceFromPrev)}]}>
                {/* <Ionicons style={styles.ionicon} name="ios-arrow-up" size={10} color="#ddd" /> */}
                <Text style={[styles.distance]}>
                  {item.relDistanceFromPrev !== 0 ? item.relDistanceFromPrev + ' mile' : null}
                  {item.relDistanceFromPrev !== 1 && item.id != bandStands.bandStands.length ? 's' : null}
                </Text>
                <Ionicons style={styles.ionicon} name="ios-arrow-down" size={10} color="#ddd" />
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
    backgroundColor: '#fff',
    paddingLeft: 8,
    paddingRight: 15,
  },
  route: {
    borderLeftColor: "#7f47dd",
    borderLeftWidth: 18,
    marginLeft: 11,
  },
  box: {
    backgroundColor: '#fff',
    borderColor: "#62d3a2",
    borderWidth: 2,
    //marginBottom: 20,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 8
  },
  notvisited: {
    borderColor: "#777",
    opacity: 0.5
  },
  description: {
    //Top: 10,
    //marginBottom: 10,
    paddingTop: 15,
    paddingRight: 10,
    paddingBottom: 15,
    paddingLeft: 10,
    borderLeftColor: "#fff",
    borderLeftWidth: 10,
    //width: "70%"
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  subtitle: {
    fontSize: 12,
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
    //width: "30%",
    justifyContent: "flex-end"
  },
  marker: {
    width: 34,
    height: 34,
    position: "absolute",
    left: -26,
    top: 12,
  },
  icon: {
    width: 34,
    height: 34,
    marginLeft: 10,
  },
  distance: {
    fontStyle: 'italic',
    color: "#aaa",
    fontSize: 12,
    paddingLeft: 10,
  },
  ionicon: {
    marginLeft: 10,
  },
});

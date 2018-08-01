import React from 'react';
import { ScrollView, TouchableWithoutFeedback, View, Text, Image, StyleSheet, AsyncStorage } from 'react-native';
import Expo, { Font, Asset } from "expo";
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
import BandstandDistance from "../components/BandstandDistance";

export default class BandstandsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    visited: null,
    sound: null
  }

  componentDidMount() {
    this.getVisited();
  }
  
  async getVisited() {
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

  _goToBandStand = ({ type, data }) => {
    this.setQrState;
    if (data) {
      let id = data.substr(data.length - 1);
      this.setFoundBandstand(id);
      alert('Success!');
    } else {
      alert('Sorry not found');
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {
          bandStands.bandStands.map((item, index) => (
            <View key={index} style={[styles.route, !this.hasVisited(item.id) ? styles.routenotvisited : null, item.id == 1 ? {paddingTop: 60} : null, item.id == bandStands.bandStands.length ? {paddingBottom: 60} : null]}>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Bandstand', {
                  itemId: item.id,
                })}>
                <View style={[{paddingBottom: (8*(item.milesFromPrev + 1))}]}>
                  <Image style={styles.marker}
                    source={this.hasVisited(item.id) ? ICON_BANDSTAND_ALT.module : ICON_BANDSTAND_ALT_2.module}
                  />
                  <View style={[styles.box, (!this.hasVisited(item.id)) ? styles.notvisited : null]}>
                    <View style={[styles.description, this.hasVisited(item.id) ? styles.visited : null]}>
                      <Text style={styles.title}>
                        {item.title}<Text style={styles.subtitle}>, {item.location}</Text>
                      </Text>
                      <Text style={[styles.subtitle, styles.dates]}>
                        {item.dates}
                      </Text>
                      <Text style={styles.subtitle}>
                        {item.description}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={[{paddingBottom: (10*(item.kmToNext + 3))}]}>
                {item.id !== bandStands.length ? <BandstandDistance kmToNext={item.kmToNext} timeToNext={item.timeToNext} /> : null}
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
    marginLeft: 23,
    paddingLeft: 25,
    paddingRight: 15,
    borderLeftColor: "#7f47dd",
    borderLeftWidth: 18,
    overflow: 'visible',
  },
  route: {
    marginLeft: -25,
  },
  touchable: {
    fontFamily: "Source Code Pro",
  },
  box: {
    backgroundColor: '#fff',
    borderColor: "#62d3a2",
    borderWidth: 2,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 8
  },
  notvisited: {
    borderColor: "#888",
    opacity: 0.5,
  },
  description: {
    paddingTop: 15,
    paddingRight: 10,
    paddingBottom: 15,
    paddingLeft: 10,
    borderLeftColor: "#fff",
    borderLeftWidth: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: "Source Code Pro",
  },
  subtitle: {
    fontWeight: 'normal',
    fontSize: 12,
    fontFamily: "Source Code Pro",
  },
  dates: {
    marginTop: 3,
    marginBottom: 3,
    fontFamily: "Source Code Pro",
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
  },
});

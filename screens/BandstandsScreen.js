import React from 'react';
import { ScrollView, TouchableWithoutFeedback, View, Image, StyleSheet, AsyncStorage } from 'react-native';

import Colours from '../constants/Colors';
import bandStands from '../constants/Bandstands';

import { MonoText } from "../components/StyledText";
import { MonoTextBold } from "../components/StyledTextBold";
import BandstandDistance from "../components/BandstandDistance";

export default class BandstandsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    visited: null,
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

  render() {
    return (
      <ScrollView style={styles.container}>
        {
          bandStands.map((item, index) => (
            <View key={index} style={[styles.route, item.id == 1 ? {paddingTop: 60} : null, item.id == bandStands.length ? {paddingBottom: 60} : null]}>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Bandstand', {
                  itemId: item.id,
                })}>
                <View style={[{paddingBottom: (9*(item.kmToNext + 3))}]}>
                  <Image style={styles.marker}
                    source={this.hasVisited(item.id) ? require('../assets/images/icon_bandstand_alt.png') : require('../assets/images/icon_bandstand_alt_2.png')}
                  />
                  <View style={[styles.card, (!this.hasVisited(item.id)) ? styles.notvisited : null]}>
                    <View style={[styles.cardInner, this.hasVisited(item.id) ? styles.visited : null]}>
                      <MonoTextBold style={styles.title}>
                        {item.title}
                      </MonoTextBold>
                      <MonoTextBold style={styles.subtitle}>{item.location}</MonoTextBold>
                      <MonoTextBold style={styles.dates}>{item.dates}</MonoTextBold>
                      <View style={styles.actions}>
                      <MonoTextBold style={styles.link}>More Info</MonoTextBold>
                      <MonoTextBold style={styles.link}>Link</MonoTextBold>
                      </View>
                      {/* <MonoText style={styles.description}>{item.description}</MonoText> */}
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
    borderLeftColor: Colours.brandPurple,
    borderLeftWidth: 18,
    overflow: 'visible',
  },
  route: {
    marginLeft: -25,
  },
  card: {
    backgroundColor: '#fff',
    borderColor: Colours.brandGreen,
    borderWidth: 2,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 8
  },
  cardInner: {
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    borderLeftColor: "#fff",
    borderLeftWidth: 10,
    width: '100%',
  },
  visited: {
    borderLeftColor: Colours.brandGreen,
  },
  notvisited: {
    borderColor: Colours.tone40,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 15,
  },
  dates: {
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
  },
  actions: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  link: {
    color: Colours.brandPurple,
    fontSize: 15
  },
  marker: {
    width: 34,
    height: 34,
    position: "absolute",
    left: -26,
    top: 14,
  },
});

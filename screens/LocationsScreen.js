import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  TouchableHighlight,
  AsyncStorage,
} from "react-native";
import { Asset } from 'expo';
import bandStands from '../constants/Bandstands';

class Icon {
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}

const ICON_MARKER = new Icon(require('../assets/images/icon_bandstand_alt_3.png'), 34, 34);
const ICON_BANDSTAND = new Icon(require('../assets/images/icon_bandstand.png'), 34, 34);

//import MapView from "react-native-maps";
import { MapView } from 'expo';

const { width, height } = Dimensions.get("window");

// const CARD_HEIGHT = height / 3.5;
// const CARD_WIDTH = CARD_HEIGHT + 40;
const CARD_HEIGHT = 65;
const CARD_WIDTH = width / 1.65;


export default class LocationsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };


  constructor(props) {
    super(props);
    this.markers = bandStands.bandStands.map(function(bandstand) {
      return {
        id: bandstand.id,
        coordinate: {
          latitude: bandstand.coords.lat,
          longitude: bandstand.coords.lng,
        },
        title: bandstand.title,
        location: bandstand.location,
        dates: bandstand.dates,
        image: bandstand.slides.image,
      }
    });
    this.state = {
      visited: null,
      viewed: false,
      fontLoaded: false,
      markers: this.markers,
      region: {
        latitude: 55.930526,
        longitude: -3.150066,
        latitudeDelta: 0.25,
        longitudeDelta: 0.25,
      },
    };
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

  componentWillMount() {
    this.getVisited();
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }

  render() {
    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 1.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.5, 1, 0.5],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });
    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.container}
        >
          {this.state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            return (
              <MapView.Marker key={index} coordinate={marker.coordinate}>
                <Animated.View style={[styles.markerWrap, opacityStyle, scaleStyle]}>
                  <Image style={[styles.icon]} source={ICON_MARKER.module} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.markers.map((marker, index) => (
            <View style={[styles.card, !this.hasVisited(marker.id) ? styles.notvisited : null]} key={index}>
              <View style={[styles.textContent, !this.hasVisited(marker.id) ? styles.notvisited : null]}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.location}
                </Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.dates}
                </Text>
              </View>
              <View style={styles.actions}>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('Bandstand', {
                  itemId: marker.id,
                })}>
                  <Image style={styles.icon}
                    source={ICON_BANDSTAND.module}
                  />
                </TouchableHighlight>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    //padding: 3,
    //elevation: 2,
    backgroundColor: "#fff",
    marginLeft: 15,
    //shadowColor: "#000",
    //shadowRadius: 0,
    //shadowOpacity: 0.65,
    //shadowOffset: { x: 0, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderColor: "#62d3a2",
    borderWidth: 2,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  description: {
    width: "80%"
  },
  actions: {
    width: "20%",
    alignSelf: "center",
  },
  notvisited: {
    borderColor: "#ccc",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    width: "30%",
    flex: 1,
    borderColor: "#62d3a2",
    borderLeftWidth: 8,
    paddingLeft: 5,
  },
  cardtitle: {
    fontSize: 14,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 5,
    fontWeight: "bold",
    marginBottom: 0,
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
    paddingLeft: 5,
    paddingRight: 5,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgb(127,71,221)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(127,71,221, 0.5)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(127,71,221, 0.75)",
  },
  icon: {
    width: 34,
    height: 34,
  },
});

AppRegistry.registerComponent("mapfocus", () => screens);
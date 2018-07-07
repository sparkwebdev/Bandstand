import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
} from "react-native";

//import MapView from "react-native-maps";
import { MapView } from 'expo';

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 3.5;
const CARD_WIDTH = CARD_HEIGHT - 40;

export default class LocationsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    markers: [
      {
        coordinate: {
          latitude: 55.950526,
          longitude: -3.200066,
        },
        title: "1. Ross Theatre",
        description: "West Princes Street Gardens",
        image: require('../assets/images/bandstand-01.jpg'),
      },
      {
        coordinate: {
          latitude: 55.941304,
          longitude: -3.191872,
        },
        title: "2. Meadows",
        description: "In situ 1908 to 1953",
        image: require('../assets/images/bandstand-02.jpg'),
      },
      {
        coordinate: {
          latitude: 55.941519,
          longitude: -3.253753,
        },
        title: "3. Saughton Park",
        description: "erected 1908, re-erected 2018",
        image: require('../assets/images/bandstand-01.jpg'),
      },
      {
        coordinate: {
          latitude: 55.975007,
          longitude: -3.193481,
        },
        title: "4. Victoria Park, Leith",
        description: "no dates available",
        image: require('../assets/images/bandstand-02.jpg'),
      },
      {
        coordinate: {
          latitude: 55.970744,
          longitude: -3.165750,
        },
        title: "5. Leith Links",
        description: "erected early 1900s",
        image: require('../assets/images/bandstand-01.jpg'),
      },
      {
        coordinate: {
          latitude: 55.951358,
          longitude: -3.104938,
        },
        title: "6. Portobello Prom, John Street",
        description: "dates unclear/ early 1900s in situ",
        image: require('../assets/images/bandstand-02.jpg'),
      },
      {
        coordinate: {
          latitude: 55.939633,
          longitude: -3.051714,
        },
        title: "7. Inveresk Park, Musselburgh",
        description: "dates unclear/ early 1900s in situ",
        image: require('../assets/images/bandstand-01.jpg'),
      },
    ],
    region: {
      latitude: 55.930526,
      longitude: -3.150066,
      latitudeDelta: 0.25,
      longitudeDelta: 0.25,
    },
  };

  componentWillMount() {
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
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
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
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
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
            <View style={styles.card} key={index}>
              <Image
                source={marker.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text>
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
    bottom: 10,
    left: 0,
    right: 0,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 3,
    //elevation: 2,
    backgroundColor: "#fff",
    marginLeft: 10,
    marginRight: 5,
    shadowColor: "#000",
    shadowRadius: 0,
    shadowOpacity: 0.65,
    shadowOffset: { x: 0, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
    borderColor: "#62d3a2",
    borderTopWidth: 3,
  },
  cardtitle: {
    fontSize: 12,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 5,
    fontWeight: "bold",
    color: "#7f47dd",
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
});

AppRegistry.registerComponent("mapfocus", () => screens);
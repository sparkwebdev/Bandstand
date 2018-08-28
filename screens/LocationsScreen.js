import React from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  Animated,
  Image,
  Dimensions,
} from "react-native";
import { MapView } from 'expo';
import { MonoTextBold } from "../components/StyledTextBold";
import Colours from '../constants/Colors';

import BandstandCard from "../components/BandstandCard";

import bandStands from "../constants/Bandstands";
import NavButton from "../navigation/NavButton";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 1.35;

const bandStandMarkers = bandStands.map(function(bandstand) {
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

export default class LocationsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      markers: bandStandMarkers,
      region: { // Set region around Edinburgh
        latitude: 55.930526,
        longitude: -3.150066,
        latitudeDelta: 0.25,
        longitudeDelta: 0.25,
      },
    };
  }

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
    const visited = this.props.screenProps.visited;
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
      <View style={styles.container} visited={visited}>
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
                  <Image style={[styles.icon]} source={require('../assets/images/icons/icon_action_marker.png')} />
                  <MonoTextBold style={[styles.markerTitle]}>{marker.title}</MonoTextBold>
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
          {this.state.markers.map((marker, index) => {
            let hasVisited = visited.includes(marker.id);
            return (
              <BandstandCard
                key={index}
                item={bandStands[index]}
                hasVisited={hasVisited}
                style={{ width: CARD_WIDTH }}
              />
            )
          })}
        </Animated.ScrollView>
        <NavButton />
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
    bottom: 20,
    left: 0,
    right: 0,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 48,
    height: 48,
  },
  markerTitle: {
    backgroundColor: Colours.brandGreen,
    color: '#fff',
    fontSize: 11,
    lineHeight: 13,
    width: 75,
    padding: 2,
    textAlign: 'center'
  }
});

AppRegistry.registerComponent("mapfocus", () => screens);
import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

export default class PlaylistScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    playlist: [
       {
          id: 1,
          title: "Ross Theatre",
          duration: "4:18",
          sound: require('../assets/audio/01.mp3'),
          loop: require('../assets/audio/choir-01.mp3'),
          visited: false,
       },
       {
          id: 2,
          title: "The Meadows",
          duration: "4:11",
          sound: require('../assets/audio/02.mp3'),
          loop: require('../assets/audio/choir-02.mp3'),
          visited: false,
       },
       {
          id: 3,
          title: "Saughton Park",
          duration: "2:34",
          sound: require('../assets/audio/01.mp3'),
          loop: require('../assets/audio/choir-01.mp3'),
          visited: false,
       },
       {
          id: 4,
          title: "Victoria Park, Leith",
          duration: "3:08",
          sound: require('../assets/audio/02.mp3'),
          loop: require('../assets/audio/choir-02.mp3'),
       },
       {
          id: 5,
          title: "Leith Links",
          duration: "4:11",
          sound: require('../assets/audio/02.mp3'),
          loop: require('../assets/audio/choir-02.mp3'),
          visited: false,
       },
       {
          id: 6,
          title: "Portobello Prom, John Street",
          duration: "2:34",
          sound: require('../assets/audio/01.mp3'),
          loop: require('../assets/audio/choir-01.mp3'),
          visited: false,
       },
       {
          id: 7,
          title: "Inveresk Park, Musselburg",
          duration: "3:08",
          sound: require('../assets/audio/02.mp3'),
          loop: require('../assets/audio/choir-02.mp3'),
       }
    ]
 }

  render() {
    return (
      <ScrollView>
          {
            this.state.playlist.map((song, index) => (
              <View key={index} style={styles.box}>
                <View style={styles.description}>
                  <Text>
                    {song.title}
                  </Text>
                  <Text>
                    Duration: {song.duration}
                  </Text>
                </View>
                <View style={styles.actions}>
                  <Text>
                    Play: {song.sound} | Loop: {song.loop} | Link: {song.id}
                  </Text>
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
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  box: {
    backgroundColor: '#fff',
    borderColor: "#62d3a2",
    borderWidth: 2,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    marginBottom: 10,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  description: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderLeftColor: "#62d3a2",
    borderLeftWidth: 10,
  },
  actions: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});

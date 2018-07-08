import React from 'react';
import { ScrollView, TouchableOpacity, View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { Constants, Audio } from 'expo';
import bandStands from '../constants/Bandstands';

const source = {
  uri: 'https://freesound.org/data/previews/413/413854_4337854-hq.mp3',
};

export default class PlaylistScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    playingStatus: "nosound",
    visited: null
  }

  componentDidMount() {
    this.getKey();
  }

  async getKey() {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      let visited = JSON.parse(value);
      this.setState({visited: visited});
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  async _playRecording() {
    const { sound } = await Audio.Sound.create(
      source,
      {
        shouldPlay: true,
        isLooping: true,
      },
      this._updateScreenForSoundStatus,
    );
    this.sound = sound;
    this.setState({
      playingStatus: 'playing'
    });
  }

  hasVisited(id) {
    if (this.state.visited !== null) {
      if (this.state.visited.includes(id)) {
        return true;
      }
    }
    return false;
  }
  
  _updateScreenForSoundStatus = (status) => {
    if (status.isPlaying && this.state.playingStatus !== "playing") {
      this.setState({ playingStatus: "playing" });
    } else if (!status.isPlaying && this.state.playingStatus === "playing") {
      this.setState({ playingStatus: "donepause" });
    }
  };
  
  async _pauseAndPlayRecording() {
    if (this.sound != null) {
      if (this.state.playingStatus == 'playing') {
        console.log('pausing...');
        await this.sound.pauseAsync();
        console.log('paused!');
        this.setState({
          playingStatus: 'donepause',
        });
      } else {
        console.log('playing...');
        await this.sound.playAsync();
        console.log('playing!');
        this.setState({
          playingStatus: 'playing',
        });
      }
    }
  }
  
  _syncPauseAndPlayRecording() {
    if (this.sound != null) {
      if (this.state.playingStatus == 'playing') {
        this.sound.pauseAsync();
      } else {
        this.sound.playAsync();
      }
    }
  }
  
  _playAndPause = () => {
    switch (this.state.playingStatus) {
      case 'nosound':
        this._playRecording();
        break;
      case 'donepause':
      case 'playing':
        this._pauseAndPlayRecording();
        break;
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={this._playAndPause}>
              <Text style={styles.buttonText}>
                {this.state.playingStatus}
              </Text>
            </TouchableOpacity>
        </View>
        {
          bandStands.bandStands.map((item, index) => (
            <View key={index} style={[styles.box, (!this.hasVisited(item.id)) ? styles.notvisited : null]}>
              <View style={[styles.description, this.hasVisited(item.id) ? styles.visited : null]}>
                <Text>
                  {item.title}
                </Text>
                <Text>
                  Duration: {item.song.duration}
                </Text>
              </View>
              <View style={styles.actions}>
                {this.hasVisited(item.id) ? <Text>Song: {item.song.sound} </Text> : null}
                {this.hasVisited(item.id) ? <Text>Loop: {item.song.loop} </Text> : null}
                <Text>Visit: {item.id} </Text>
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
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  notvisited: {
    opacity: 0.5,
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
    width: "30%"
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

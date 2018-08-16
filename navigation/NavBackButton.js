
import React from 'react';
import { View, TouchableHighlight, Image, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

// import { MonoTextBold } from "./components/StyledTextBold";

class NavBackButton extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <View style={styles.container}>
          <TouchableHighlight style={styles.backButton} onPress={this.props.navigation.goBack}>
            <Image
              style={styles.backButtonImg}
                source={require("../assets/images/icons/icon_back.png")}
            />
          </TouchableHighlight>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "absolute",
    zIndex: 9999999,
    left: 30,
    top: 56
  },
  backButton: {
    width: 46,
    height: 46,
    position: "absolute",
    zIndex: 9999999,
    left: 30,
    top: 56
  },
  backButtonImg: {
    width: '100%',
    height: '100%',
    position: "absolute",
    zIndex: 9999999,
    left: 30,
    top: 56
  }
});

export default withNavigation(NavBackButton);
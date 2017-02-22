import React, {
  Component
} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class TopView extends Component {
  static props = {
    heWeather5: [],
  }

  render() {
    return(
      <View>
        <Text style={[styles.city, styles.textSize]}>{this.props.heWeather5.basic.city}</Text>
        <Text style={[styles.weather, styles.textSize]}>{this.props.heWeather5.now.cond.txt}</Text>
        <Text style={[styles.temperature, styles.textSize]}>{this.props.heWeather5.now.tmp}°</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textSize: {
    width: window.width,
    textAlign: 'center',
  },
  city: {
    marginTop: 20,
    fontSize: 24,
  },
  weather: {
    fontSize: 18,
  },
  temperature: {
    marginTop: 5,
    fontSize: 50,
  }
});

import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';

import Utils from './utils';

export default class Hourly extends Component {
  static props = {
    heWeather5: [],
  }

  render() {
    var items = [];
    var preUri = 'http://files.heweather.com/cond_icon/';
    items.push(
      <HourlyItem
        key={0}
        date={'现在'}
        code={preUri + this.props.heWeather5.now.cond.code + '.png'}
        tmp={this.props.heWeather5.now.tmp} />
    )
    var hourly_forecast = this.props.heWeather5.hourly_forecast;
    var length = hourly_forecast.length;
    for (var i = 0; i < length; i++) {
      items.push(
        <HourlyItem
          key={i + 1}
          date={Utils.getTime(hourly_forecast[i].date) + '时'}
          code={preUri + hourly_forecast[i].cond.code + '.png'}
          tmp={hourly_forecast[i].tmp} />
      );
    }
    return(
      <View>
        <ScrollView  style={{flex: 1}} horizontal={true}>
          <View style={styles.container}>
            {items}
          </View>
        </ScrollView>
      </View>
    );
  }
}

class HourlyItem extends Component {
  static props = {
    date: '',
    code: '',
    tmp: '',
  }

  render() {
    return(
      <View style={styles.itemContainer}>
        <Text style={styles.text}>{this.props.date}</Text>
        <Image style={styles.image} source={{uri: this.props.code}} />
        <Text style={styles.text}>{this.props.tmp}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 5,
    marginLeft: 10,
    fontSize: 14,
  },
  image: {
    marginTop: 5,
    marginLeft: 10,
    width: 20,
    height: 20,
  },
});

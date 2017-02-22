import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Utils from './utils';

export default class Now extends Component {
  static props = {
    heWeather5: [],
  }

  render() {
    var time = this.props.heWeather5.basic.update.loc;
    var weekday = Utils.getWeekday(time);
    return(
      <View style={styles.container}>
        <View style={styles.itemContainer1}>
          <Text style={[styles.textWeekday, styles.textSize]}>{weekday}</Text>
          <Text style={[styles.textToday, styles.textSize]}>今天</Text>
        </View>
        <View style={styles.itemContainer2}>
          <Text style={[styles.textTem, styles.textSize]}>{this.props.heWeather5.now.tmp}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContainer1: {
    flex: 1,
    flexDirection: 'row',
  },
  itemContainer2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textSize: {
    fontSize: 14,
  },
  textWeekday: {
    marginLeft: 10,
  },
  textToday: {
    marginLeft: 5,
  },
  textTem: {
    marginRight: 10,
  }
});

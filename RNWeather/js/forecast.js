import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import Utils from './utils';

export default class Forecast extends Component {
  static props = {
    heWeather5: [],
  }

  render() {
    var items = [];
    var preUri = 'http://files.heweather.com/cond_icon/';
    var daily_forecast = this.props.heWeather5.daily_forecast;
    var length = daily_forecast.length;
    for (var i = 0; i < length; i++) {
      items.push(
        <ForecastItem
          key={i}
          date={Utils.getWeekday(daily_forecast[i].date)}
          code={preUri + daily_forecast[i].cond.code_d + '.png'}
          max={daily_forecast[i].tmp.max}
          min={daily_forecast[i].tmp.min}/>
      );
    }
    return(
      <View style={styles.container1}>
        {items}
        <ForecastToday
          txt_d={daily_forecast[0].cond.txt_d}
          txt_n={daily_forecast[0].cond.txt_n}
          max={daily_forecast[0].tmp.max}
          min={daily_forecast[0].tmp.min}/>
      </View>
    );
  }
}

class ForecastItem extends Component {
  static props = {
    date: '',
    code: '',
    max: '',
    min: '',
  }

  render() {
    return(
      <View style={styles.container2}>
        <View style={styles.itemContainer1}>
          <Text style={styles.textDate}>{this.props.date}</Text>
        </View>
        <View>
          <Image style={styles.image} source={{uri: this.props.code}} />
        </View>
        <View style={styles.itemContainer2}>
          <Text style={[styles.textSize]}>{this.props.max}</Text>
          <Text style={[styles.textMin, styles.textSize]}>{this.props.min}</Text>
        </View>
      </View>
    );
  }
}

class ForecastToday extends Component {
  static props = {
    txt_d: '',
    txt_n: '',
    max: '',
    min: '',
  }

  render() {
    return(
      <View style={[styles.itemContainer1, {marginTop: 10}]}>
        <Text style={styles.textDate}>今天：白天{this.props.txt_d}，今晚{this.props.txt_n}，最高气温{this.props.max}，最低气温{this.props.min}。</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContainer1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  itemContainer2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textSize: {
    width: 40,
    textAlign: 'right',
  },
  textDate: {
    marginLeft: 10,
  },
  textMin: {
    marginRight: 10,
  },
  image: {
    width: 20,
    height: 20,
  }
});

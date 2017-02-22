import React, {
  Component,
  PropTypes
} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

const DEFAULT_DATA_URL = 'https://free-api.heweather.com/v5/weather';

import TopView from './topview';
import Now from './now';
import Hourly from './hourly';
import Forecast from './forecast';

export default class Weather extends Component {

  static props = {
    city: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      heWeather5: [],
      loaded: false,
      unknown: false
    };
    // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
    // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
    this.fetchDefaultCity = this.fetchDefaultCity.bind(this);
  }

  componentDidMount() {
    this.fetchDefaultCity(this.props.city);
  }

  fetchDefaultCity(_city) {
    return fetch(DEFAULT_DATA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'city=' + _city + '&key=b9a9f03ce7f746778a652ab6f9d98bb8'
    })
    .then((response) => response.json())
    .then((responseData) => {
      // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
      if (responseData.HeWeather5[0].status == 'ok') {
        this.setState({
          heWeather5: responseData.HeWeather5[0],
          loaded: true,
          unknown: false
        });
      } else if (responseData.HeWeather5[0].status == 'unknown city') {
        this.setState({
          heWeather5: [],
          loaded: true,
          unknown: true
        });
      }
    });
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    if (this.state.unknown) {
      return this.renderUnknownView();
    }

    return(
      <View style={styles.topContainer}>
        <TopView style={{flex: 1}} heWeather5={this.state.heWeather5}/>
        <ScrollView style={styles.scrollContainer}>
          <Now heWeather5={this.state.heWeather5}/>
          <Hourly heWeather5={this.state.heWeather5}/>
          <Forecast heWeather5={this.state.heWeather5}/>
        </ScrollView>
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.topContainer}>
        <Text>
          加载中...
        </Text>
      </View>
    );
  }

  renderUnknownView() {
    return (
      <View style={styles.topContainer}>
        <Text>
          未知或错误城市
        </Text>
      </View>
    );
  }
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  scrollContainer: {
    flex: 3,
    width: window.width,
    marginBottom: 45,
  },
});

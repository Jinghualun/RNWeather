import React, {
  Component,
  PropTypes
} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import Weather from './weather';
import SearchCity from './search';
import TopView from './topview';
import Now from './now';
import Hourly from './hourly';
import Forecast from './forecast';
import Suggestion from './suggestion';

const DEFAULT_DATA_URL = 'https://free-api.heweather.com/v5/weather';

export default class WeatherBasic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heWeather5: [],
      loaded: false,
      unknown: false,
      city: '北京',
    };
    this.fetchWeather = this.fetchWeather.bind(this);
  }

  componentDidMount() {
    this.fetchWeather(this.state.city);
  }

  goToSearch() {
    const {navigator}=this.props;
    if (navigator) {
      navigator.push({
        name: 'SearchCity',
        component: SearchCity,
        params: {
          updateCity:(result)=>{
            this.fetchWeather(result)
          },
        }
      })
    }
  }

  fetchWeather(_city) {
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
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {this.goToSearch()}}>
          <TextInput
            style={styles.searchCity}
            placeholder="请输入城市中英文名称或ID、IP地址"
            underlineColorAndroid={'transparent'}
            editable={false}
            onFocus={() => {this.goToSearch()}} />
        </TouchableOpacity>
        <TopView heWeather5={this.state.heWeather5}/>
        <ScrollView style={styles.scrollContainer}>
          <Now heWeather5={this.state.heWeather5}/>
          <Hourly heWeather5={this.state.heWeather5}/>
          <Forecast heWeather5={this.state.heWeather5}/>
          <Suggestion heWeather5={this.state.heWeather5} style={{marginTop: 10}}/>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 10,
  },
  searchCity: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
});

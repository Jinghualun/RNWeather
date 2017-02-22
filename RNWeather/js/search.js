import React, {
  Component,
  PropTypes
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  TextInput
} from 'react-native';

const SEARCH_CITY_URL = 'https://free-api.heweather.com/v5/search';

export default class SearchCity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource:  new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      unknown: false,
      city: '',
    };
  }

  goToBack() {
    const {navigator}=this.props;
    if (navigator) {
      navigator.pop();
    }
  }

  goToBackWithCity(rowData) {
    const {navigator}=this.props;
    let city = rowData.basic.city;
    this.props.updateCity(city);
    if (navigator) {
      navigator.pop();
    }
  }

  fetchCity(_city) {
    return fetch(SEARCH_CITY_URL, {
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
          dataSource: this.state.dataSource.cloneWithRows(responseData.HeWeather5),
          loaded: true,
          unknown: false,
        });
      } else if (responseData.HeWeather5[0].status == 'unknown city') {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows([]),
          loaded: true,
          unknown: true,
        });
      }
    });
  }

  renderRow(rowData) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress = {() => {this.goToBackWithCity(rowData)}}>
          <Text style={styles.itemCity}>{rowData.basic.city}</Text>
          <View style={styles.itemContainer}>
          <Text>{rowData.basic.prov}</Text>
          <Text>{rowData.basic.cnty}</Text>
          </View>
          <View style={styles.separator}/>
        </TouchableOpacity>
      </View>
  );
}

  render() {
    let display = this.state.unknown ? '未知或错误城市' : '';
    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <View style={styles.textView}>
            <Text onPress={() => {this.goToBack()}}>取消</Text>
          </View>
          <TextInput
            style={styles.searchCity}
            placeholder="请输入城市中英文名称或ID、IP地址"
            underlineColorAndroid={'transparent'}
            onChangeText={(city) => this.setState({city})}/>
          <View style={styles.textView}>
            <Text onPress={() => {this.fetchCity(this.state.city)}}>搜索</Text>
          </View>
        </View>
        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderRow(rowData)}
          enableEmptySections={true}
        />
        <Text style={styles.unknownText}>{display}</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unknownText: {
    flex: 1,
    textAlign: 'center',
  },
  searchCity: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    height: 40,
  },
  itemContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textView: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    height: 40,
  },
  listView: {
    padding: 10,
  },
  itemCity: {
    fontSize: 16,
    textAlign: 'left',
    color: '#333333',
    marginTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginTop: 5,
  },
});

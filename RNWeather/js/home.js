import React, {
  Component
} from 'react';
import {
  Navigator
} from 'react-native';
import WeatherBasic from './weatherbasic';

export default class RNWeather extends Component {
  render() {
    let defaultName = 'firstpage';
    let defaultComponent = WeatherBasic;
    return(
      <Navigator
       initialRoute={{name:defaultName,component:defaultComponent}}
       renderScene={
         (route,navigator)=>{
           let Component = route.component;
           return <Component {...route.params} navigator={navigator}/>
         }
       }/>
    );
  }
}

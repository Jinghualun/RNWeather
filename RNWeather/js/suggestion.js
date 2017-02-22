import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class Suggestion extends Component {
  static props = {
    heWeather5: [],
  }

  render() {
    var items = [];
    var suggestion = this.props.heWeather5.suggestion;
    if (null != suggestion) {
      if (null != suggestion.air) {
        items.push(
          <SuggestionItem
            key={0}
            name={'空气质量'}
            brf={suggestion.air.brf}
            txt={suggestion.air.txt}
          />
        )
      }
      if (null != suggestion.comf) {
        items.push(
          <SuggestionItem
            key={1}
            name={'舒适度指数'}
            brf={suggestion.comf.brf}
            txt={suggestion.comf.txt}
          />
        )
      }
      if (null != suggestion.cw) {
        items.push(
          <SuggestionItem
            key={2}
            name={'洗车指数'}
            brf={suggestion.cw.brf}
            txt={suggestion.cw.txt}
          />
        )
      }
      if (null != suggestion.drsg) {
        items.push(
          <SuggestionItem
            key={3}
            name={'穿衣指数'}
            brf={suggestion.drsg.brf}
            txt={suggestion.drsg.txt}
          />
        )
      }
      if (null != suggestion.flu) {
        items.push(
          <SuggestionItem
            key={4}
            name={'感冒指数'}
            brf={suggestion.flu.brf}
            txt={suggestion.flu.txt}
          />
        )
      }
      if (null != suggestion.sport) {
        items.push(
          <SuggestionItem
            key={5}
            name={'运动指数'}
            brf={suggestion.sport.brf}
            txt={suggestion.sport.txt}
          />
        )
      }
      if (null != suggestion.trav) {
        items.push(
          <SuggestionItem
            key={6}
            name={'旅游指数'}
            brf={suggestion.trav.brf}
            txt={suggestion.trav.txt}
          />
        )
      }
      if (null != suggestion.uv) {
        items.push(
          <SuggestionItem
            key={7}
            name={'紫外线指数'}
            brf={suggestion.uv.brf}
            txt={suggestion.uv.txt}
          />
        )
      }
    }
    return(
      <View style={styles.container}>
        {items}
      </View>
    );
  }
}

class SuggestionItem extends Component {
  static props = {
    name: '',
    brf: '',
    txt: '',
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.suggestionItem}>
          <Text>{this.props.name}</Text>
          <Text>：</Text>
          <Text>{this.props.brf}</Text>
        </View>
        <Text style={styles.detailText}>{this.props.txt}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  suggestionItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  detailText: {
    marginLeft: 10,
    marginRight: 10,
  },
});

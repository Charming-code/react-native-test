/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native';
import Home from './components/tabbars/Hone';
import Me from './components/tabbars/Me';
import Find from './components/tabbars/Find';
import TabNavigator from 'react-native-tab-navigator';

import Icon from 'react-native-vector-icons/FontAwesome';




export default class App extends Component {

  constructor(props){
    super(props)
    this.state={
      selectedTab:'home',
      homeText:'#494949',
      findText:'#9b9b9b',
      meText:'#9b9b9b'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title="热映"
            // renderIcon={() => <Image source={...} />}
            renderIcon={() => <Icon name="book" size={15} color="#9b9b9b" />}
            // renderSelectedIcon={() => <Image source={...} />}
            renderSelectedIcon={() => <Icon name="book" size={20} color="#494949" />}
            // badgeText="1"
            onPress={() => this.setState({ selectedTab: 'home' })}
            >
            <Home></Home>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'find'}
            title="找片"
            // renderIcon={() => <Image source={...} />}
            renderIcon={() => <Icon name="eye" size={15} color="#9b9b9b" />}
            // renderSelectedIcon={() => <Image source={...} />}
            renderSelectedIcon={() => <Icon name="eye" size={20} color="#494949" />}
            // renderBadge={() => <CustomBadgeView />}
            onPress={() => this.setState({ selectedTab: 'find' })}
            >
            <Find></Find>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'me'}
            title="我的"
            // titleStyle={()=>{return color=(this.state.selectedTab === 'me'?"#494949":"black")}}
            // renderIcon={() => <Image source={...} />}
            renderIcon={() => <Icon name="user" size={15} color="#9b9b9b" />}
            // renderSelectedIcon={() => <Image source={...} />}
            renderSelectedIcon={() => <Icon name="user" size={20} color="#494949" />}
            // renderBadge={() => <CustomBadgeView />}
            onPress={() => this.setState({ selectedTab: 'me' })}
            >
            <Me></Me>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});

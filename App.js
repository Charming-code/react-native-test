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
      selectedTab:'home'
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
            renderIcon={() => <Icon name="book" size={15} color="red" />}
            // renderSelectedIcon={() => <Image source={...} />}
            renderSelectedIcon={() => <Icon name="book" size={20} color="red" />}
            // badgeText="1"
            onPress={() => this.setState({ selectedTab: 'home' })}
            >
            <Home></Home>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'find'}
            title="找片"
            // renderIcon={() => <Image source={...} />}
            renderIcon={() => <Icon name="eye" size={15} color="red" />}
            // renderSelectedIcon={() => <Image source={...} />}
            renderSelectedIcon={() => <Icon name="eye" size={20} color="red" />}
            // renderBadge={() => <CustomBadgeView />}
            onPress={() => this.setState({ selectedTab: 'find' })}
            >
            <Find></Find>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'me'}
            title="我的"
            // renderIcon={() => <Image source={...} />}
            renderIcon={() => <Icon name="user" size={15} color="red" />}
            // renderSelectedIcon={() => <Image source={...} />}
            renderSelectedIcon={() => <Icon name="user" size={20} color="red" />}
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

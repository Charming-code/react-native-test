/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Home from './components/tabbars/Hone';
import Me from './components/tabbars/Me';
import Find from './components/tabbars/Find';
import TabNavigator from 'react-native-tab-navigator';




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
        <Text>123</Text>
        <TabNavigator>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'}
            title="热映"
            // renderIcon={() => <Image source={...} />}
            // renderSelectedIcon={() => <Image source={...} />}
            // badgeText="1"
            onPress={() => this.setState({ selectedTab: 'home' })}
            >
            <Home></Home>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'find'}
            title="找片"
            // renderIcon={() => <Image source={...} />}
            // renderSelectedIcon={() => <Image source={...} />}
            // renderBadge={() => <CustomBadgeView />}
            onPress={() => this.setState({ selectedTab: 'find' })}
            >
            <Find></Find>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'me'}
            title="我的"
            // renderIcon={() => <Image source={...} />}
            // renderSelectedIcon={() => <Image source={...} />}
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

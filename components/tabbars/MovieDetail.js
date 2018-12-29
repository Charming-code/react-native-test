import React, { Component } from 'react'

import { View, Image, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { bold } from 'ansi-colors';

export default class MovieDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movieInfo: {}, // 电影信息
      isloading: true
    }
  }

  componentWillMount() {
    // console.warn(this.props.id)
    fetch('https://api.douban.com/v2/movie/subject/' + this.props.id + '?apikey=0b2bdeda43b5688921839c8ecb20399b&city=%E5%8C%97%E4%BA%AC&client=&udid=')
      .then(res => res.json())
      .then(data => {
        // console.warn(data.id)
        this.setState({
          movieInfo: data,
          isloading: false
        })
      })
  }

  render() {
    return <View>
      {this.renderInfo()}
    </View>
  }

  renderInfo = () => {
    if (this.state.isloading) {
      return (
        <View style={styles.container}>
          <Text>Loading ...</Text>
        </View>
      )
    }
    let { height, width } = Dimensions.get('window');
    return <ScrollView style={{ backgroundColor: '#f8f7f3' }}>
      <View style={{ padding: 4 }}>

        <View style={{
          alignItems: 'center',
          justifyContent: "center",
          height: 320,
          borderBottomColor: '#e4e4e4',
          backgroundColor: '#ffffff'
        }}>
          <Image source={{ uri: this.state.movieInfo.images.large }} style={{ width: 200, height: 280 }}></Image>
        </View>

        <View style={{ borderBottomColor: '#e5e4e2', borderBottomWidth: 1, }}>
          <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
            <View style={{ marginLeft: 20 }}>
              <Text style={{
                fontSize: 25,
                fontWeight: 'bold',
                marginTop: 20,
                marginBottom: 20,
                color: '#494949'
              }}>{this.state.movieInfo.title}</Text>
              <Text>
                {this.state.movieInfo.year}/
                {this.state.movieInfo.genres[0]}
                {this.state.movieInfo.genres[1]==undefined?'':'/'+this.state.movieInfo.genres[2]}
                {this.state.movieInfo.genres[2]==undefined?'':'/'+this.state.movieInfo.genres[2]}
              </Text>
              <Text>
                上映时间：{this.state.movieInfo.mainland_pubdate}({this.state.movieInfo.countries})
              </Text>
              <Text>
                片长：{this.state.movieInfo.durations[0] == undefined ? '未知' : this.state.movieInfo.durations[0]}
              </Text>
            </View>
            <View style={{ backgroundColor: '#ffffff', alignItems: 'center', width: 80, height: 80, marginTop: 30, marginRight: 30 }}>
              <Text>豆瓣评分</Text>
              <Text>{this.state.movieInfo.rating.average==0?'暂无评分':this.state.movieInfo.rating.average}</Text>
              <Text>{this.state.movieInfo.ratings_count}人</Text>
            </View>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 30,
            marginBottom: 30
          }}>
            <Text style={{
              borderColor: '#ffac2c',
              borderWidth: 1,
              width: width * 3 / 10,
              height: 50,
              lineHeight: 50,
              textAlign: 'center',
              borderRadius: 5,
              color: '#ffac2c',
              fontSize: 13,
              fontWeight: 'bold'
            }}>想看</Text>
            <Text style={{
              borderColor: '#ffac2c',
              borderWidth: 1,
              width: width / 2,
              height: 50,
              lineHeight: 50,
              textAlign: 'center',
              borderRadius: 5,
              color: '#ffac2c',
              fontSize: 13,
              fontWeight: 'bold'
            }}>看过</Text>
          </View>

        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomColor: '#e5e4e2',
          borderBottomWidth: 1,
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#494949',
            marginTop: 30,
            marginLeft: 30,
            paddingBottom: 30,

          }}
          >选票购座</Text>
          <Text style={styles.locationIcon}></Text>
        </View>

        <View style={{ paddingLeft: 30, paddingRight: 30 }}>
          <Text style={{ marginTop: 20 }}>简介</Text>
          <Text style={{ lineHeight: 30, marginTop: 10, fontWeight: 'bold', color: '#4d4d4d' }}>{this.state.movieInfo.summary}</Text>
        </View>
      </View>
    </ScrollView>
  }

}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  locationIcon: {
    height: 15,
    width: 15,
    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 1,
    borderColor: '#cccccc',
    transform: [{ rotate: '45deg' }, { translateY: 50 }]
  },
})
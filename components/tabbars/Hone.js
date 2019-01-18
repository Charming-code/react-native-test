import React, { Component } from "react";

import { Image, FlatList, StyleSheet, Text, View, Dimensions, TouchableHighlight } from "react-native";

// 导入路由的组件
import { Actions } from 'react-native-router-flux'

var REQUEST_URL =
    "https://api.douban.com/v2/movie/in_theaters";

export default class SampleAppMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            click: false
        };
        this.fetchData = this.fetchData.bind(this);
        this.handleStyle = this.handleStyle.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        // 在线获取数据
        fetch(REQUEST_URL)
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    data: this.state.data.concat(responseData.subjects),
                    loaded: true                   
                });
            });

        // 本地获取数据
        // let responseData = require('./data/moves.json')
        // this.setState({
        //     data: this.state.data.concat(responseData.subjects),
        //     loaded: true
        // });
        // console.warn(this.state.data)

    }

    handleStyle(){
        
    }


    render() {
        if (!this.state.loaded) {
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            )
        }


        let { height, width } = Dimensions.get('window');
        width = width / 4;

        return (
            <View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundColor: '#ffffff',
                    justifyContent: 'space-between'
                }}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{ lineHeight: 40, color: '#494949',marginLeft:10 }}>北京</Text>
                        <View style={styles.locationIcon}></View>
                    </View>

                    <Text
                        style={{
                            height: 30,
                            paddingLeft: width,
                            paddingRight: width,
                            marginRight: 10,
                            lineHeight: 30,
                            color: '#9a9a9a',
                            backgroundColor: '#f5f5f5',
                            marginTop: 4,
                            borderRadius: 5
                        }}
                    >
                        电影 / 电视剧 / 影人
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    height: 50,
                    borderBottomWidth: 1,
                    borderColor: '#e4e4e4',
                    backgroundColor: '#ffffff'
                }}>
                    <Text style={{
                        width: width * 2,
                        borderBottomColor: 'black',
                        borderBottomWidth: 2,
                        textAlign: 'center',
                        lineHeight: 50,
                        fontWeight: 'bold',
                        color: '#494949'
                    }}>正在热映</Text>
                    <Text onPress={()=>{this.handleStyle()}} style={{
                        width: width * 2,
                        textAlign: 'center',
                        lineHeight: 50,
                        fontWeight: 'bold'
                    }}>即将上映</Text>
                </View>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(item, i) => item.id} // 解决 key 问题
                    renderItem={({ item }) => this.renderItem(item)} // 调用方法，去渲染每一项
                    style={styles.list}
                />
            </View>

        );
    }

    // 渲染每项电影
    renderItem = (item) => {
        return <TouchableHighlight underlayColor="#fff" onPress={() => { Actions.moviedetail({ id: item.id }) }}>
            <View style={{
                flexDirection: 'row',
                padding: 10,
                borderColor: '#e4e4e4',
                borderBottomWidth: 1,
                backgroundColor: '#ffffff',
                justifyContent: 'space-between'
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: item.images.small }} style={{ width: 100, height: 140, marginRight: 10 }}></Image>
                    <View style={{ width: 160 }}>
                        <Text style={styles.movieTitle}>{item.title}</Text>
                        <Text style={{ fontSize: 12 }}>{item.rating.average == 0 ? '暂无评' : item.rating.average}分</Text>
                        <Text style={{ fontSize: 12 }}><Text>导演：</Text>{item.directors[0].name}</Text>
                        <Text style={{ fontSize: 12 }}><Text>{item.casts==''?'':'主演：'}</Text>{item.casts==''?'':item.casts[0].name}{item.casts[1]==undefined?'':'/'+item.casts[1].name}{item.casts[2]==undefined?'':'/'+item.casts[2].name}</Text>
                    </View>
                </View>

                <View style={{ width: 90, height: 110, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: '#fe6778', fontSize: 12, marginBottom: 5 }}>{item.collect_count > 10000 ? Math.floor(item.collect_count / 1000) / 10 + '万' : item.collect_count}人看过</Text>
                    <Text style={styles.buy}>购买</Text>
                </View>
            </View>
        </TouchableHighlight>
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    movieTitle: {
        color: '#494949',
        fontWeight: 'bold',
        fontSize: 15
    },
    buy: {
        width: 50,
        fontSize: 14,
        color: '#fe6778',
        borderWidth: 1,
        borderColor: '#fe6778',
        textAlign: 'center',
        borderRadius: 5,
    },
    locationIcon: {
        height: 5,
        width: 5,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: 'black',
        transform: [{ rotate: '45deg' }, { translateX: 17 }, { translateY: 6 }],
    },
    rightContainer: {
        flex: 1
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: "center"
    },
    year: {
        textAlign: "center"
    },
    thumbnail: {
        width: 53,
        height: 81
    },
    list: {
        marginBottom: 88
    }
});
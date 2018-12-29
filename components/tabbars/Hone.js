import React, { Component } from "react";

import { Image, FlatList, StyleSheet, Text, View, TextInput, Dimensions, TouchableHighlight } from "react-native";
// import { black } from "ansi-colors";

// 导入路由的组件
import { Actions } from 'react-native-router-flux'

var REQUEST_URL =
    "https://api.douban.com/v2/movie/in_theaters";

export default class SampleAppMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false
        };
        // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
        // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        // 在线获取数据
        // fetch(REQUEST_URL)
        //     .then(response => response.json())
        //     .then(responseData => {
        //         // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
        //         this.setState({
        //             data: this.state.data.concat(responseData.subjects),
        //             loaded: true
        //         });
        //     });

        // 本地获取数据
        let responseData = require('./data/moves.json')
        this.setState({
            data: this.state.data.concat(responseData.subjects),
            loaded: true
        });

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
                    <Text style={{
                        width: width * 2,
                        textAlign: 'center',
                        lineHeight: 50,
                        fontWeight: 'bold'
                    }}>即将上映</Text>
                </View>
                <FlatList
                    data={this.state.data}
                    // renderItem={this.renderMovie}
                    keyExtractor={(item, i) => item.id} // 解决 key 问题
                    renderItem={({ item }) => this.renderItem(item)} // 调用方法，去渲染每一项
                    style={styles.list}
                />
            </View>

        );
    }

    // renderMovie({ item }) {
    //     // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
    //     // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
    //     return (
    //         <View style={styles.container} key={item.id}>
    //             <Image
    //                 source={{ uri: item.images.medium }}
    //                 style={styles.thumbnail}
    //             />
    //             <View style={styles.rightContainer}>
    //                 <Text style={styles.title}>{item.title}</Text>
    //                 <Text style={styles.year}>{item.year}</Text>
    //             </View>
    //         </View>
    //     );
    // }

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
                        <Text style={{ fontSize: 12 }}><Text>主演：</Text>{item.casts[0].name}/{item.casts[1].name}/{item.casts[2].name}</Text>
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
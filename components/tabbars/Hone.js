import React, { Component } from "react";

import { Image, FlatList, StyleSheet, Text, View, TextInput, Dimensions } from "react-native";

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
        fetch(REQUEST_URL)
            .then(response => response.json())
            .then(responseData => {
                // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
                this.setState({
                    data: this.state.data.concat(responseData.subjects),
                    loaded: true
                });
            });
    }


    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }


        let {height,width} =  Dimensions.get('window');
        width=width/4;

        return (
            <View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{lineHeight:40}}>北京</Text>
                    <Text
                    style={{ height: 40, borderColor: 'blue', borderWidth: 1,paddingLeft:width,paddingRight:width, marginLeft:10, lineHeight:40}}
                    onChangeText={(text) => this.setState({ text })}
                    >
                    电影 / 电视剧 / 影人
                    </Text>
                </View>
                <FlatList
                    data={this.state.data}
                    keyExtractor={this.state.data.collect_count}
                    renderItem={this.renderMovie}
                    style={styles.list}
                />
            </View>

        );
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>Loading movies...</Text>
            </View>
        );
    }

    renderMovie({ item }) {
        // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
        // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: item.images.medium }}
                    style={styles.thumbnail}
                />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.year}>{item.year}</Text>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
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
        paddingTop: 20,
        backgroundColor: "#F5FCFF"
    }
});
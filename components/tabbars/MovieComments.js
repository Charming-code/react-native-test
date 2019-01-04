import React, { Component } from 'react';
import { View, Image, Text, Dimensions, FlatList } from 'react-native'

export default class MovieComments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movieComments: [],
            isloading: true
        }
    }

    componentWillMount() {
        // console.warn(this.props.id)
        fetch('https://api.douban.com/v2/movie/subject/' + this.props.id + '/comments?apikey=0b2bdeda43b5688921839c8ecb20399b&count=20&client=something&udid=dddddddddddddddddddddd')
            .then(res => res.json())
            .then(data => {
                // console.warn(data.comments[0].content)
                this.setState({
                    movieComments: this.state.movieComments.concat(data.comments),
                    isloading: false
                })
                // console.warn(this.state.movieComments[0].content)
            })
    }

    render() {

        let { height, width } = Dimensions.get('window');

        return (
            <View>
                <View style={{
                    flexDirection: 'row',
                    height: 50,
                    borderBottomWidth: 1,
                    borderColor: '#e4e4e4',
                    backgroundColor: '#ffffff'
                }}>
                    <Text style={{
                        width: width / 2,
                        borderBottomColor: 'black',
                        borderBottomWidth: 2,
                        textAlign: 'center',
                        lineHeight: 50,
                        fontWeight: 'bold',
                        color: '#494949'
                    }}>评论</Text>
                    <Text style={{
                        width: width / 2,
                        textAlign: 'center',
                        lineHeight: 50,
                        fontWeight: 'bold'
                    }}>讨论区</Text>
                </View>
                <FlatList
                    data={this.state.movieComments}
                    // renderItem={this.renderMovie}
                    keyExtractor={(item, i) => item.id} // 解决 key 问题
                    renderItem={({ item }) => this.renderItem(item)} // 调用方法，去渲染每一项
                />
            </View>
        )
    }

    renderItem = (item) => {
        return (
            <View style={{marginLeft:20, marginRight:20, marginTop:20}}>
                <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={{ uri: item.author.avatar }} style={{ width: 20, height: 20, borderRadius: 20 }}></Image>
                        <Text style={{marginLeft:10}}>{item.author.name}</Text>
                        <Text style={{marginLeft:5}}>{item.rating.value}颗星</Text>
                    </View>
                    <View>
                        <Text>点赞数 {item.useful_count}</Text>
                    </View>
                </View>
                <Text style={{marginLeft:30, marginTop:5}}>
                    {item.content}
                </Text>
                <Text style={{marginLeft:30, marginTop:5}}>
                    {item.created_at}
                </Text>
            </View>
        )
    }
}

import React, { Component } from 'react'
import { Image } from 'react-native'

// 导入路由相关的组件
import { Router, Stack, Scene } from 'react-native-router-flux'

// 导入App组件
import App from './App.js'
import MovieDetail from './components/tabbars/MovieDetail.js'

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  


  render() {
    return <Router sceneStyle={{ backgroundColor: 'white' }}>
      <Stack key="root">
        {/* 配置路由规则 */}
        {/* 第一个 Scene 就是默认要展示的首页 */}
        {/* key 属性，表示路由的规则名称，将来可以使用这个 key ，进行编程式导航，每一个路由规则，都应该提供一个 唯一的key， key不能重复 */}
        <Scene key="app" component={App} title="" hideNavBar={true} />
        {/* 电影列表的路由规则 */}
        <Scene
          key="moviedetail"
          component={MovieDetail}
          title="电影详情"
          renderRightButton={<Image style={{ width: 20, height: 20, marginRight: 20 }} source={require('./images/share.png')}></Image>} />
      </Stack>
    </Router>
  }
}
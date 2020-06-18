import React from 'react';
import { SafeAreaView, View, ScrollView, StatusBar } from 'react-native';
import styles from '../styles/Home';
import SearchBar from '../components/SearchBar';
import Item from '../components/Item';
import {singerData, playListData, topicData, forYou} from '../data/data';
import MiniPlayer from '../components/MiniPlayer';

export default class Home extends React.Component {
  state = {
    isFetching: true,
    data : null
  }

  async componentWillMount(){
    const response = await fetch(`https://toeic-test-server.herokuapp.com/music/home`) // trả về tất cả bài hát, playlist, ca sĩ
    const data = await response.json(); // data: {songs, singers, playlist}
    this.setState({
      isFetching: false,
      data: data
    })
  }

  render(){
    return(
      <SafeAreaView style={{flex: 1, backgroundColor: '#0D47A1', paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <StatusBar barStyle="default" translucent/>
            <View>
              <SearchBar navigation={this.props.navigation}/>
            </View>
            <ScrollView style={styles.scrollView}>
              <Item
                category="Dành cho bạn"
                data={forYou}
                horizontal={true}
                itemAreaStyle={styles.suggestArea}
                itemPictureStyle={styles.suggestPicture}
                itemNameStyle={styles.suggestText}
                itemStyle={styles.suggestStyle}
              />
              <Item 
                category="Playlist"
                data={playListData}
                horizontal={true}
                scrollEnabled={false}
              />
              <Item 
                category="Ca sĩ" 
                data={singerData}
                horizontal={true}
                scrollEnabled={false}
                itemPictureStyle={styles.singerPictureStyle}
                itemStyle={styles.singerStyle}
              />
              <Item 
                category="Chủ đề"
                data={topicData}
                horizontal={true}
              />
            </ScrollView>
          </View>
          <MiniPlayer navigate={this.props.navigation.navigate}/>
        </View>
      </SafeAreaView>
    );
  }
}
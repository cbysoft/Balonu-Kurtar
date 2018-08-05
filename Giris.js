import React, { Component } from 'react';
import {    Text,    Navigator,    Button,    View,    ImageBackground,
    TouchableOpacity,    StyleSheet,    StatusBar,AsyncStorage} from 'react-native';
import { Action, Actions } from 'react-native-router-flux';
import Index from './index.js';

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob';

export default class Giris extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '-1'
  }
    }
    componentDidMount() {
          AsyncStorage.getItem('kiyitliPuan').then(value => this.setState({ 'name': value }))
      }

goster(){
  if(this.state.name==null){
    return(
      <View>
      </View>);}
  else{
    return(
      <View style={{bottom:10,shadowOpacity: 0.8, backgroundColor: 'rgba(224, 224, 248, 0.8)',position:'absolute',width:'70%',alignItems:'center',borderRadius:8,
    paddingTop:20,paddingBottom:20}}>
      <Text style={{ fontSize: 20, alignItems: 'center',color:'#000' }}>
      High score -  {this.state.name}
      </Text>
      </View>
    );
  }
}
    render() {
        return (
                <ImageBackground source={require('./app/img/bg.png')} style={{ flex: 1,}} >
                 <StatusBar hidden={true} />
                <View style={{flex:8,alignItems: 'center', paddingTop: 50, }}>
                    <Text style={{ fontSize: 56, alignItems: 'center',marginBottom:30,color:'#ccebff' }}>Balonu Kurtar</Text>
                    <TouchableOpacity style={{backgroundColor:'#0080ff',padding:12,borderWidth:1,borderColor:'#bf00ff',borderRadius:10}}
                     onPress={() =>  Actions.App({hız:2500})} >
                        <Text style={{color:'#fff',fontSize:25,marginLeft:'7%',marginRight:'7%'}}>Oyuna Başla</Text>
                    </TouchableOpacity>
                      {this.goster()}

                </View>
                <View style={{flex:2}}>

                <AdMobBanner
                style={{flex:2,position:'absolute',bottom:2}}
            adSize="smartBannerLandscape"
            adUnitID="ca-app-pub-6559686957406198/9299543205"
            />

                </View>
                </ImageBackground>

        );
    }

}//<Image source={require('./app/img/bg.png')} style={{flex:1, position:'relative',resizeMode:'cover'}} >

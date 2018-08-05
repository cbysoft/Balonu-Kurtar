import React, { Component } from 'react';
import {
    Text,
    Navigator,
    Button,
    View,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage
} from 'react-native';

import { Action, Actions } from 'react-native-router-flux';
import Index from './index.js';

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob';

export default class Sonuc extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '0'
      }
      this.setData(this.props.puan)//sayfa açıldığında gelen puanı setData() fonksiyonuna göndriyoruz.
    }
    componentDidMount() {
      //sayfa açıldığında hafızada var olan kaydı getiren fonksiyon.
          AsyncStorage.getItem('kiyitliPuan').then(value => this.setState({ 'name': value }))
      }
      // çağırıldığında şuanki puanı hafızaya kayıt eden fonksiyon
      setData(value){
        if(parseInt(value)>parseInt(this.state.name)){
         AsyncStorage.setItem('kiyitliPuan', value.toString());
         this.setState({ name: value.toString() });
       }
      }

    render() {
        return (
                <ImageBackground source={require('./app/img/bg.png')} style={{ flex: 1,}} >
                <View style={{flex:8, alignItems: 'center', paddingTop: 50, }}>
                    <Text style={{ fontSize: 56, alignItems: 'center',marginBottom:30,color:'#ccebff' }}>
                      Sonuç : {this.props.puan}
                    </Text>
                    <TouchableOpacity style={{backgroundColor:'#0080ff',padding:12,borderWidth:1,borderColor:'#bf00ff',borderRadius:10}}
                    onPress={() =>{Actions.App({hız:2500})}} >
                        <Text style={{color:'#fff',fontSize:25}}>Başlamak İçin Tıklayın</Text>
                    </TouchableOpacity>
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

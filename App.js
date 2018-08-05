
import React, { Component } from 'react';
import {
  Platform,  StyleSheet,  Text,  TextInput,  Animated,
  Dimensions,  Image,  Button,  Alert,  View,  AppRegistry,
  ImageBackground,  Navigator,BackAndroid,  AsyncStorage,  TouchableOpacity
} from 'react-native';

import Giris from './Giris';
import { Action, Actions, ActionConst } from 'react-native-router-flux';
import Index from './index.js';
import Dusman from './app/components/Dusman';
var a=300;
console.disableYellowBox = true; // hata ekranı kapatma
export default class kacma extends Component {

//////////////////////
  componentWillUnmount() {

    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }
////////////////////////////
  constructor(props) {
    super(props);
    this.state = {
      oyuncuHareketi: new Animated.Value(40),
      oyuncuTarafı: 'left',
      puan: 0,
      r:'o',

      dusmanHareketi: new Animated.Value(0),
      dusmanBpX: 0,
      dusmanTarafı: 'left',
      dusmanHızı: this.props.hız,

      gameOver: false,

    };
  }
  render() {

    return (
<ImageBackground source={require('./app/img/mbg.jpg')} style={{ flex: 1,}} >
      <View style={{ flex: 1,position: 'relative'}} >

        <View style={{ flex: 1, alignItems: 'center', marginTop: '10%',}}>
          <View style={styles.puan}>
            <Text style={{ fontWeight: 'bold', fontSize: 40}}>{this.state.puan}</Text>
          </View>
        </View>

        <Animated.Image source={require('./app/img/t.png')}
          style={{

            height: 100,
            width: 80,
            position: 'absolute',
            zIndex: 1,
            bottom: 50,
            resizeMode: 'stretch',
            transform: [
              { translateX: this.state.oyuncuHareketi }
            ]
          }}></Animated.Image>

        <Dusman
          dusmanImg={require('./app/img/r.png')}
          dusmanBpX={this.state.dusmanBpX}
          dusmanHareketi={this.state.dusmanHareketi}
        />

        <View style={styles.kontrol}>
          <View style={styles.kontrolIc}>
            <Text style={styles.left}  onPress={() => this.hareket('left')}>{<Image style={{height:200,width:200}} source={require('./app/img/left.png')}/>}</Text>
            <Text style={styles.right} onPress={() => this.hareket('right')}>{<Image style={{height:200,width:200}} source={require('./app/img/right.png')}/>}</Text>
          </View>
        </View>
      </View>
      </ImageBackground>
    );



  }

  hareket(direction) {
    if (direction == 'right') {
      this.setState({ oyuncuTarafı: 'right' });

      Animated.spring(
        this.state.oyuncuHareketi,
        {
          toValue: Dimensions.get('window').width - 130,
          tension: 65,
        }
      ).start();

    } else if (direction == 'left') {
      this.setState({ oyuncuTarafı: 'left' });

      Animated.spring(
        this.state.oyuncuHareketi,
        {
          toValue: 40,
          tension: 65,
        }
      ).start();
    }
  }


  componentDidMount(){
    this.dusmanAni();
      BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  }



  dusmanAni(){
    this.state.dusmanHareketi.setValue(-100);
    var windowH=Dimensions.get('window').height;

    var r=Math.floor(Math.random()*2)+1;

    if  (r==2){
      r=40;
      this.setState({dusmanTarafı:'left'});

    } else {
      r=Dimensions.get('window').width-130;
      this.setState({dusmanTarafı:'right'});
    }
    this.setState({dusmanBpX:r});

    var yenilemeA;
    yenilemeA=setInterval(()=>{


      if (this.state.dusmanHareketi._value > windowH - 280
        && this.state.dusmanHareketi._value < windowH -180
        && this.state.oyuncuTarafı==this.state.dusmanTarafı){
            clearInterval(yenilemeA)
            this.setState({gameOver:true});
            this.gameOver();
        }
    }, 50);

      setInterval( ()=> {
        this.setState({dusmanHızı: this.state.dusmanHızı-50})
      },20000);

      Animated.timing(
        this.state.dusmanHareketi,
        {
            toValue:Dimensions.get('window').height,
            duration:this.state.dusmanHızı,
        }
      ).start(event=>{
        if(event.finished && this.state.gameOver == false){
          clearInterval(yenilemeA);
          this.setState({puan:++this.state.puan}); ;
          this.dusmanAni();
        }
      });

  }

gameOver(){

 Actions.Sonuc({puan:this.state.puan,renk:"kırmızı"})
  {this.setState({r:'s'});};



}

sonc(){

  //Actions.App({ type:ActionConst.REFRESH })

  this.setState({oyuncuTarafı:'left'});
  this.setState({puan:0});
  this.setState({r:'o'});
  this.setState({dusmanBpX:0});
  this.setState({dusmanTarafı:'left'});
  this.setState({dusmanHızı:a});
  this.setState({gameOver:false});



  {this.setState({r:'o'});};

}
}

const styles = StyleSheet.create({

  kontrol: {
    alignItems: 'center',
    width:'100%',
    },
  kontrolIc: {
    alignItems: 'center',
    flexDirection: 'row',
    width:'90%',
  },
  left: {
    flex: 1,
  },
    right: {
    flex: 1,
    marginLeft:'61%',
  },
  puan: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#d9d9d9'
  }




});
AppRegistry.registerComponent('kacma', () => kacma);

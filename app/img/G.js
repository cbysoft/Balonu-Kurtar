
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  Animated,
  Dimensions,
  Image,
  Button,
  Alert,
  View,
  AppRegistry,
  Navigator
} from 'react-native';

import Giris from './Giris';

import Dusman from './app/components/Dusman';
var a=4200;
export default class kacma extends Component {

  constructor(props) {
    super(props);
    this.state = {
      oyuncuHareketi: new Animated.Value(40),
      oyuncuTarafı: 'left',
      puan: 0,

      dusmanHareketi: new Animated.Value(0),
      dusmanBpX: 0,
      dusmanTarafı: 'left',     
      dusmanHızı: a,

      gameOver: false,  

    };
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'green', position: 'relative'}} >

        <View style={{ flex: 1, alignItems: 'center', marginTop: 80 }}>
          <View style={styles.puan}>
            <Text style={{ fontWeight: 'bold', fontSize: 40 }}>{this.state.puan}</Text>
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
          <Text style={styles.left}  onPress={() => this.hareket('left')}>{<Image style={{height:120,width:120}} source={require('./app/img/left.png')}/>}</Text>
          <Text style={styles.right} onPress={() => this.hareket('right')}>{<Image style={{height:120,width:120}} source={require('./app/img/right.png')}/>}</Text>
        </View>
      </View>
    );
  }

  hareket(direction) {
    if (direction == 'right') {
      this.setState({ oyuncuTarafı: 'right' });

      Animated.spring(
        this.state.oyuncuHareketi,
        {
          toValue: Dimensions.get('window').width - 240,
          tension: 50,
        }
      ).start();

    } else if (direction == 'left') {
      this.setState({ oyuncuTarafı: 'left' });

      Animated.spring(
        this.state.oyuncuHareketi,
        {
          toValue: 40,
          tension: 50,
        }
      ).start();
    }
  }

  componentDidMount(){
    this.dusmanAni();
  }

  dusmanAni(){
    this.state.dusmanHareketi.setValue(-100);
    var windowH=Dimensions.get('window').height;

    var r=Math.floor(Math.random()*2)+1;

    if  (r==2){
      r=40;
      this.setState({dusmanTarafı:'left'});

    } else {
      r=Dimensions.get('window').width-240;
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
          this.setState({puan:++this.state.puan}); a=a-50; 
          this.dusmanAni();
        }
      });

  }

gameOver(){
 
   
  alert('Kaybettiniz!');
}
}

const styles = StyleSheet.create({

  kontrol: { 
    alignItems: 'center',
    flexDirection: 'row'
  },

  right: {
    flex: 1,
    color: '#fff',
    margin: 0,
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft:150
  },
  left: {
    flex: 1,
    color: '#fff',
    marginRight:150,

    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'right'
  },
  puan: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  }




});
AppRegistry.registerComponent('kacma', () => kacma);
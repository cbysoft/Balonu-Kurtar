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
  AppRegistry
} from 'react-native';
export default class Dusman extends Component{

    render() {
        return(
            <Animated.Image source={this.props.dusmanImg}
                style={{
                    height:100,
                    width:100,
                    position:'absolute',
                    resizeMode:'stretch',
                    left:this.props.dusmanBpX,
                    transform: [
                        {translateY:this.props.dusmanHareketi}
                    ]
                }}></Animated.Image>
        );
    }

}//<Image source={require('./app/img/bg.png')} style={{flex:1, position:'relative',resizeMode:'cover'}} >
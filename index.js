import React, { Component } from 'react';
import {Router,Scene} from 'react-native-router-flux';
import {AppRegistry} from 'react-native';

import App from './App';
import Sonuc from './Sonuc';
import Giris from './Giris';

const Index = ()=>{
    return(
        <Router>
            <Scene>
                <Scene
                key="Giris"
                component = {Giris}
                title="Giris"
                hideNavBar='false'
                initial
                />
                <Scene
                key="App"
                component = {App}
                title="            --OYUNA BAŞLA--" 
                hideNavBar='false'

                />
                <Scene
                key="Sonuc"
                component = {Sonuc}
                title="Sonuc"
                hideNavBar='false'
                /> 
                 
            </Scene>
        </Router>
    );  
}
AppRegistry.registerComponent('kacma', () => Index);
export default Index;


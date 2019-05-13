
/*
 * Qube State Livestream Client for wss://live.qubichub.xyz/watch
 */
import React, { Component } from 'react'
import { Point, qube } from  '../api/Qube'
import { View, Text } from 'react-native'
import SolidButton from 'playground/components/buttons/SolidButton';
import WS from 'react-native-websocket'

export default class LiveStream extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewers: null,
      qube: null,
    }
  }

  render () {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <WS
      ref={ref => {this.ws = ref}}
      url="wss://live.qubichub.xyz/watch"
      onOpen={() => {
        console.log('live stream websockets connection open')
      }}
      onMessage={(e) => {
        const data = JSON.parse(e.data)
        this.setState({viewers: data.viewers, qube: data.state});
        qube.clear();
        for (var x=0; x<6; x++) {
          for (var y=0; y<6; y++) {
            for (var z=0; z<6; z++) {
              if(data.state[x][y][z] == true){
                qube.plot( new Point(x,y,z) );
              }
            }
          }
        }
      }}
      onError={(e) => console.log(JSON.parse(e.data))}
      onClose={console.log}
      />
      <Text style={{fontSize: 18}}> {this.state.viewers + " Qube owners watching!"} </Text>
      <SolidButton
        onPress={this.ws.close()}
        style={[styles.button, {backgroundColor: Colors.themeBlue}]}
        fontSize={18}
        title="Connect"
       />
       <SolidButton
        onPress={this.ws.close()}
        style={[styles.button, {backgroundColor: Colors.themePink}]}
        fontSize={18}
        title="Disconnect"
       />
      </View>
    )
  }
}
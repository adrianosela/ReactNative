/*
 * Qube State Livestream Client for wss://live.qubichub.xyz/watch
 */
import React, { Component } from 'react'
import { View, Text } from 'react-native'
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
        // TODO: instead of logging, parse the qube state and plot with bluetooth wrapper
        console.log(this.state);
      }}
      onError={(e) => console.log(JSON.parse(e.data))}
      onClose={console.log}
      />
      <Text style={{fontSize: 18}}> {this.state.viewers + " Qube owners watching!"} </Text>
      </View>
    )
  }
}

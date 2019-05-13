import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import SoundManager from 'QubicHub/managers/SoundManager';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    button: {
        width: 200,
        height: 90,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.onPress = this.onPress.bind(this);
    }

    onPress(e) {
        if (this.props.playSound) {
            SoundManager.getInstance().playSound("click");
        }

        if (this.props.onPress) {
            this.props.onPress(e);
        }
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={0.7} {...this.props} onPress={this.onPress} style={null}>
                <View {...this.props} style={[styles.button, this.props.style]}>
                    <Text style={{ color: this.props.fontColor, fontSize: this.props.fontSize }}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    static defaultProps = {
        title: '',
        fontColor: 'white',
        fontSize: 18,
        playSound: true,
    }
}

/*
 * 3D Cube implementation extended from https://github.com/ochanje210/react-native-cube
 */

import React, { Component, PropTypes } from 'react';
import { Dimensions, PanResponder, View, ScrollView } from 'react-native';
import MatrixMath from 'react-native/Libraries/Utilities/MatrixMath';
import PinchZoomView from 'react-native-pinch-zoom-view'

// rotateXY rotates the cube on the xy plane
const rotateXY = (dx, dy) => {
  const radX = (Math.PI / 180) * dy;
  const cosX = Math.cos(radX);
  const sinX = Math.sin(radX);
  const radY = (Math.PI / 180) * -dx;
  const cosY= Math.cos(radY);
  const sinY = Math.sin(radY);
  return [
    cosY, sinX * sinY, cosX * sinY, 0,
    0, cosX, -sinX, 0,
    -sinY, cosY * sinX, cosX * cosY, 0,
    0, 0, 0, 1
  ];
};

// rotateXY rotates the cube on the xz plane
const rotateXZ = (dx, dy) => {
  const radX = (Math.PI / 180) * dx;
  const cosX = Math.cos(radX);
  const sinX = Math.sin(radX);
  const radY = (Math.PI / 180) * dy;
  const cosY= Math.cos(radY);
  const sinY = Math.sin(radY);
  return [
    cosX, -cosY * sinX, sinX * sinY, 0,
    sinX, cosX * cosY, -sinY * cosX, 0,
    0, sinY, cosY, 0,
    0, 0, 0, 1
  ];
};

// transformOrigin shifts the origin of the matrix
const transformOrigin = (matrix, origin) => {
  const { x, y, z } = origin;

  const translate = MatrixMath.createIdentityMatrix();
  MatrixMath.reuseTranslate3dCommand(translate, x, y, z);
  MatrixMath.multiplyInto(matrix, translate, matrix);

  const untranslate = MatrixMath.createIdentityMatrix();
  MatrixMath.reuseTranslate3dCommand(untranslate, -x, -y, -z);
  MatrixMath.multiplyInto(matrix, matrix, untranslate);
};

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const styles = {
  container: {
    position: 'absolute',
    left: WIDTH / 2 - 50,
    top: HEIGHT / 2 - 50,
    width: 100,
    height: 100,
    backgroundColor: "transparent"
  },
  rectangle: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 100,
    height: 100,
    zIndex: 10
  }
};

export default class Cube extends Component {
  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove.bind(this)
    });
  }

  handlePanResponderMove (e, gestureState) {
    const { dx, dy } = gestureState;
    const origin = { x: 0, y: 0, z: -50 };

    let matrix = rotateXY(dx, dy);
    transformOrigin(matrix, origin);
    this.refViewFront.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXY(dx + 180, dy);
    transformOrigin(matrix, origin);
    this.refViewBack.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXY(dx + 90, dy);
    transformOrigin(matrix, origin);
    this.refViewRight.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXY(dx - 90, dy);
    transformOrigin(matrix, origin);
    this.refViewLeft.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXZ(dx, dy - 90);
    transformOrigin(matrix, origin);
    this.refViewTop.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});

    matrix = rotateXZ(-dx, dy + 90);
    transformOrigin(matrix, origin);
    this.refViewBottom.setNativeProps({style: {transform: [{perspective: 1000}, {matrix: matrix}]}});
  }

  renderLeft(color) {
    return (
      <View
        ref={component => this.refViewRight = component}
        style={[styles.rectangle, (color) ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}
      />
    )
  }

  renderRight(color) {
    return (
      <View
        ref={component => this.refViewLeft = component}
        style={[styles.rectangle, (color) ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}
      />
    )
  }

  renderFront(color) {
    return (
      <View
        ref={component => this.refViewFront = component}
        style={[styles.rectangle, (color) ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}
      />
    )
  }

  renderBack(color) {
    return (
      <View
        ref={component => this.refViewBack = component}
        style={[styles.rectangle, (color) ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}
      />
    )
  }

  renderTop(color) {
    return (
      <View
        ref={component => this.refViewTop = component}
        style={[styles.rectangle, (color) ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}
      />
    )
  }

  renderBottom(color) {
    return (
      <View
        ref={component => this.refViewBottom = component}
        style={[styles.rectangle, (color) ? {backgroundColor: color} : null]}
        {...this.panResponder.panHandlers}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderFront('#4c72e0')}
        {this.renderBack('#8697df')}
        {this.renderLeft('#b5bce2')}
        {this.renderRight('#e5afb9')}
        {this.renderTop('#de7c92')}
        {this.renderBottom('#d1426b')}
      </View>
    );
  }
}

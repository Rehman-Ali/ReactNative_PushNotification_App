// Loading.js
import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import firebase from 'firebase';

export default class Loading extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user === null) {
        this.props.navigation.navigate('login');
      } else {
        if (user.email === 'user@gmail.com') {
          this.props.navigation.navigate('purchaser');
        } else if (user.email === 'admin@gmail.com') {
          this.props.navigation.navigate('admin');
        } else {
          this.props.navigation.navigate('accountant');
        }
      }
       console.log('user', user);
    });
      }
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

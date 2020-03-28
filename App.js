import React, {Fragment} from 'react';
import Login from './screens/Login';
import Signup from './screens/Signup';
import AdminProfile from './screens/AdminProfile';
import PurchaserProfile from './screens/PurchaserProfile';
import AccountantProfile from './screens/AcountantProfile';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Loading from './components/Loader';
import './src/config';
import {View, Button, StyleSheet, Alert} from 'react-native';
import firebase from 'firebase';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="accountant"
          component={AccountantProfile}
          options={{
            title: 'Accountant Profile',
            headerLeft: null,
            headerRight: () => (
              <View style={styles.btn}>
                <Button
                  onPress={() => firebase.auth().signOut()}
                  title="Logout"
                  color="#fb5b5a"
                />
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="admin"
          component={AdminProfile}
          options={{
            title: 'Admin Profile',
            headerLeft: null,
            headerRight: () => (
              <View style={styles.btn}>
                <Button
                  onPress={() => firebase.auth().signOut()}
                  title="Logout"
                  color="#fb5b5a"
                />
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="purchaser"
          component={PurchaserProfile}
          options={{
            title: 'Purchaser Profile',
            headerLeft: null,
            headerRight: () => (
              <View style={styles.btn}>
                <Button
                  onPress={() => firebase.auth().signOut()}
                  title="Logout"
                  color="#fb5b5a"
                />
              </View>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  btn: {
    marginRight: 10,
  },
});

export default App;

import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {notificationManager} from '../../src/NotificationManager';
import {db} from '../../src/config';
const PurchaserProfile = props => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  let localNotify = null;

  const [allBillInfo, setAllBillInfo] = useState();

  const onRegister = token => {
    console.log('[Notification] Register', token);
  };
  const onNotification = notify => {
    console.log('[Notification] onNotification', notify);
  };
  const onOpenNotification = notify => {
    console.log('[Notification] onOpenNotification', notify);
    Alert.alert('Admin Approved Bill!');
  };
  useEffect(() => {
    localNotify = notificationManager;
    localNotify.configure(onRegister, onNotification, onOpenNotification);
  });

  const onPressCancelNotification = () => {
    localNotify.cancelAllLocalNotification();
  };

  const onPressSendNotification = () => {
    localNotify.showNotification(
      1,
      'App Notification',
      '{}', // data
      '{}', // option
    );
  };

  const addNewTodo = () => {
    db.ref('bill/').push({
      username: name,
      billing_amount: amount,
      description: description,
      status: 0,
    });

    Alert.alert('Action!', 'Your Request has been submitted.');

    setName('');
    setAmount('');
    setDescription('');
  };
  useEffect(() => {
    db.ref('bill/')
      .orderByChild('status')
      .on(
        'child_changed',
        function(snapshot) {
          const changedStatus = snapshot.val();
          if (changedStatus.status === 1) {
            localNotify.showNotification(
              1,
              'Bill Approved',
              '{}', // data
              '{}', // option
            );
          }
        },
        [],
      );
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.inputParent}>
        <TextInput
          style={styles.input}
          onChangeText={text => setName(text)}
          value={name}
          placeholder="Enter Name"
        />
      </View>
      <View style={styles.inputParent}>
        <TextInput
          style={styles.input}
          onChangeText={text => setAmount(text)}
          value={amount}
          placeholder="Enter Your Amount"
        />
      </View>
      <View style={styles.inputParent}>
        <TextInput
          placeholder="Enter Description"
          multiline={true}
          numberOfLines={4}
          style={styles.input}
          onChangeText={text => setDescription(text)}
          value={description}
        />
      </View>
      <View style={styles.alignBtn}>
        <TouchableOpacity style={styles.btn} onPress={() => addNewTodo()}>
          <Text style={styles.loginText}>Make Request</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  input: {
    width: '100%',
    height: 44,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  inputParent: {
    width: '95%',
    margin: 10,
  },
  alignBtn: {
    flexDirection: 'row',
    // alignContent: 'center',
    // alignItems:'center',
    alignSelf: 'center',
  },
  btn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});

export default PurchaserProfile;

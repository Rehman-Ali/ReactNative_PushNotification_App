import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';
import {db} from '../../src/config';
import {notificationManager} from '../../src/NotificationManager';

const AcountantProfile = props => {
  const [allBillInfo, setAllBillInfo] = useState();

  useEffect(() => {
    db.ref()
      .child('bill')
      .orderByChild('status')
      .equalTo(1)
      .on('value', querySnapShot => {
        let matchingProducts = [];
        querySnapShot.forEach(child => {
          matchingProducts = [child.val(), ...matchingProducts];
          setAllBillInfo(matchingProducts);
        });
      });
  }, []);

  let localNotify = null;

  const onRegister = token => {
    console.log('[Notification] Register', token);
  };
  const onNotification = notify => {
    console.log('[Notification] onNotification', notify);
  };
  const onOpenNotification = notify => {
    console.log('[Notification] onOpenNotification', notify);
    Alert.alert('Admin Approved Bill');
  };
  useEffect(() => {
    localNotify = notificationManager;
    localNotify.configure(onRegister, onNotification, onOpenNotification);
  });

  useEffect(() => {
    db.ref('bill/')
      .orderByChild('status')
      .on('child_changed', function(snapshot) {
        var changedStatus = snapshot.val();
        if (changedStatus.status === 1) {
          localNotify.showNotification(
            1,
            'Admin Approved Bill',
            '{}', // data
            '{}', // option
          );
        }
      });
  }, []);

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

  return (
    <ScrollView>
      <View style={styles.container}>
        {allBillInfo !== null &&
        allBillInfo !== undefined &&
        allBillInfo.length > 0 ? (
          allBillInfo.map((item, index) => (
            <View style={styles.main} key={index}>
              <Text style={styles.info}>Approved Bill Info: </Text>
              <Text style={styles.textInfo}>User Name: {item.username}</Text>
              <Text style={styles.textInfo}>
                User Amount: {item.billing_amount}
              </Text>
              <Text style={styles.textInfo}>
                Description: {item.description}
              </Text>
              <Text style={styles.textInfo}>status : Approved</Text>
            </View>
          ))
        ) : (
          <Text>No order yet!</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDFD',
  },
  main: {
    elevation: 10,
    height: 150,
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 5,
  },
  info: {
    fontWeight: 'bold',
    fontSize: 16,
    margin: 5,
  },
  textInfo: {
    marginLeft: 5,
  },
  btnView: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 30,
  },
  Btn: {
    backgroundColor: '#fb5b5a',
    borderRadius: 5,
    height: 30,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Btn2: {
    backgroundColor: '#003f5c',
    borderRadius: 5,
    height: 30,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
});

export default AcountantProfile;

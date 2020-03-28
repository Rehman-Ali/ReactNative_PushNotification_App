import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  ScrollView,
  Alert,
} from 'react-native';
import {db} from '../../src/config';
import {notificationManager} from '../../src/NotificationManager';
const AdminProfile = props => {
  const [allBillInfo, setAllBillInfo] = useState();

  let localNotify = null;

  const onRegister = token => {
    console.log('[Notification] Register', token);
  };
  const onNotification = notify => {
    console.log('[Notification] onNotification', notify);
  };
  const onOpenNotification = notify => {
    console.log('[Notification] onOpenNotification', notify);
    Alert.alert('User Added Bill!');
  };

  useEffect(() => {
    localNotify = notificationManager;
    localNotify.configure(onRegister, onNotification, onOpenNotification);
  });

  useEffect(() => {
    db.ref('bill/')
      .once('value')
      .then(dataSnapshot => {
        return dataSnapshot.numChildren();
      })
      .then(count => {
        db.ref('bill/').on('child_added', child => {
          if (count > 0) {
            count--;
            return;
          }
          localNotify.showNotification(
            1,
            'User Add Bill',
            '{}', // data
            '{}', // option
          );
        });
      });
  }, []);
 
  useEffect(() => {
    db.ref('bill/').on('value', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      let billItems = {...data};
      setAllBillInfo(billItems);
    });
  }, []);

  let billArray = [];
  if (allBillInfo !== null && allBillInfo !== '' && allBillInfo !== undefined) {
    billArray = Object.values(allBillInfo);
  }

  const onClickApproved = (item, index) => {
    db.ref('bill/')
      .once('value')
      .then(snapshot => {
        const arr = snapshot.val();
        const arr2 = Object.keys(arr);
        const key = arr2[index];
        console.log('uid', key);
        db.ref('bill/')
          .child(key)
          .update({
            username: item.username,
            billing_amount: item.billing_amount,
            description: item.description,
            status: 1,
          });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const onClickRejected = (item, index) => {
    db.ref('bill/')
      .once('value')
      .then(snapshot => {
        const arr = snapshot.val();
        const arr2 = Object.keys(arr);
        const key = arr2[index];
        console.log('uid', key);
        db.ref('bill/')
          .child(key)
          .update({
            username: item.username,
            billing_amount: item.billing_amount,
            description: item.description,
            status: 3,
          });
      })
      .catch(error => {
        console.error(error);
      });
  };

 return (
    <View style={styles.container}>
      <ScrollView>
        {billArray.length > 0 ? (
          billArray.map((item, index) => (
            <View style={styles.main} key={index}>
              <Text style={styles.info}>Bill Info: </Text>
              <Text style={styles.textInfo}>User Name: {item.username}</Text>
              <Text style={styles.textInfo}>
                User Amount: {item.billing_amount}{' '}
              </Text>
              <Text style={styles.textInfo}>
                Description: {item.description}
              </Text>
              <View style={styles.btnView}>
                {item.status !== 3 && (
                  <TouchableOpacity
                    style={styles.Btn}
                    onPress={() => onClickApproved(item, index)}>
                    <Text style={styles.text}>Approved</Text>
                  </TouchableOpacity>
                )}
                {item.status !== 1 && (
                  <TouchableOpacity
                    style={styles.Btn2}
                    onPress={() => onClickRejected(item, index)}>
                    <Text style={styles.text}>Reject</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        ) : (
          <Text>No order yet!</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDFD',
  },
  main: {
    elevation: 10,
    height: 180,
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

export default AdminProfile;

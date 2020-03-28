import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

class NotificationManager {
  configure = (onRegister, onNotification, onOpenNotification) => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        onRegister(token);
        console.log('[NotificationManager] onRegister token:', token);
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('[NotificationManager] onNOTIFICATION:', notification);

        if (Platform.OS === 'ios') {
          if (notification.data.openInForeground) {
            notification.userInteraction = true;
          }
        } else {
          notification.userInteraction = true;
        }

        if (notification.userInteraction) {
          onOpenNotification(notification);
        } else {
          onNotification(notification);
        }

        // Onlu callback if not  from foreground
        if (Platform.OS === 'ios') {
          if (!notification.data.openInForeground) {
            notification.finish('backgroundFetchResultNoData');
          }
        } else {
          notification.finish('backgroundFetchResultNoData');
        }
      },
    });
  };

  _buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
    return {
      id: id,
      autoCancel: true,
      largeIcon: options.largeIcon || 'ic_luncher',
      smallIcon: options.smallIcon || 'ic_luncher',
      bigText: message || '',
      subText: title || '',
      vibrate: options.vibrate || false,
      vibration: options.vibration || 300,
      priority: options.priority || 'high',
      importance: options.importance || 'high',
      data: data,
    //   foreground: true,
    };
  };

  showNotification = (id, title, message, data = {}, options = {}) => {
    PushNotification.localNotification({
      /* For Android Only */
      ...this._buildAndroidNotification(id, title, message, data, options),

      /* For both IOS and Android properties */
      title: title || '',
      message: message || '',
      playSound: options.playSound || false,
      soundName: options.soundName || 'default',
      userInteraction: false, // if the notification was opened by the user from notification area or not.
    });
  };

  cancelAllLocalNotification = () => {
    PushNotification.cancelAllLocalNotifications();
  };
  unregister = () => {
    PushNotification.unregister();
  };
}

export const notificationManager = new NotificationManager();

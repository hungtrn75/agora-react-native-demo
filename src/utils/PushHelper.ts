import notifee, {AndroidImportance} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

export class PushHelper {
  static initPushNotifications = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();
    // Create a channel (required for Android)
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
    await messaging().registerDeviceForRemoteMessages();
    // Get the token
    const token = await messaging().getToken();
    console.log('fcmToken', token);
  };

  static pushNotification = async (title: string, body: string) => {
    console.log('pushNotification', title, body);

    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId: 'default',
        importance: AndroidImportance.HIGH,
        smallIcon: 'ic_small_icon',
        color: '#FFFFFF',
      },
    });
  };
}

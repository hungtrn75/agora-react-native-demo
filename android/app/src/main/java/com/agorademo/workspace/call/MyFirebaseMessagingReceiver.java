package com.agorademo.workspace.call;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.util.Log;
import com.facebook.react.HeadlessJsTaskService;
import com.google.firebase.messaging.RemoteMessage;
import io.invertase.firebase.app.ReactNativeFirebaseApp;
import io.invertase.firebase.common.ReactNativeFirebaseEventEmitter;
import io.invertase.firebase.common.SharedUtils;
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingHeadlessService;
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingReceiver;
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingSerializer;
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingStoreHelper;
import java.util.HashMap;

public class MyFirebaseMessagingReceiver extends ReactNativeFirebaseMessagingReceiver {
  private static final String TAG = "MyFirebaseMsgService";
  static HashMap<String, RemoteMessage> notifications = new HashMap<>();

  @Override
  public void onReceive(Context context, Intent intent) {
    super.onReceive(context, intent);
    if (ReactNativeFirebaseApp.getApplicationContext() == null) {
      ReactNativeFirebaseApp.setApplicationContext(context.getApplicationContext());
    }
    RemoteMessage remoteMessage = new RemoteMessage(intent.getExtras());
    ReactNativeFirebaseEventEmitter emitter = ReactNativeFirebaseEventEmitter.getSharedInstance();
    Log.e(TAG,"asdasdsad");
    // Add a RemoteMessage if the message contains a notification payload
    if (remoteMessage.getNotification() != null) {
      notifications.put(remoteMessage.getMessageId(), remoteMessage);
      ReactNativeFirebaseMessagingStoreHelper.getInstance()
          .getMessagingStore()
          .storeFirebaseMessage(remoteMessage);
    }

    //  |-> ---------------------
    //      App in Foreground
    //   ------------------------
    if (SharedUtils.isAppInForeground(context)) {
      return;
    }

    //  |-> ---------------------
    //    App in Background/Quit
    //   ------------------------

    try {
      Intent backgroundIntent =
          new Intent(context, IncomingCallService.class);
      Log.e(TAG, remoteMessage+"");
      backgroundIntent.putExtra("message", remoteMessage);
      ComponentName name = context.startForegroundService(backgroundIntent);
      if (name != null) {
        HeadlessJsTaskService.acquireWakeLockNow(context);
      }
    } catch (IllegalStateException ex) {
      // By default, data only messages are "default" priority and cannot trigger Headless tasks
      Log.e(TAG, "Background messages only work if the message priority is set to 'high'", ex);
    }
  }
}

package com.agorademo.workspace.call;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;
import android.util.Log;
import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;
import com.agorademo.R;

public class IncomingCallService extends Service {
  @Nullable
  @Override
  public IBinder onBind(Intent intent) {
    return null;
  }

  @Override
  public int onStartCommand(Intent intent, int flags, int startId) {
    Notification notification = buildNotification();
    startForeground(1, notification);
    sendBroadcast(new Intent());
    Log.e("onStartCommand","");
    return START_NOT_STICKY;
  }

  private Notification buildNotification() {
    Intent fullScreenIntent = new Intent(this, IncomingCallActivity.class);
    PendingIntent fullScreenPendingIntent = PendingIntent.getActivity(this, 0, fullScreenIntent, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);
    NotificationManager notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      notificationManager.createNotificationChannel(new NotificationChannel("123", "123", NotificationManager.IMPORTANCE_HIGH));
    }
    NotificationCompat.Builder notificationBuilder =
        new NotificationCompat.Builder(this, "123")
            .setSmallIcon(R.drawable.baseline_notifications_24)
            .setContentTitle("Incoming call")
            .setContentText("(919) 555-1234")
            .setPriority(NotificationCompat.PRIORITY_MAX)
            .setCategory(NotificationCompat.CATEGORY_CALL)
            .setFullScreenIntent(fullScreenPendingIntent, true);
    notificationBuilder.setAutoCancel(true);

    return notificationBuilder.build();
  }

}

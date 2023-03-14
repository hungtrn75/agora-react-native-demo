package com.agorademo.workspace.call;

import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Build.VERSION;
import android.os.Build.VERSION_CODES;
import android.view.WindowManager;
import android.view.WindowManager.LayoutParams;
import android.widget.ImageView;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import com.agorademo.MainActivity;
import com.agorademo.R;
import com.bumptech.glide.Glide;
import com.bumptech.glide.load.resource.bitmap.RoundedCorners;
import com.bumptech.glide.request.RequestOptions;

public class IncomingCallActivity extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_incoming_call);
    if (VERSION.SDK_INT >= VERSION_CODES.O_MR1) {
      setShowWhenLocked(true);
      setTurnScreenOn(true);
    }
    getWindow().addFlags(
        LayoutParams.FLAG_SHOW_WHEN_LOCKED);
    getWindow().addFlags(
        LayoutParams.FLAG_DISMISS_KEYGUARD
            | LayoutParams.FLAG_KEEP_SCREEN_ON
            | LayoutParams.FLAG_TURN_SCREEN_ON
            | LayoutParams.FLAG_ALLOW_LOCK_WHILE_SCREEN_ON);
    getWindow().addFlags(LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
    getWindow().addFlags(LayoutParams.FLAG_TRANSLUCENT_STATUS);
    getWindow().setStatusBarColor(Color.TRANSPARENT);
    setupViews();
  }

  private void setupViews() {
    ImageView avatar = findViewById(R.id.avatar);
    Glide.with(this).load(Uri.parse(
            "https://lh3.googleusercontent.com/ogw/AAEL6shdNg2kSbrIOLHiHzeV9sTLEhxRZCzrCboR0yNqVQ=s150-c-mo"))
        .apply(
            RequestOptions.bitmapTransform(new RoundedCorners(250))).into(avatar);

    ImageView closeBtn = findViewById(R.id.imb_reject);
    closeBtn.setOnClickListener(v -> {
      stopService();
    });

    ImageView acceptBtn = findViewById(R.id.imb_accept);
    acceptBtn.setOnClickListener(v -> {
      Intent intent = new Intent(IncomingCallActivity.this, MainActivity.class);
      startActivity(intent);
    });
  }

  private void stopService() {
    Intent stopIntent = new Intent(IncomingCallActivity.this, IncomingCallService.class);
    stopService(stopIntent);
  }
}
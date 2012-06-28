package com.xgame.delve;

import android.app.Activity;
import android.os.Bundle;
import org.apache.cordova.*;

public class DelveActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //setContentView(R.layout.main);
        //this.appView.getSettings().setAllowFileAccess(true);
        super.loadUrl("file:///android_asset/www/index.html");
        //super.loadUrl("http://192.168.1.102/");
    }
}
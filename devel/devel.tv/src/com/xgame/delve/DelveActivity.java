package com.xgame.delve;

import java.io.File;
import android.os.Bundle;
import org.apache.cordova.*;

public class DelveActivity extends DroidGap {
	private DelveHTTPD httpServer;
	private File wwwRoot;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		try {
			this.wwwRoot = new File(this.getFilesDir().getAbsolutePath()
					+ File.separator + LocationUtils.assetsFlag);
			if (this.wwwRoot.exists()) {
				this.wwwRoot.delete();
			}
			LocationUtils.copyAsset(this.getContext(), this.getFilesDir());
			this.httpServer = new DelveHTTPD(8080, this.wwwRoot);
		} catch (Exception e) {
			e.toString();
		}

		// Initialize activity
		super.init();

		// Clear cache if you want
		super.appView.clearCache(true);

		super.appView.getSettings().setAllowFileAccess(true);
		super.appView.getSettings().setAllowContentAccess(true);

		super.setStringProperty("errorUrl",
				"file:///android_asset/www/error.html"); // if error loading
															// file in
															// super.loadUrl().
		super.loadUrl("http://localhost:8080/");
		// super.loadUrl("file:///android_asset/www/index.html");
		// super.loadUrl("http://192.168.1.102/");
	}

	private void test() {
		try {
			if (this.httpServer != null) {
				this.httpServer.stop();
			}
			if (this.wwwRoot.exists()) {
				this.wwwRoot.delete();
			}
		} catch (Exception e) {

		}
	}
}
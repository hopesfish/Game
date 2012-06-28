package com.xgame.delve;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import android.content.Context;

public class LocationUtils {
	public static final String assetsFlag = "assets" + File.separator + "www";

	private static boolean extract (File zip, File dir) {
		ZipInputStream zis = null;
		ZipEntry zipent = null;
		BufferedOutputStream bos = null;
		byte[] buf = null;
		int bufLen = 2048;
		int count = -1;
		try {
			zis = new ZipInputStream(new BufferedInputStream(
					new FileInputStream(zip.getAbsolutePath())));
			buf = new byte[bufLen];
			while ((zipent = zis.getNextEntry()) != null) {
				String entName = zipent.getName();
				
				String destFilePath = dir.getAbsolutePath()
						+ File.separator + entName;
				String destDirPath = destFilePath.substring(0,
						destFilePath.lastIndexOf(File.separator));
				File destDir = new File(destDirPath);

				if (!destDir.exists()) {
					if (!destDir.mkdirs()) {
						continue;
					}
				}

				File destFile = new File(destFilePath);
				if (destFile.exists()) {
					continue;
				}
				if (!destFile.createNewFile()) {
					continue;
				}

				bos = new BufferedOutputStream(new FileOutputStream(destFile),
						bufLen);
				while ((count = zis.read(buf, 0, bufLen)) != -1) {
					bos.write(buf, 0, count);
				}
				bos.flush();
				bos.close();
				
			}
			zis.close();
		} catch (IOException e) {
			return false;
		}
		return true;
	}
	/**
	 * copy all the data in assets to filePath
	 * 
	 * @param context
	 * @return
	 */
	public static boolean copyAsset(Context context, File destFileFolder) {
		String apkPath = context.getPackageCodePath();
		ZipInputStream zis = null;
		ZipEntry zipent = null;
		BufferedOutputStream bos = null;
		byte[] buf = null;
		int bufLen = 2048;
		int count = -1;
		try {
			zis = new ZipInputStream(new BufferedInputStream(
					new FileInputStream(apkPath)));
			buf = new byte[bufLen];
			while ((zipent = zis.getNextEntry()) != null) {
				String entName = zipent.getName();
				
				if (!entName.startsWith(assetsFlag)) {
					continue;
				}				

				String destFilePath = destFileFolder.getAbsolutePath()
						+ File.separator + entName;
				String destDirPath = destFilePath.substring(0,
						destFilePath.lastIndexOf(File.separator));
				File destDir = new File(destDirPath);

				if (!destDir.exists()) {
					if (!destDir.mkdirs()) {
						continue;
					}
				}

				File destFile = new File(destFilePath);
				if (destFile.exists()) {
					continue;
				}
				if (!destFile.createNewFile()) {
					continue;
				}

				bos = new BufferedOutputStream(new FileOutputStream(destFile),
						bufLen);
				while ((count = zis.read(buf, 0, bufLen)) != -1) {
					bos.write(buf, 0, count);
				}
				bos.flush();
				bos.close();
				
				if (destFilePath.indexOf("zip") > 0) {
					LocationUtils.extract(destFile, destDir);
				}
			}
			zis.close();
		} catch (IOException e) {
			return false;
		}
		return true;
	}
}

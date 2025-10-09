// useInAppBrowser.js
import { useCallback } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Linking } from 'react-native';

export default function useInAppBrowser() {
  const openLink = useCallback(async (url) => {
    try {
      const result = await WebBrowser.openBrowserAsync(url, {
        // Android
        //toolbarColor: '#6200EE',
        //controlsColor: 'white',
        showTitle: true,
        enableDefaultShare: true,

        // iOS
        dismissButtonStyle: 'close',
        //preferredBarTintColor: '#6200EE',
        //preferredControlTintColor: 'white',
        presentationStyle: 'automatic',
      });

      console.log("WebBrowser result:", result);
    } catch (err) {
      console.error('WebBrowser error:', err);
      await Linking.openURL(url); // fallback
    }
  }, []);

  return openLink;
}
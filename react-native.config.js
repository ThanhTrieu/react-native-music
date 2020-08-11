// react-native.config.js
module.exports = {
  dependency: {
    'react-native-webview': {
      platforms: {
        android: null, // disable Android platform, other platforms will still autolink if provided
        ios: null,
      },
    },
  },
};
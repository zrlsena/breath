import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Landing from '../../views/LandingPage';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Landing />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5FB',
  },
});

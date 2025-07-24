import BreathingModeCard from '@/components/BreathingModeCard';
import SoundButton from '@/components/SoundButton';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const modes = [
  { id: 'anxious', title: 'relax', pattern: [4, 4, 4], color: '#C3B4F3' },
  { id: 'sleep', title: 'before sleep', pattern: [4, 7, 8], color: '#E4DFFD' },
  { id: 'focus', title: 'focus', pattern: [1, 1, 1], color: '#F9EBFF' },
  { id: 'sad', title: 'nirvana', pattern: [6, 2, 8], color: '#FFF2CC' },
];

const sounds = [
  {
    id: 'rain',
    src: require('../assets/sounds/rain.mp3'),
    image: require('../assets/images/rains.png'),
  },
  {
    id: 'waves',
    src: require('../assets/sounds/waves.mp3'),
    image: require('../assets/images/wave.png'),
  },
  {
    id: 'forest',
    src: require('../assets/sounds/forest.mp3'),
    image: require('../assets/images/forst.png'),
  },
];

export default function Landing() {
  const [activeMode, setActiveMode] = useState<string | null>(null);
  const [activeSound, setActiveSound] = useState<string | null>(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>choose your mood{`\n`}and breath!</Text>
      <Text style={styles.subtitle}>Let’s start with soothing sound</Text>

      {/* Sound icons üstte ve ortalanmış */}
      <View style={styles.soundRow}>
        {sounds.map((sound) => (
          <SoundButton
            key={sound.id}
            src={sound.src}
            image={sound.image}
            soundId={sound.id}
            activeSound={activeSound}
            setActiveSound={setActiveSound}
          />
        ))}
      </View>

      {/* Mood butonları */}
      <View style={styles.modeList}>
        {modes.map((mode) => (
          <View key={mode.id} style={styles.modeRow}>
            <BreathingModeCard
              mode={mode}
              isActive={activeMode === mode.id}
              onPress={() =>
                setActiveMode(activeMode === mode.id ? null : mode.id)
              }
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F5FB',
    padding: 24,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3F3F3F',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 24,
    textAlign: 'center',
  },
  soundRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 32,
  },
  modeList: {
    width: '100%',
    gap: 20,
  },
  modeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modeLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'lowercase',
  },
});

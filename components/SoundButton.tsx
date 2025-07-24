import { Audio } from 'expo-av';
import React, { useEffect, useRef } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  src: any;
  image: any; // 👈 Yeni ekledik
  soundId: string;
  activeSound: string | null;
  setActiveSound: (id: string | null) => void;
}

export default function SoundButton({
  src,
  image,
  soundId,
  activeSound,
  setActiveSound,
}: Props) {
  const sound = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    return () => {
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, []);

  const toggleSound = async () => {
    if (activeSound === soundId) {
      await sound.current?.stopAsync();
      await sound.current?.unloadAsync();
      sound.current = null;
      setActiveSound(null);
    } else {
      if (sound.current) {
        await sound.current.stopAsync();
        await sound.current.unloadAsync();
        sound.current = null;
      }

      const { sound: newSound } = await Audio.Sound.createAsync(src);
      await newSound.setIsLoopingAsync(true);
      await newSound.playAsync();

      sound.current = newSound;
      setActiveSound(soundId);
    }
  };

  return (
    <TouchableOpacity onPress={toggleSound} style={styles.wrapper}>
    <Image source={image} style={styles.image} resizeMode="contain" />
  </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 20,
  },
});



import { Audio } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


type Props = {
  mode: { id: string; title: string; pattern: number[]; color: string };
  isActive: boolean;
  onPress: () => void;
};

const labels = ['INHALE', 'HOLD', 'EXHALE'];

export default function BreathingModeCard({ mode, isActive, onPress }: Props) {
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(mode.pattern[0]);
  const progress = useRef(new Animated.Value(0)).current;
  const [isChimeOn, setIsChimeOn] = useState(true);

const playChime = async () => {
  if (!isChimeOn) return; // Ses kapalıysa hiç çalma

  try {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/chime.mp3')
    );
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status) => {
  if ('didJustFinish' in status && status.didJustFinish) {
    sound.unloadAsync();
  }
    });
  } catch (error) {
    console.warn('Chime play error:', error);
  }
};

  

  useEffect(() => {
    
    let interval: ReturnType<typeof setInterval>;
    

    const startAnimation = (duration: number) => {
      progress.setValue(0);
      Animated.timing(progress, {
        toValue: 1,
        duration: duration * 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    };

    if (isActive) {
      startAnimation(mode.pattern[step]);

      interval = setInterval(() => {
        setCount((prev) => {
          if (prev === 1) {
            playChime();
            const nextStep = (step + 1) % 3;
            
            setStep(nextStep);
            startAnimation(mode.pattern[nextStep]);
            return mode.pattern[nextStep];
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setStep(0);
      setCount(mode.pattern[0]);
      progress.stopAnimation();
    }

    return () => clearInterval(interval);
  }, [isActive, step]);

  // 🌀 Circular Progress
  const rotate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  


  return (
    <View style={styles.container}>
      <Text style={styles.label} >{mode.title}</Text>

      <TouchableOpacity
        style={[styles.circleWrapper, { backgroundColor: mode.color }]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {/* Gri arka halka */}
        <View style={styles.backgroundRing} />

        {/* Dönen halka */}
        <Animated.View
          style={[
            styles.foregroundRing,
            { transform: [{ rotate }] },
          ]}
        />

        {/* Ortadaki içerik */}
        {!isActive ? (
          <Image source={require('../assets/images/breath.png')} style={styles.iconImage} />
        ) : (
          <Text style={styles.count}>{count}</Text>
        )}
      </TouchableOpacity>

      <View style={styles.phaseBox}>
        {isActive && <Text style={styles.phase}>{labels[step]}</Text>}
      </View>
      <TouchableOpacity
  onPress={() => setIsChimeOn((prev) => !prev)}
  style={styles.chimeToggleButton}
>
  <Text style={{ color: isChimeOn ? '#B00000' : '#888' }}>
    {isChimeOn ? '🔔 ' : '🔕 '}
  </Text>
</TouchableOpacity>

    </View>
  );
}

const circleSize = 100;
const ringThickness = 6;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    width: '100%',
  },
  label: {
    width: 80,
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
    textTransform: 'capitalize',
    fontFamily: 'Avenir',
left:20,

  },
  circleWrapper: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  backgroundRing: {
    position: 'absolute',
    width: circleSize + ringThickness,
    height: circleSize + ringThickness,
    borderRadius: (circleSize + ringThickness) / 2,
    borderWidth: ringThickness,
    borderColor: '#E6E6E6',
  },
  foregroundRing: {
    position: 'absolute',
    width: circleSize + ringThickness,
    height: circleSize + ringThickness,
    borderRadius: (circleSize + ringThickness) / 2,
    borderWidth: ringThickness,
    borderColor: '#B00000',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  count: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3F3F3F',
    fontFamily: 'Helvetica Neue',
  },
  icon: {
    fontSize: 28,
    color: '#3F3F3F',
  },
  phaseBox: {
    width: 80,
    alignItems: 'flex-start',
  },
  phase: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#B00000',
    fontFamily: 'Helvetica Neue',
    textTransform: 'uppercase',
  },
  iconImage: {
  width: 32,
  height: 32,
  resizeMode: 'contain',
},
chimeToggleButton: {
  padding: 8,
  marginLeft: 12,
  backgroundColor: '#f0f0f0',
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
  height: 36,
  width: 36,
},


});

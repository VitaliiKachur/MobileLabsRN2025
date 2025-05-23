import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { GESTURE_POINTS } from '../utils/constants';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const GameCard = ({ 
  score, 
  onScoreChange, 
  onGesturePerformed 
}) => {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const cardScale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value * cardScale.value },
    ],
  }));

  const singleTap = Gesture.Tap()
    .numberOfTaps(1)
    .onEnd(() => {
      scale.value = withSpring(1.1, { duration: 100 }, () => {
        scale.value = withSpring(1);
      });
      
      runOnJS(onScoreChange)(GESTURE_POINTS.TAP);
      runOnJS(onGesturePerformed)('clicks');
    });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      scale.value = withSpring(1.2, { duration: 150 }, () => {
        scale.value = withSpring(1);
      });
      
      runOnJS(onScoreChange)(GESTURE_POINTS.DOUBLE_TAP);
      runOnJS(onGesturePerformed)('doubleClicks');
    });

  const longPress = Gesture.LongPress()
    .minDuration(800)
    .onEnd(() => {
      scale.value = withSpring(1.3, { duration: 200 }, () => {
        scale.value = withSpring(1);
      });
      
      runOnJS(onScoreChange)(GESTURE_POINTS.LONG_PRESS);
      runOnJS(onGesturePerformed)('longPress');
    });

   const pan = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      const velocityX = event.velocityX;
      const velocityY = event.velocityY;
      const absVelocityX = Math.abs(velocityX);
      const absVelocityY = Math.abs(velocityY);
      
      if (absVelocityX > 1000 && absVelocityX > absVelocityY * 2) {
        if (velocityX > 0) {
          const randomPoints = Math.floor(Math.random() * (GESTURE_POINTS.FLING_MAX - GESTURE_POINTS.FLING_MIN + 1)) + GESTURE_POINTS.FLING_MIN;
          runOnJS(onScoreChange)(randomPoints);
          runOnJS(onGesturePerformed)('swipeRight');
        } else {
          const randomPoints = Math.floor(Math.random() * (GESTURE_POINTS.FLING_MAX - GESTURE_POINTS.FLING_MIN + 1)) + GESTURE_POINTS.FLING_MIN;
          runOnJS(onScoreChange)(randomPoints);
          runOnJS(onGesturePerformed)('swipeLeft');
        }
      } else {
        runOnJS(onGesturePerformed)('drag');
      }
      
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const flingRight = Gesture.Fling()
    .direction(Gesture.DIRECTION_RIGHT)
    .onEnd(() => {
      const randomPoints = Math.floor(Math.random() * (GESTURE_POINTS.FLING_MAX - GESTURE_POINTS.FLING_MIN + 1)) + GESTURE_POINTS.FLING_MIN;
      runOnJS(onScoreChange)(randomPoints);
      runOnJS(onGesturePerformed)('swipeRight');
    });

  const flingLeft = Gesture.Fling()
    .direction(Gesture.DIRECTION_LEFT)
    .onEnd(() => {
      const randomPoints = Math.floor(Math.random() * (GESTURE_POINTS.FLING_MAX - GESTURE_POINTS.FLING_MIN + 1)) + GESTURE_POINTS.FLING_MIN;
      runOnJS(onScoreChange)(randomPoints);
      runOnJS(onGesturePerformed)('swipeLeft');
    });

  const pinch = Gesture.Pinch()
    .onUpdate((event) => {
      cardScale.value = event.scale;
    })
    .onEnd(() => {
      cardScale.value = withSpring(1);
      runOnJS(onScoreChange)(GESTURE_POINTS.PINCH_BONUS);
      runOnJS(onGesturePerformed)('pinch');
    });

  const composedGesture = Gesture.Simultaneous(
    Gesture.Exclusive(doubleTap, singleTap),
    longPress,
    Gesture.Exclusive(pan, flingRight, flingLeft), // Змінено тут
    pinch
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>Очки</Text>
        <Text style={styles.scoreValue}>{score}</Text>
      </View>

      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[styles.gameCard, animatedStyle]}>
          <Text style={styles.cardEmoji}>🎯</Text>
          <Text style={styles.cardText}>Торкніться мене!</Text>
          <Text style={styles.instructionText}>
            Одинарний клік • Подвійний клік{'\n'}
            Довге натискання • Перетягування{'\n'}
            Свайп • Масштабування
          </Text>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  scoreContainer: {
    position: 'absolute',
    top: 100,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 4,
  },
  gameCard: {
    width: 200,
    height: 200,
    backgroundColor: '#3b82f6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  cardEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 10,
    color: '#bfdbfe',
    textAlign: 'center',
    lineHeight: 14,
  },
});

export default GameCard;
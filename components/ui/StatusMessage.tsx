import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  interpolate,
} from 'react-native-reanimated';

interface StatusMessageProps {
  type: 'success' | 'error';
  title: string;
  message: string;
  icon: React.ReactNode;
  onAction?: () => void;
  actionText?: string;
  actionIcon?: React.ReactNode;
  onRetry?: () => void;
  retryText?: string;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({
  type,
  title,
  message,
  icon,
  onAction,
  actionText,
  actionIcon,
  onRetry,
  retryText,
}) => {
  const iconScale = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(0);
  const buttonPressScale = useSharedValue(1);

  React.useEffect(() => {
    // Animation séquentielle
    iconScale.value = withSpring(1, { damping: 12, stiffness: 100 });
    contentOpacity.value = withDelay(300, withSpring(1));
    buttonScale.value = withDelay(600, withSpring(1, { damping: 15, stiffness: 150 }));
  }, []);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: buttonScale.value * buttonPressScale.value },
    ],
    opacity: buttonScale.value,
  }));

  const handlePressIn = () => {
    buttonPressScale.value = withSpring(0.96, { damping: 20, stiffness: 400 });
  };

  const handlePressOut = () => {
    buttonPressScale.value = withSpring(1, { damping: 20, stiffness: 400 });
  };

  const isSuccess = type === 'success';
  const backgroundColor = isSuccess ? '#10b981' : '#ef4444';
  const accentColor = isSuccess ? '#059669' : '#dc2626';
  const buttonBackgroundColor = isSuccess ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.3)';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Décoration de fond */}
      <View style={[styles.backgroundDecor, { backgroundColor: accentColor }]} />
      
      <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
        <View style={styles.iconWrapper}>
          {icon}
        </View>
      </Animated.View>

      <Animated.View style={[styles.content, contentAnimatedStyle]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </Animated.View>

      {(onAction || onRetry) && (
        <Animated.View style={buttonAnimatedStyle}>
          <Pressable
            onPress={onAction || onRetry}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[
              styles.button,
              { backgroundColor: buttonBackgroundColor }
            ]}
          >
            {/* Gradient overlay pour un effet plus riche */}
            <View style={styles.buttonGradientOverlay} />
            
            <Text style={styles.buttonText}>
              {actionText || retryText}
            </Text>
            
            {actionIcon && (
              <View style={styles.buttonIcon}>
                {actionIcon}
              </View>
            )}
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.2,
    shadowRadius: 28,
    elevation: 16,
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    height: "100%",
    width: "100%"
  },
  backgroundDecor: {
    position: 'absolute',
    right: -50,
    width: 120,
    height: 120,
    borderRadius: 60,
    opacity: 0.1,
  },
  iconContainer: {
    marginBottom: 28,
  },
  iconWrapper: {
    padding: 20,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  content: {
    alignItems: 'center',
    marginBottom: 36,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 34,
    letterSpacing: 0.5,
  },
  message: {
    fontSize: 17,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 20,
    fontWeight: '400',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    minWidth: 160,
    position: 'relative',
    overflow: 'hidden',
    // Ombre plus prononcée pour le bouton
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  buttonGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '20%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
    marginRight: 8,
    letterSpacing: 0.5,
    fontFamily: "ArchivoBold",
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  buttonIcon: {
    marginLeft: 8,
  },
});
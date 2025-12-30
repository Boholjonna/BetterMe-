// GradientBackground.js

import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const GradientBackground = ({
  children,
  color1 = "#F3FFED",
  color2 = "#8DFB51",
}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[color1, color2]}
        style={[StyleSheet.absoluteFill, styles.gradient]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {children}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GradientBackground;

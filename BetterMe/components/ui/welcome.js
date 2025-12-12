import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, StyleSheet, Text } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function WelcomeBanner() {
  return (
    <LinearGradient
      colors={['#FFFFFF', '#E1FFD1']}
      style={styles.container}
    >
      <Text style={styles.welcome}>Welcome to</Text>
      <Text style={styles.brand}>BetterME</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.8932,
    height: height * 0.1538,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  welcome: {
    fontSize: 20,
    color: '#7EDF00',
    fontWeight: '500',
  },
  brand: {
    fontSize: 40,
    color: '#33DB00',
    fontWeight: 'bold',
  },
});

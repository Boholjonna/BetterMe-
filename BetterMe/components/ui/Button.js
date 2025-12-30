import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function CustomButton({ 
  color = '#EAFFDE', 
  text, 
  onPress, 
  textColor = '#000000' 
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: width * 0.7039,   // 70.39% of viewport width
    height: 48,              // Fixed height for better touch targets
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,            // Add shadow on Android
    shadowColor: '#000',     // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Arial',
    fontWeight: '600',
  },
});

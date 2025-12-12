import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function CustomButton({ color = '#EAFFDE', text, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: width * 0.7039,   // 70.39% of viewport width
    height: height * 0.04,   // 4% of viewport height
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  text: {
    fontSize: 15,
    fontFamily: 'Arial',
    color: '#000',           // default text color (can be customized if needed)
  },
});

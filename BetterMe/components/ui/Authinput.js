// components/ui/AuthInputs.js
import { Ionicons } from "@expo/vector-icons"; // 👈 eye icon
import { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function AuthInputs({ email, password, onEmailChange, onPasswordChange }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={onEmailChange}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={onPasswordChange}
          placeholder="Enter your password"
          secureTextEntry={!showPassword} // 👈 hide/show
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"} // 👈 toggle icon
            size={20}
            color="#555"
          />
        </TouchableOpacity>
      </View>

      {/* Forgot password link */}
      <TouchableOpacity>
        <Text style={styles.forgot}>forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    width: width * 0.7039, // Match button width
    alignSelf: "center",
    paddingVertical: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    backgroundColor: 'transparent',
    padding: 12,
    paddingLeft: 0,
    paddingRight: 40, // Make room for the eye icon
    fontSize: 14,
    marginBottom: 12,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#000',
    height: 48, // Match button height
    width: '100%',
    lineHeight: 24, // Ensure text is vertically centered
  },
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 0,
    bottom: 12, // Align with the bottom border
    padding: 8,
    zIndex: 10, // Ensure it's above the input
  },
  forgot: {
    fontSize: 13,
    color: "#007AFF",
    textAlign: "right",
    marginTop: 4,
  },
});

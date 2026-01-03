import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { BackHandler, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { Easing, FadeIn, FadeOut } from 'react-native-reanimated';
import GradientBackground from '../../components/ui/background';
import CustomButton from '../../components/ui/Button';
import WelcomeBanner from '../../components/ui/welcome';

const { width } = Dimensions.get('window');

export default function Signup() {
  const router = useRouter();

  // Handle back button press
  useEffect(() => {
    const backAction = () => {
      router.back();
      return true; // Prevent default behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [router]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    // TODO: Implement signup logic here
    console.log("Signup attempt with:", { username, email, password });
  };

  return (
    <View style={styles.container}>
      <GradientBackground>
        <Animated.View 
          style={styles.content}
          entering={FadeIn.duration(300).easing(Easing.out(Easing.ease))}
          exiting={FadeOut.duration(200).easing(Easing.in(Easing.ease))}
        >
          <WelcomeBanner />
          <Text style={styles.title}>Sign Up</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#555"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.termsText}>
              By signing up you agree to the <Text style={styles.termsLink}>terms and policies</Text> of this app
            </Text>
          </View>

          <View style={styles.buttonsContainer}>
            <CustomButton 
              color="#EAFFDE"
              text="Sign Up"
              textColor="#000"
              onPress={handleSignup}
              style={styles.signupButton}
            />
            
            
            
          </View>
        </Animated.View>
      </GradientBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    opacity: 1,
    transform: [{ translateY: 0 }],
    transition: 'all 0.3s ease-in-out',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    marginTop: 20,
  },
  inputContainer: {
    width: width * 0.7039,
    alignSelf: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  input: {
    backgroundColor: 'transparent',
    padding: 12,
    paddingLeft: 0,
    paddingRight: 40,
    fontSize: 14,
    marginBottom: 12,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#000',
    height: 48,
    width: '100%',
    lineHeight: 24,
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    bottom: 12,
    padding: 8,
    zIndex: 10,
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  termsLink: {
    color: '#125300',
    textDecorationLine: 'underline',
  },
  buttonsContainer: {
    width: '70.39%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  signupButton: {
    width: '100%',
    borderRadius: 20,
  },
  orText: {
    marginVertical: 15,
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    width: '100%',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '70%',
    marginTop: 15,
    marginBottom: 10,
    alignSelf: 'center',
    gap: 40,
  },
  socialButtonContainer: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  }
});

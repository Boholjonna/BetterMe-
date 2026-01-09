import { useRouter } from 'expo-router';
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import AuthInput from "../../components/ui/Authinput";
import GradientBackground from "../../components/ui/background";
import CustomButton from "../../components/ui/Button";
import WelcomeBanner from "../../components/ui/welcome";
import { supabase } from '../../lib/supabase';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert('Error', 'Please fill in all fields');
    return;
  }
  
  setLoading(true);
  try {
    console.log('Attempting to sign in...');
    // Sign in with email and password
    const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      console.error('Sign in error:', signInError);
      throw signInError;
    }

    // Get user data from auth
    const { user } = authData;
    
    if (!user) {
      throw new Error('No user found after authentication');
    }

    console.log('User authenticated, ID:', user.id);
    
    // Verify the user is authenticated
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      console.error('Session error:', sessionError);
      throw new Error('Authentication failed: No active session');
    }

    console.log('Session verified, checking user data...');
    
    // First, try to get the user data
    const { data: userData, error: userError } = await supabase
      .from('UserData')
      .select('*')
      .eq('uid', user.id)
      .maybeSingle();  // Use maybeSingle instead of single to handle no rows

    console.log('User data query result:', { userData, userError });

    if (userError || !userData) {
      console.log('No existing user data found, creating new profile...');
      
      const newUserProfile = { 
        uid: user.id, 
        email: user.email,
        username: user.email.split('@')[0],
       
      };
      
      console.log('Attempting to insert new user profile:', newUserProfile);
      
      const { data: insertedUser, error: insertError } = await supabase
        .from('UserData')
        .insert([newUserProfile])
        .select()
        .single();

      if (insertError) {
        console.error('Detailed insert error:', {
          message: insertError.message,
          code: insertError.code,
          details: insertError.details,
          hint: insertError.hint
        });
        throw new Error('Failed to create user profile: ' + (insertError.message || 'Unknown error'));
      }

      console.log('New user profile created:', insertedUser);
      
      Alert.alert('Success', 'Account created! Please complete your profile.', [
        {
          text: 'OK',
          onPress: () => router.replace('/screens/Onboarding')
        }
      ]);
    } else {
      console.log('Existing user data found:', userData);
      const nextScreen = !userData.gender ? '/screens/Onboarding' : '/screens/Goalist';
      const message = !userData.gender 
        ? 'Welcome back! Please complete your profile.' 
        : 'Login successful!';
      
      Alert.alert('Success', message, [
        {
          text: 'OK',
          onPress: () => router.replace(nextScreen)
        }
      ]);
    }
  } catch (error) {
    console.error('Login process error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      originalError: error
    });
    Alert.alert('Error', error.message || 'An error occurred during login. Please try again.');
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.container}>
      <GradientBackground>
        <View style={styles.content}>
          <WelcomeBanner />
          <Text style={styles.title}>Log in</Text>
          
          <AuthInput 
            email={email}
            password={password}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
          />

          <View style={styles.buttonsContainer}>
            <CustomButton 
              color="#EAFFDE"
              text="Login"
              textColor="#000"
              onPress={handleLogin}
              style={styles.loginButton}
            />
            <View style={styles.buttonSpacing} />
            <CustomButton 
              color="#EAFFDE"
              text="Sign Up"
              textColor="#000"
              onPress={() => router.push('/screens/Signup')}
              style={styles.signupButton}
            />
          </View>
        </View>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    marginTop: 20,
  },
  buttonsContainer: {
    width: '70.39%',
    alignSelf: 'center',
    marginTop: 30,
    alignItems: 'center',
  },
  loginButton: {
    width: '100%',
    borderRadius: 20,
  },
  buttonSpacing: {
    height: 15, // Add space between buttons
  },
  signupButton: {
    width: '100%',
    borderRadius: 20,
  },
});

import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AuthInput from "../../components/ui/Authinput";
import GradientBackground from "../../components/ui/background";
import CustomButton from "../../components/ui/Button";
import WelcomeBanner from "../../components/ui/welcome";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: Implement login logic here
    console.log("Login attempt with:", { email, password });
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
              onPress={() => {}}
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

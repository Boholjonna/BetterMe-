import { StyleSheet, View } from "react-native";
import GradientBackground from "../../components/ui/background";
import WelcomeBanner from "../../components/ui/welcome";

export default function Login() {
  return (
    <View style={styles.container}>
      <GradientBackground>
        <WelcomeBanner />
        <h1>Login</h1>
       
      </GradientBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    flexDirection: "column",      // stack children vertically
    justifyContent: "center",     // center vertically
    alignItems: "center",         // center horizontally
  },
});

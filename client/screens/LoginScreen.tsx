import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const LoginScreen = () => {
  return (
    <LinearGradient colors={["#020024", "#090979"]} style={styles.container}>
      <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Connexion avec Spotify</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Montserrat",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: "#00FF88",
    paddingVertical: 30,
    paddingHorizontal: 50,
    borderRadius: 50,
  },
  loginButtonText: {
    color: "#00000",
    fontFamily: "MontserratBold",
    fontWeight: "700",
    fontSize: 20,
  },
});

export default LoginScreen;

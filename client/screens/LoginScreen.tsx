import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

WebBrowser.maybeCompleteAuthSession();

const CLIENT_ID = "ec6a3407d2e3424d81fea91a79d217a0";
const REDIRECT_URI = AuthSession.makeRedirectUri({ scheme: "myapp" });

const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const [token, setToken] = React.useState<string | null>(null);
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ["user-read-private", "user-read-email"],
      redirectUri: REDIRECT_URI,
      responseType: "code",
      codeChallengeMethod: AuthSession.CodeChallengeMethod.S256,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      fetch("http://192.168.0.44:3000/auth/exchange", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, codeVerifier: request?.codeVerifier }),
      })
        .then((res) => res.json())
        .then((data) => {
          SecureStore.setItemAsync("token", data.token);
          setToken(data.token);
          navigation.navigate("Home" as never);
        });
    }
  }, [response]);

  return (
    <LinearGradient colors={["#020024", "#090979"]} style={styles.container}>
      <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
      <TouchableOpacity
        style={styles.loginButton}
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      >
        <Text style={styles.loginButtonText}>Connexion avec Spotify</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: "#000000",
    fontWeight: "700",
    fontSize: 20,
  },
});

export default LoginScreen;

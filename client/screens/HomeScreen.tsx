import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/Header";

import { NavigationProp } from "@react-navigation/native";

const HomeScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <LinearGradient colors={["#020024", "#090979"]} style={styles.container}>
      <Header onLoginPress={navigateToLogin} />

      <View style={styles.centerContent}>
        <Text style={styles.title}>Vous n’avez pas encore de SyncList 😢</Text>

        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>
            Créer une SyncList avec un ami
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContent}>
        <View style={styles.recommendation}>
          <Text style={styles.recommendationTitle}>Recommandation du jour</Text>
          <Text style={styles.recommendationSubtitle}>
            Basée sur ce que vous partagez avec vos amis
          </Text>
          <View style={styles.songContainer}>
            <View style={styles.songDetails}>
              <View style={styles.albumCover} />
              <View>
                <Text style={styles.songTitle}>Feur</Text>
                <Text style={styles.songArtist}>Apinyaye</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.spotifyButton}>
              <Text style={styles.spotifyButtonText}>Écouter sur Spotify</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    fontFamily: "Montserrat",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContent: {
    paddingBottom: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: "#00FF88",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
    marginBottom: 40,
  },
  createButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
  recommendation: {
    borderRadius: 12,
    padding: 20,
  },
  recommendationTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  recommendationSubtitle: {
    color: "#B0B0B0",
    fontSize: 14,
    marginBottom: 20,
  },
  songContainer: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  songDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  albumCover: {
    width: 40,
    height: 40,
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    marginRight: 15,
  },
  songTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  songArtist: {
    color: "#B0B0B0",
    fontSize: 10,
  },
  spotifyButton: {
    backgroundColor: "#00FF88",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  spotifyButtonText: {
    color: "#00000",
    fontSize: 10,
    fontWeight: "600",
  },
});

export default HomeScreen;

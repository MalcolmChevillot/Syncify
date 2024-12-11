import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/Header";
import { NavigationProp } from "@react-navigation/native";

const syncListsMock = [
  { id: 1, name: "Workout Playlist", friend: "John Doe" },
  { id: 2, name: "Chill Vibes", friend: "Jane Smith" },
  { id: 3, name: "Chill Vibes", friend: "Jane Smith" },
  { id: 4, name: "Chill Vibes", friend: "Jane Smith" },
  { id: 5, name: "Chill Vibes", friend: "Jane Smith" },
  { id: 6, name: "Chill Vibes", friend: "Jane Smith" },
];

const HomeScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  const handleAddSyncList = () => {
    console.log("Ajout d'une nouvelle SyncList");
  };

  const hasSyncLists = syncListsMock.length > 0;

  return (
    <LinearGradient colors={["#020024", "#090979"]} style={styles.container}>
      <Header onLoginPress={navigateToLogin} />

      <View style={styles.syncListHeader}>
        <Text style={styles.syncListTitle}>Vos SyncLists</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddSyncList}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {hasSyncLists ? (
        <FlatList
          data={syncListsMock}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.syncListContainer}>
              <TouchableOpacity style={styles.syncListImage}></TouchableOpacity>
              <View style={styles.syncListInfo}>
                <Text style={styles.syncListName}>{item.name}</Text>
                <Text style={styles.syncListFriend}>Avec : {item.friend}</Text>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.centerContent}>
          <Text style={styles.title}>
            Vous n’avez pas encore de SyncList 😢
          </Text>

          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>
              Créer une SyncList avec un ami
            </Text>
          </TouchableOpacity>
        </View>
      )}

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
  syncListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  syncListTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: "#00FF88",
    borderRadius: 20,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
  syncListContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  syncListInfo: {
    flexDirection: "column",
    justifyContent: "center",
  },
  syncListImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
    backgroundColor: "#ffff",
    justifyContent: "center",
    alignItems: "center",
  },
  syncListName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    fontFamily: "Montserrat",
  },
  syncListFriend: {
    color: "#B0B0B0",
    fontSize: 14,
  },
  recommendation: {
    borderRadius: 12,
    paddingBottom: 20,
    paddingTop: 10,
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
    color: "#000000",
    fontSize: 10,
    fontWeight: "600",
  },
});

export default HomeScreen;

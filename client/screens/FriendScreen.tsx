import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";

interface SyncList {
  id: string;
  title: string;
}

interface Friend {
  id: number;
  displayName: string;
  profilePic: string;
  points: number;
}

interface RouteParams {
  friend: Friend;
}

const fakeSyncLists: SyncList[] = [
  { id: "1", title: "Sync List 1" },
  { id: "2", title: "Sync List 2" },
  { id: "3", title: "Sync List 3" },
];

const FriendDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { friend } = route.params as RouteParams;

  const handleDeleteFriend = async () => {
    Alert.alert("Supprimer l'ami", "Voulez-vous vraiment supprimer cet ami ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: async () => {
          try {
            const response = await fetch(
              `http://192.168.0.44:3000/friend/delete/${friend.id}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.ok) {
              navigation.goBack();
            } else {
              Alert.alert("Erreur", "Impossible de supprimer l'ami");
            }
          } catch (error) {
            console.error("Error deleting friend:", error);
            Alert.alert("Erreur", "Une erreur est survenue");
          }
        },
      },
    ]);
  };

  const renderSyncListItem = ({ item }: { item: SyncList }) => (
    <View style={styles.syncListItem}>
      <Text style={styles.syncListTitle}>{item.title}</Text>
    </View>
  );

  return (
    <LinearGradient colors={["#020024", "#090979"]} style={styles.container}>
      <View style={styles.friendInfo}>
        <Image source={{ uri: friend.profilePic }} style={styles.profilePic} />
        <Text style={styles.friendName}>{friend.displayName}</Text>
        <Text style={styles.friendPoints}>Points : {friend.points}</Text>
      </View>

      <View style={styles.syncListsContainer}>
        <Text style={styles.syncListsTitle}>Sync Lists</Text>
        <FlatList
          data={fakeSyncLists}
          keyExtractor={(item) => item.id}
          renderItem={renderSyncListItem}
          style={styles.syncListsList}
        />
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteFriend}
      >
        <Text style={styles.deleteButtonText}>Supprimer l'ami</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  friendInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  friendName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  friendPoints: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 20,
  },
  syncListsContainer: {
    flex: 1,
  },
  syncListsTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  syncListsList: {
    maxHeight: 200,
  },
  syncListItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 5,
    marginBottom: 5,
  },
  syncListTitle: {
    color: "#fff",
  },
  deleteButton: {
    backgroundColor: "#FF5555",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default FriendDetailsScreen;

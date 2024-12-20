import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import * as Clipboard from "expo-clipboard";
import { Snackbar } from "react-native-paper";

const friendsData = [
  { id: "1", name: "Gandhi", points: 130 },
  { id: "2", name: "John Doe", points: 70 },
];

const FriendsScreen = () => {
  const navigation = useNavigation();
  const [spotifyId, setSpotifyId] = useState<string | null>(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (!token) return;

      try {
        const response = await fetch("http://192.168.0.44:3000/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          console.error("Failed to fetch user data");
          return;
        }
        const data = await response.json();
        if (data.user && data.user.spotifyId) {
          setSpotifyId(data.user.spotifyId);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleCopyId = async () => {
    if (spotifyId) {
      await Clipboard.setStringAsync(spotifyId);
      setSnackbarVisible(true);
    }
  };

  const onDismissSnackBar = () => {
    setSnackbarVisible(false);
  };

  const renderFriendItem = ({
    item,
  }: {
    item: { id: string; name: string; points: number };
  }) => (
    <View style={styles.friendCard}>
      <View style={styles.friendAvatar} />
      <Text style={styles.friendPoints}>{item.points} points</Text>
      <Text style={styles.friendName}>{item.name}</Text>
    </View>
  );

  return (
    <LinearGradient colors={["#020024", "#090979"]} style={styles.container}>
      {spotifyId && (
        <View style={styles.spotifyIdContainer}>
          <Text style={styles.spotifyIdText}>Mon Spotify ID: {spotifyId}</Text>
          <TouchableOpacity onPress={handleCopyId}>
            <Image
              source={require("@/assets/images/copy.png")}
              style={styles.copyIcon}
            />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.header}>
        <View style={styles.backTitle}>
          <TouchableOpacity onPress={handleBackPress}>
            <Image
              source={require("@/assets/images/back-icon.png")}
              style={styles.backImage}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Mes amis</Text>
        </View>
        <TouchableOpacity>
          <Image
            source={require("@/assets/images/add-friend-icon.png")}
            style={styles.iconImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.friendsContainer}>
        <FlatList
          data={friendsData}
          keyExtractor={(item) => item.id}
          horizontal
          contentContainerStyle={styles.friendsList}
          renderItem={renderFriendItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={onDismissSnackBar}
        duration={2000}
        action={{
          label: "OK",
          onPress: () => {
            // L’utilisateur ferme manuellement le snackbar, optionnel
          },
        }}
      >
        ID copié dans le presse-papiers !
      </Snackbar>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  spotifyIdContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  spotifyIdText: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backTitle: {
    flex: 1,
    flexDirection: "row",
  },
  backImage: {
    width: 30,
    height: 30,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
    paddingLeft: 10,
  },
  iconImage: {
    width: 25,
    height: 30,
    tintColor: "#FFFFFF",
  },
  copyIcon: {
    width: 25,
    height: 20,
    tintColor: "#FFFFFF",
    marginLeft: 5,
    marginBottom: 10,
  },
  friendsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  friendsList: {
    paddingVertical: 20,
  },
  friendCard: {
    width: 100,
    height: 150,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 8,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  friendAvatar: {
    width: 50,
    height: 50,
    backgroundColor: "#D9D9D9",
    borderRadius: 25,
    marginBottom: 10,
  },
  friendPoints: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    textAlign: "center",
  },
  friendName: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
  },
});

export default FriendsScreen;

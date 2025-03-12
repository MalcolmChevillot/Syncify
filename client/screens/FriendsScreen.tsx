import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import { Snackbar } from "react-native-paper";
import { useAuth } from "@/contexts/AuthContext";

interface FriendItemProps {
  item: {
    id: string;
    displayName: string;
    points: number;
    profilePic: string;
  };
}

const FriendsScreen = () => {
  const navigation = useNavigation();
  const { user, token } = useAuth();
  const [friends, setFriends] = useState<
    Array<{
      id: string;
      displayName: string;
      points: number;
      profilePic: string;
    }>
  >([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    Array<{ id: string; name: string; profilePic: string }>
  >([]);

  useEffect(() => {
    const fetchFriends = async () => {
      if (!token) return;

      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_LOCAL_IP}:3000/friend`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          console.error("Failed to fetch friends");
          return;
        }
        const data = await response.json();
        setFriends(data.friends);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [friends]);

  const addFriend = async (id: string) => {
    if (!token || !user) return;

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_LOCAL_IP}:3000/friend/add/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response", response);
      if (!response.ok) {
        console.error("Failed to add friend");
        return;
      }
      const data = await response.json();
      console.log("Friend added:", data);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const handleBackPress = () => {
    navigation.navigate("Home" as never);
  };

  const handleCopyId = async () => {
    if (user?.spotifyId) {
      await Clipboard.setStringAsync(user.spotifyId);
      setSnackbarVisible(true);
    }
  };

  const onDismissSnackBar = () => {
    setSnackbarVisible(false);
  };

  const handlePress = (item: {
    id: string;
    displayName: string;
    points: number;
    profilePic: string;
  }) => {
    navigation.navigate("FriendDetails" as never, { friend: item } as never);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_LOCAL_IP}:3000/user/${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      console.error("Failed to fetch search results");
      return;
    }
    const data = await response.json();
    setSearchResults([
      {
        id: data.id,
        name: data.displayName,
        profilePic: data.profilePic,
      },
    ]);
  };

  const renderSearchItem = ({
    item,
  }: {
    item: { id: string; name: string; profilePic: string };
  }) => {
    return (
      <View style={styles.searchResultItem}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: item.profilePic }}
            style={styles.searchResultAvatar}
          />
          <Text style={styles.searchResultText}>{item.name}</Text>
        </View>
        {friends.find((friend) => friend.id === item.id) ? (
          <Text style={styles.searchResultText}>Déjà ami</Text>
        ) : (
          <TouchableOpacity onPress={() => addFriend(item.id)}>
            <Image
              source={require("@/assets/images/plus-friend.png")}
              style={styles.addFriendImage}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <LinearGradient colors={["#020024", "#090979"]} style={styles.container}>
      {user?.spotifyId && (
        <View style={styles.spotifyIdContainer}>
          <Text style={styles.spotifyIdText}>
            Mon Spotify ID: {user.spotifyId}
          </Text>
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

        <TouchableOpacity onPress={handleOpenModal}>
          <Image
            source={require("@/assets/images/add-friend-icon.png")}
            style={styles.iconImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.friendsContainer}>
        <FlatList
          data={friends}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.friendCard}
              onPress={() =>
                handlePress({
                  id: item.id,
                  displayName: item.displayName,
                  points: item.points,
                  profilePic: item.profilePic,
                })
              }
            >
              <Image
                source={{ uri: item.profilePic }}
                style={styles.friendAvatar}
              />
              <View style={styles.friendInfo}>
                <Text style={styles.friendName}>{item.displayName}</Text>
                <Text style={styles.friendPoints}>{item.points} points</Text>
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.friendsList}
        />
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={onDismissSnackBar}
        duration={2000}
        action={{
          label: "OK",
          onPress: () => {},
        }}
      >
        ID copié dans le presse-papiers !
      </Snackbar>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rechercher un ami</Text>

            <TextInput
              style={styles.searchInput}
              placeholder="Entrez un nom ou un ID..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={handleSearch}
            />

            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id}
              renderItem={renderSearchItem}
              style={styles.searchResultsList}
              ListEmptyComponent={() =>
                searchQuery.length > 0 && searchResults.length === 0 ? (
                  <Text style={styles.noResults}>Aucun résultat...</Text>
                ) : null
              }
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
  copyIcon: {
    width: 25,
    height: 20,
    tintColor: "#FFFFFF",
    marginLeft: 5,
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
  friendsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  friendsList: {
    paddingVertical: 20,
  },
  friendCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "transparent",
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  friendInfo: {
    flex: 1,
    marginLeft: 10,
  },
  friendPoints: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
  },
  friendName: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "#1e1e1e",
    marginHorizontal: 20,
    borderRadius: 8,
    padding: 20,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "600",
  },
  searchInput: {
    backgroundColor: "#2f2f2f",
    color: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  searchResultsList: {
    maxHeight: 200,
  },
  searchResultItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomColor: "#444",
    borderBottomWidth: 1,
  },
  searchResultText: {
    color: "#fff",
  },
  searchResultAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  addFriendImage: {
    width: 20,
    height: 20,
  },
  addFriendButton: {
    backgroundColor: "#00FF88",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 30,
    height: 30,
  },
  noResults: {
    color: "#888",
    textAlign: "center",
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: "#00FF88",
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 15,
  },
  closeButtonText: {
    color: "#000",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default FriendsScreen;

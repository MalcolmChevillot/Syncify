import React from "react";
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

const friendsData = [
  { id: "1", name: "Gandhi", points: 130 },
  { id: "2", name: "John Doe", points: 70 },
];

const FriendsScreen = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
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
  leftIcon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  circleIcon: {
    width: 20,
    height: 20,
    backgroundColor: "#000000",
    borderRadius: 10,
  },
  backImage: {
    width: 30,
    height: 30,
  },
  logo: {
    width: 80,
    height: 40,
  },
  rightIcon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: 25,
    height: 30,
    tintColor: "#FFFFFF",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
    paddingLeft: 10,
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

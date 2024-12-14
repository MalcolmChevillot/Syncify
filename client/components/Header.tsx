import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();

  const onLoginPress = () => {
    navigation.navigate("Login" as never);
  };

  const onFriendsPress = () => {
    navigation.navigate("Friends" as never);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={onLoginPress}
        style={styles.circle}
      ></TouchableOpacity>

      <Image source={require("@/assets/images/logo.png")} style={styles.logo} />

      <TouchableOpacity onPress={onFriendsPress}>
        <Image
          source={require("@/assets/images/friends-icon.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#020024",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default Header;

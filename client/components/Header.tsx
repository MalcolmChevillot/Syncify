import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

const Header = () => {
  const navigation = useNavigation();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const onFriendsPress = () => {
    navigation.navigate("Friends" as never);
  };

  const onLogoutPress = async () => {
    await SecureStore.deleteItemAsync("token");
    navigation.navigate("Login" as never);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  useEffect(() => {
    const getMe = async () => {
      const token = await SecureStore.getItemAsync("token");
      const response = await fetch("http://192.168.0.44:3000/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setProfilePic(data.user.profilePic);
      console.log(data.user.profilePic);
    };

    getMe();
  }, []);

  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <TouchableOpacity
          onPress={toggleDropdown}
          style={styles.logoutContainer}
        >
          {profilePic && (
            <Image source={{ uri: profilePic }} style={styles.circle}></Image>
          )}
          <Image
            source={require("@/assets/images/arrow-down.png")}
            style={styles.arrow_down}
          />
        </TouchableOpacity>

        {isDropdownVisible && (
          <View style={styles.dropdown}>
            <TouchableOpacity onPress={onLogoutPress}>
              <Image
                source={require("@/assets/images/logout.png")}
                style={styles.arrow_down}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

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
    position: "relative",
  },
  leftSection: {
    position: "relative",
  },
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  arrow_down: {
    width: 15,
    height: 15,
    marginLeft: 5,
  },
  logo: {
    width: 50,
    height: 50,
  },
  icon: {
    width: 40,
    height: 40,
  },
  dropdown: {
    position: "absolute",
    top: 50,
    borderRadius: 5,
    padding: 10,
    zIndex: 999,
  },
  dropdownItem: {
    color: "#fff",
    fontSize: 10,
    paddingVertical: 5,
  },
});

export default Header;

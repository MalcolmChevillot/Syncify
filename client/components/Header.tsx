import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";

interface HeaderProps {
  onLoginPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={onLoginPress}
        style={styles.circle}
      ></TouchableOpacity>

      <Image source={require("@/assets/images/logo.png")} style={styles.logo} />

      <TouchableOpacity>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 30,
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

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import TrackItem from "@/components/TrackItem";

const tracksMock = [
  {
    id: 1,
    title: "Feur",
    artist: "Apinyaye",
    addedBy: "Gandhi",
    status: "Pas encore écouté",
  },
  {
    id: 2,
    title: "Feur",
    artist: "Apinyaye",
    addedBy: "Gandhi",
    status: "Déjà écouté",
  },
  // ...
];

const SyncListScreen = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }: { item: (typeof tracksMock)[0] }) => {
    return <TrackItem track={item} />;
  };

  return (
    <LinearGradient colors={["#020024", "#090979"]} style={styles.container}>
      <TouchableOpacity style={styles.addQueueButton}>
        <Text style={styles.addQueueText}>Ajouter les sons à la queue</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Image
            source={require("@/assets/images/back-icon.png")}
            style={styles.backImage}
          />
        </TouchableOpacity>
        <Text style={styles.title}>SyncList with Friend</Text>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher un son à ajouter à la liste..."
        placeholderTextColor="#B0B0B0"
      />

      <FlatList
        data={tracksMock}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    paddingLeft: 10,
  },
  addQueueButton: {
    backgroundColor: "#00FF88",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "50%",
    position: "absolute",
    top: 20,
    right: 20,
  },
  addQueueText: {
    color: "#000000",
    fontSize: 10,
    fontWeight: "600",
  },
  backImage: {
    width: 30,
    height: 30,
  },
  searchBar: {
    backgroundColor: "#090979",
    color: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
});

export default SyncListScreen;

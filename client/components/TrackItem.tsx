// Composant séparé
import React, { useEffect, useRef } from "react";
import { Animated, Text, View, StyleSheet } from "react-native";

interface Track {
  title: string;
  addedBy: string;
  status: string;
}

const TrackItem: React.FC<{ track: Track }> = ({ track }) => {
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (track.status === "Pas encore écouté") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shakeAnim, {
            toValue: 2,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: -2,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(shakeAnim, {
            toValue: 0,
            duration: 50,
            useNativeDriver: true,
          }),
          // Delay de 2 secondes avant de recommencer
          Animated.delay(2000),
        ])
      ).start();
    }
  }, [track.status]);

  return (
    <Animated.View
      style={[
        styles.trackContainer,
        track.status === "Pas encore écouté" && {
          transform: [{ translateX: shakeAnim }],
        },
      ]}
    >
      <View style={styles.trackInfo}>
        <View style={styles.albumCover} />
        <View>
          <Text style={styles.trackTitle}>{track.title}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.trackAddedBy}>Ajouté par {track.addedBy}</Text>
        <Text style={styles.trackStatus}>{track.status}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  trackContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  trackInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  albumCover: {
    width: 40,
    height: 40,
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    marginRight: 10,
  },
  trackTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  trackArtist: {
    color: "#B0B0B0",
    fontSize: 12,
  },
  trackAddedBy: {
    color: "#B0B0B0",
    fontSize: 12,
  },
  trackStatus: {
    color: "#FFFFFF",
    fontSize: 12,
  },
});

export default TrackItem;

import React, { View, Text, StyleSheet, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AchievementScreen = () => {
  const [unlockedAchievements, setUnlockedAchievements] = useState<any[]>([]);

  const loadAchievements = async () => {
    const json = await AsyncStorage.getItem("unlockedAchievements");
    const unlocked = json ? JSON.parse(json) : [];
    console.log("🎉 Reloaded achievements:", unlocked);
    setUnlockedAchievements(unlocked);
  };

  useFocusEffect(
    useCallback(() => {
      loadAchievements();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Achievements 🏆</Text>
      {unlockedAchievements.length === 0 ? (
        <Text style={{ color: "#6b7280", marginBottom: 20 }}>
          No achievements unlocked yet. Complete goals to unlock achievements!
        </Text>
      ) : (
        <FlatList
          data={unlockedAchievements}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <View style={styles.achievementCard}>
              <Text style={styles.achievementTitle}>{item.title}</Text>
              <Text style={styles.achievementDesc}>{item.description}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default AchievementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1e293b",
  },
  achievementCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  achievementTitle: { fontSize: 16, fontWeight: "700", color: "#374151" },
  achievementDesc: { fontSize: 14, color: "#6b7280" },
});

import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { achievements } from "../data/achievements";

const AchievementScreen = () => {
  const [unlockedAchievements, setUnlockedAchievements] = useState<any[]>([]);

  const loadAchievements = async () => {
    const json = await AsyncStorage.getItem("unlockedAchievements");
    const unlocked = json ? JSON.parse(json) : [];
    setUnlockedAchievements(unlocked);
  };

  useFocusEffect(
    useCallback(() => {
      loadAchievements();
    }, [])
  );

  // useEffect(() => {
  //   const printStorage = async () => {
  //     await AsyncStorage.clear();
  //     const keys = await AsyncStorage.getAllKeys();
  //     const stores = await AsyncStorage.multiGet(keys);
  //     console.log("AsyncStorage contents:");
  //     stores.forEach(([key, value]) => {
  //       console.log(`  ${key}: ${value}`);
  //     });
  //   };
  //   printStorage();
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Achievements 🏆</Text>
      {unlockedAchievements.length === 0 ? (
        <Text style={styles.emptyText}>
          No achievements unlocked yet. {"\n"} Complete goals to unlock
          achievements!
        </Text>
      ) : (
        <FlatList
          data={unlockedAchievements}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <View style={styles.achievementCard}>
              <Text style={styles.achievementIcon}>{item.icon}</Text>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>{item.title}</Text>
                <Text style={styles.achievementDesc}>{item.description}</Text>
              </View>
            </View>
          )}
          showsVerticalScrollIndicator={false}
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
  emptyText: {
    color: "#6b7280",
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
  },
  achievementCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: 16,
    textAlign: "center",
    minWidth: 40,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
});

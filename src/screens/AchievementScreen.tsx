import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { achievements } from "../data/achievements";

const AchievementScreen = () => {
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(
    []
  );
  const [filter, setFilter] = useState<"all" | "unlocked" | "locked">("all");

  const loadAchievements = async () => {
    const json = await AsyncStorage.getItem("unlockedAchievements");
    const unlocked = json ? JSON.parse(json) : [];
    setUnlockedAchievements(unlocked.map((a: any) => a.title));
  };

  useFocusEffect(
    useCallback(() => {
      loadAchievements();
    }, [])
  );

  const filteredData =
    filter === "unlocked"
      ? achievements.filter((a) => unlockedAchievements.includes(a.title))
      : filter === "locked"
      ? achievements.filter((a) => !unlockedAchievements.includes(a.title))
      : achievements;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Achievements 🏆</Text>

      <View style={styles.filterRow}>
        {["all", "unlocked", "locked"].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.filterOption,
              filter === option && styles.filterOptionActive,
            ]}
            onPress={() => setFilter(option as any)}
          >
            <Text
              style={[
                styles.filterText,
                filter === option && styles.filterTextActive,
              ]}
            >
              {option === "all"
                ? "All"
                : option === "unlocked"
                ? "Unlocked"
                : "Locked"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => {
          const isUnlocked = unlockedAchievements.includes(item.title);
          return (
            <View
              style={[styles.achievementCard, !isUnlocked && styles.lockedCard]}
            >
              <Text style={styles.achievementIcon}>{item.icon}</Text>
              <View style={styles.achievementContent}>
                <Text
                  style={[
                    styles.achievementTitle,
                    !isUnlocked && styles.lockedText,
                  ]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.achievementDesc,
                    !isUnlocked && styles.lockedText,
                  ]}
                >
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
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
  filterRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  filterOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#e5e7eb",
    marginHorizontal: 6,
  },
  filterOptionActive: {
    backgroundColor: "#3b82f6",
  },
  filterText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
  },
  filterTextActive: {
    color: "#fff",
    fontWeight: "700",
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
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  lockedCard: {
    backgroundColor: "#f1f5f9",
    borderColor: "#d1d5db",
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
  lockedText: {
    color: "#9ca3af",
  },
});

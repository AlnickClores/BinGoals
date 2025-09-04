import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import BingoCard from "../components/BingoCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Dashboard: undefined;
};

const DOUBLE_CLICK_DELAY = 300;

const BingoalCardDetailScreen = ({ route }: any) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { card } = route.params;
  const [bingoalCardName, setBingoalCardName] = useState(card.name);
  const [goals, setGoals] = useState<string[][]>(card.goals);
  const [completedGoals, setCompletedGoals] = useState<boolean[][]>(
    card.completedGoals ||
      Array(5)
        .fill(null)
        .map(() => Array(5).fill(false))
  );

  const [isEditing, setIsEditing] = useState(false);
  const lastTap = useRef<number | null>(null);

  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < DOUBLE_CLICK_DELAY) {
      setIsEditing(true);
    }
    lastTap.current = now;
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const saveBingoalCard = async () => {
    try {
      const updatedCard = {
        ...card,
        name: bingoalCardName,
        goals,
        completedGoals,
        updatedAt: new Date().toISOString(),
      };

      const existingCardsJson = await AsyncStorage.getItem("bingoalCards");
      const existingCards = existingCardsJson
        ? JSON.parse(existingCardsJson)
        : [];

      const updatedCards = existingCards.map((existingCard: any) =>
        existingCard.id === card.id ? updatedCard : existingCard
      );

      await AsyncStorage.setItem("bingoalCards", JSON.stringify(updatedCards));
    } catch (error) {
      console.error("Error updating bingoal card:", error);
    }
  };

  useEffect(() => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      saveBingoalCard();
    }, 800);
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [bingoalCardName, goals, completedGoals]);

  return (
    <View style={styles.container}>
      {isEditing ? (
        <TextInput
          style={styles.bingoalCardName}
          value={bingoalCardName}
          onChangeText={setBingoalCardName}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <TouchableOpacity onPress={handleDoubleTap}>
          <Text style={styles.bingoalCardName}>{bingoalCardName}</Text>
        </TouchableOpacity>
      )}
      <BingoCard
        goals={goals}
        setGoals={setGoals}
        completedGoals={completedGoals}
        setCompletedGoals={setCompletedGoals}
      />
    </View>
  );
};

export default BingoalCardDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    padding: 20,
  },
  bingoalCardName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: -0.5,
  },
});

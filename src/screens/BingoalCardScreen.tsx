import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import BingoCard from "../components/BingoCard";
import SaveBingoalCardButton from "../components/SaveBingoalCardButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { checkAchievements } from "../logic/achievementCheckers";
import Toast from "react-native-toast-message";

type RootStackParamList = {
  Home: undefined;
  Dashboard: undefined;
};

const DOUBLE_CLICK_DELAY = 300;

const BingoalCardScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [cardCount, setCardCount] = useState(0);

  const generateDefaultCardName = (count: number) => {
    return `Goal #${count + 1}`;
  };

  const DEFAULT_GOALS = Array(5)
    .fill(null)
    .map((_, row) =>
      Array(5)
        .fill("")
        .map((_, col) => (row === 2 && col === 2 ? "YOU CAN DO IT!" : ""))
    );

  const [bingoalCardName, setBingoalCardName] = useState(
    generateDefaultCardName(cardCount)
  );
  const [goals, setGoals] = useState<string[][]>(DEFAULT_GOALS);

  const [completedGoals, setCompletedGoals] = useState(
    Array(5)
      .fill(null)
      .map(() => Array(5).fill(false))
  );

  const loadCardCount = async () => {
    try {
      const existingCardsJson = await AsyncStorage.getItem("bingoalCards");
      const existingCards = existingCardsJson
        ? JSON.parse(existingCardsJson)
        : [];
      const count = existingCards.length;
      setCardCount(count);
      setBingoalCardName(generateDefaultCardName(count));
    } catch (error) {
      console.error("Error loading card count:", error);
      setCardCount(0);
      setBingoalCardName(generateDefaultCardName(0));
    }
  };

  useEffect(() => {
    loadCardCount();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadCardCount();
    }, [])
  );

  const showCreateToast = () => {
    Toast.show({
      type: "success",
      text1: "Bingoal Card Created",
      text2: "Your new bingoal card has been created.",
      position: "bottom",
    });
  };

  const [isEditing, setIsEditing] = useState(false);
  const lastTap = useRef<number | null>(null);

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

  const resetCardToDefaults = () => {
    const newCount = cardCount + 1;
    setCardCount(newCount);
    setBingoalCardName(generateDefaultCardName(newCount));
    setGoals(DEFAULT_GOALS);
    setIsEditing(false);
  };

  const saveBingoalCard = async () => {
    try {
      const cardData = {
        id: Date.now().toString(),
        name: bingoalCardName,
        goals,
        createdAt: new Date().toISOString(),
      };

      const existingCardsJson = await AsyncStorage.getItem("bingoalCards");
      const existingCards = existingCardsJson
        ? JSON.parse(existingCardsJson)
        : [];

      const updatedCards = [...existingCards, cardData];

      const unlocked = checkAchievements(updatedCards);

      await AsyncStorage.setItem(
        "unlockedAchievements",
        JSON.stringify(unlocked)
      );
      await AsyncStorage.setItem("bingoalCards", JSON.stringify(updatedCards));

      console.log("Bingoal card saved successfully!");

      showCreateToast();
      resetCardToDefaults();

      navigation.navigate("Dashboard");
    } catch (error) {
      console.error("Error saving bingoal card:", error);
      Toast.show({
        type: "error",
        text1: "Save Failed",
        text2: "Failed to save your bingoal card. Please try again.",
        position: "bottom",
      });
    }
  };

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
      <SaveBingoalCardButton onPress={saveBingoalCard} />
    </View>
  );
};

export default BingoalCardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  bingoalCardName: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

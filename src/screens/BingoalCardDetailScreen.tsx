import React, { useState, useRef } from "react";
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

const DOUBLE_CLICK_DELAY = 300;

const BingoalCardDetailScreen = ({ route }: any) => {
  const { card } = route.params;
  const [bingoalCardName, setBingoalCardName] = useState(card.name);
  const [goals, setGoals] = useState<string[][]>(card.goals);

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

  const saveBingoalCard = async () => {
    try {
      const updatedCard = {
        ...card,
        name: bingoalCardName,
        goals,
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

      console.log("Bingoal card updated successfully!");
    } catch (error) {
      console.error("Error updating bingoal card:", error);
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
      <BingoCard goals={goals} setGoals={setGoals} />
      <SaveBingoalCardButton onPress={saveBingoalCard} />
    </View>
  );
};

export default BingoalCardDetailScreen;

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

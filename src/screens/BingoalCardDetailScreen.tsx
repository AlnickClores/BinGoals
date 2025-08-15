import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import BingoCard from "../components/BingoCard";
import SaveBingoalCardButton from "../components/SaveBingoalCardButton";
import DeleteBingoalCardButton from "../components/DeleteBingoalCardButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";

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

  const showAlterToast = () => {
    setTimeout(() => {
      Toast.show({
        type: "success",
        text1: "Bingoal Card Updated",
        text2: "Your changes have been saved.",
        position: "bottom",
      });
    }, 500);
  };

  const showDeleteToast = () => {
    setTimeout(() => {
      Toast.show({
        type: "success",
        text1: "Bingoal Card Deleted",
        text2: "Your bingoal card has been deleted.",
        position: "bottom",
      });
    }, 500);
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
      navigation.navigate("Dashboard");

      showAlterToast();

      console.log("Bingoal card updated successfully!");
    } catch (error) {
      console.error("Error updating bingoal card:", error);
    }
  };

  const deleteBingoalCard = () => {
    Alert.alert(
      "Delete Card?",
      "Are you sure you want to delete this bingo card?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const existingCardsJson = await AsyncStorage.getItem(
                "bingoalCards"
              );
              const existingCards = existingCardsJson
                ? JSON.parse(existingCardsJson)
                : [];

              const updatedCards = existingCards.filter(
                (existingCard: any) => existingCard.id !== card.id
              );

              await AsyncStorage.setItem(
                "bingoalCards",
                JSON.stringify(updatedCards)
              );

              console.log("Bingoal card deleted successfully!");

              showDeleteToast();

              navigation.navigate("Dashboard");
            } catch (error) {
              console.error("Error deleting bingoal card:", error);
            }
          },
        },
      ]
    );
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
      <DeleteBingoalCardButton onPress={deleteBingoalCard} />
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

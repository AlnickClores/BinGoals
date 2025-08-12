import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CreateBingoalCardButton from "../components/CreateBingoalCardButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Dashboard: undefined;
  BingoalCard: undefined;
  BingoalCardDetail: { card: BingoalCard };
};

interface BingoalCard {
  id: string;
  name: string;
  goals: string[][];
  createdAt: string;
}

const DashboardScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [bingoalCards, setBingoalCards] = useState([]);

  const loadBingoalCards = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("bingoalCards");
      const cardData = jsonValue != null ? JSON.parse(jsonValue) : [];
      setBingoalCards(cardData);
    } catch (error) {
      console.error("Error loading bingoal cards:", error);
    }
  };

  useEffect(() => {
    loadBingoalCards();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadBingoalCards();
    }, [])
  );

  const renderBingoalCard = ({ item }: { item: BingoalCard }) => (
    <TouchableOpacity
      style={styles.cardItem}
      onPress={() => navigation.navigate("BingoalCardDetail", { card: item })}
    >
      <Text style={styles.cardName}>{item.name}</Text>
      <Text style={styles.cardDate}>
        Created: {new Date(item.createdAt).toLocaleDateString()}
      </Text>
      <Text style={styles.cardGoalsCount}>
        Goals filled:{" "}
        {
          item.goals
            .flat()
            .filter(
              (goal: string) => goal.trim() !== "" && goal !== "YOU CAN DO IT!"
            ).length
        }
        /24
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.bingoCardsContainer}>
        <Text style={styles.title}>Your Bingo Cards</Text>
        {bingoalCards.length > 0 ? (
          <FlatList
            data={bingoalCards}
            renderItem={renderBingoalCard}
            keyExtractor={(item) => item.id}
            style={styles.cardsList}
          />
        ) : (
          <Text style={styles.emptyMessage}>
            No bingoal cards created yet. Create your first one!
          </Text>
        )}
      </View>
      <CreateBingoalCardButton />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
  },
  bingoCardsContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    width: "100%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  cardsList: {
    maxHeight: "70%",
    width: "100%",
  },
  cardItem: {
    backgroundColor: "orange",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  cardGoalsCount: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  emptyMessage: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 50,
  },
});

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import CreateBingoalCardButton from "../components/CreateBingoalCardButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import OptionsModal from "../components/OptionsModal";

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
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<BingoalCard | null>(null);

  const loadBingoalCards = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("bingoalCards");
      const cardData = jsonValue != null ? JSON.parse(jsonValue) : [];
      setBingoalCards(cardData);
    } catch (error) {
      console.error("Error loading bingoal cards:", error);
    }
  };

  const deleteBingoalCard = async (cardId: string) => {
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
                (existingCard: any) => existingCard.id !== cardId
              );

              await AsyncStorage.setItem(
                "bingoalCards",
                JSON.stringify(updatedCards)
              );
              setBingoalCards(updatedCards);
              showDeleteToast();
            } catch (error) {
              console.error("Error deleting bingoal card:", error);
            }
          },
        },
      ]
    );
  };

  const showDeleteToast = () => {
    Toast.show({
      type: "success",
      text1: "Bingoal Card Deleted",
      text2: "Your bingoal card has been deleted.",
      position: "bottom",
    });
  };

  const handleLongPress = (card: BingoalCard) => {
    setSelectedCard(card);
    setShowOptionsModal(true);
  };

  const handleDelete = () => {
    setShowOptionsModal(false);
    if (selectedCard) {
      deleteBingoalCard(selectedCard.id);
    }
  };

  const closeModal = () => {
    setShowOptionsModal(false);
    setSelectedCard(null);
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
      onLongPress={() => handleLongPress(item)}
      delayLongPress={500}
      activeOpacity={0.7}
    >
      <Text style={styles.cardName}>{item.name}</Text>

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
      <Text style={styles.cardDate}>
        Created: {new Date(item.createdAt).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.bingoCardsContainer}>
        <Text style={styles.title}>Your Bingoal Cards</Text>
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
      <OptionsModal
        cardName={selectedCard?.name || ""}
        showOptionsModal={showOptionsModal}
        handleDelete={handleDelete}
        closeModal={closeModal}
      />
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
    backgroundColor: "#f8fafc",
  },
  text: {
    fontSize: 24,
  },
  bingoCardsContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    width: "100%",
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 32,
    textAlign: "center",
    color: "#1e293b",
    letterSpacing: -0.5,
  },
  cardsList: {
    maxHeight: "70%",
    width: "100%",
  },
  cardItem: {
    backgroundColor: "#ffffff",
    padding: 20,
    marginBottom: 16,
    borderRadius: 16,
    borderColor: "#e2e8f0",
    borderWidth: 1,
    shadowColor: "#64748b",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  cardGoalsCount: {
    fontSize: 14,
    color: "#6366f1",
    fontWeight: "500",
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "400",
  },
  emptyMessage: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    marginTop: 50,
    fontWeight: "400",
    lineHeight: 24,
  },
});

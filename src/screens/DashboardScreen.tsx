import { View, Text, StyleSheet } from "react-native";
import CreateBingoalCardButton from "../components/CreateBingoalCardButton";

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bingoCardsContainer}>
        <Text>Your Bingo Cards</Text>
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
    backgroundColor: "red",
  },
});

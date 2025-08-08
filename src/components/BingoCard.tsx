import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import GoalModal from "./GoalModal";

type BingoCardProps = {
  goals: string[][];
  setGoals: React.Dispatch<React.SetStateAction<string[][]>>;
};

const BingoCard = ({ goals, setGoals }: BingoCardProps) => {
  const [selectedBox, setSelectedBox] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleBoxPress = (row: number, col: number) => {
    if (row === 2 && col === 2) return;
    setSelectedBox({ row, col });
    setInputText(goals[row][col] || "");
    setModalVisible(true);
  };

  const handleSaveGoal = () => {
    if (selectedBox) {
      const newGoals = goals.map((rowArr, rowIndex) =>
        rowArr.map((goal, colIndex) => {
          if (rowIndex === selectedBox.row && colIndex === selectedBox.col) {
            return inputText;
          }
          return goal;
        })
      );
      setGoals(newGoals);
      setModalVisible(false);
      setSelectedBox(null);
      setInputText("");
    }
  };

  return (
    <View style={styles.cardContainer}>
      {goals.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((goal, colIndex) => (
            <TouchableOpacity
              key={colIndex}
              style={[
                styles.cell,
                rowIndex === 2 && colIndex === 2 && styles.freeCell,
              ]}
              onPress={() => handleBoxPress(rowIndex, colIndex)}
              disabled={rowIndex === 2 && colIndex === 2}
            >
              <Text style={styles.cellText}>{goal}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <GoalModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        inputText={inputText}
        setInputText={setInputText}
        handleSaveGoal={handleSaveGoal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#999",
    justifyContent: "center",
    alignItems: "center",
    margin: 3,
    borderRadius: 5,
    backgroundColor: "#eee",
  },
  freeCell: {
    backgroundColor: "#cdeffd",
  },
  cellText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default BingoCard;

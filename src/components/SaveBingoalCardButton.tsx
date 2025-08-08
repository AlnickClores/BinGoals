import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type SaveBingoalCardButtonProps = {
  onPress: () => void;
};

const SaveBingoalCardButton = ({ onPress }: SaveBingoalCardButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={{ color: "white", fontWeight: "bold" }}>✓</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default SaveBingoalCardButton;

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type DeleteBingoalCardButtonProps = {
  onPress: () => void;
};

const DeleteBingoalCardButton = ({ onPress }: DeleteBingoalCardButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={{ color: "white", fontWeight: "bold" }}>🗑️</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ff2a2d",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
  },
});

export default DeleteBingoalCardButton;

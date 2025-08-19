import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Dashboard: undefined;
  BingoalCard: undefined;
};

const CreateBingoalCardButton = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate("BingoalCard")}
    >
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
  );
};

export default CreateBingoalCardButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#529b39",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 40,
  },
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

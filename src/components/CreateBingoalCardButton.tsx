import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

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
      <Ionicons name="add-outline" size={32} color="#fff" />
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

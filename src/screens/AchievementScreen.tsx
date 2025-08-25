import { View, Text, StyleSheet } from "react-native";

const AchievementScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Achievement Screen</Text>
    </View>
  );
};

export default AchievementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

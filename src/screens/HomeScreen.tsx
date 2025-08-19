import { View, Image, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";

type RootStackParamList = {
  Home: undefined;
  Dashboard: undefined;
};

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Dashboard");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/bingoal-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>BinGoals</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1fafb",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  logo: {
    width: 220,
    height: 220,
  },
  titleContainer: {
    position: "absolute",
    bottom: 50,
  },
});

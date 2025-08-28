import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import BingoalCardScreen from "../screens/BingoalCardScreen";
import BingoalCardDetailScreen from "../screens/BingoalCardDetailScreen";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dashboard"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BingoalCard"
        component={BingoalCardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BingoalCardDetail"
        component={BingoalCardDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../screens/DashboardScreen";
import BingoalCardDetailScreen from "../screens/BingoalCardDetailScreen";

const Stack = createNativeStackNavigator();

export default function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="DashboardMain"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BingoalCardDetail"
        component={BingoalCardDetailScreen}
        options={{ title: "Card Detail" }}
      />
    </Stack.Navigator>
  );
}

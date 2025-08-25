import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BingoalCardScreen from "../screens/BingoalCardScreen";
import AchievementScreen from "../screens/AchievementScreen";
import { Ionicons } from "@expo/vector-icons";
import DashboardStack from "./DashboardStack";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "Dashboard") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Create Bingoal") {
            iconName = focused ? "add" : "add-outline";
          } else if (route.name === "Achievement") {
            iconName = focused ? "trophy" : "trophy-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardStack} />
      <Tab.Screen name="Create Bingoal" component={BingoalCardScreen} />
      <Tab.Screen name="Achievement" component={AchievementScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

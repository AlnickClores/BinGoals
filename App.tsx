import StackNavigator from "./src/navigation/StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./src/navigation/TabNavigator";
import Toast from "react-native-toast-message";

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
      <Toast />
    </NavigationContainer>
  );
};

export default App;

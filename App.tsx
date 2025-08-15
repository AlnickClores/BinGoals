import StackNavigator from "./src/navigation/StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
      <Toast />
    </NavigationContainer>
  );
};

export default App;

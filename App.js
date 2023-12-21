import Home from "./screens/Home";
import { StatusBar } from "expo-status-bar";
import UploadData from "./screens/UploadData";
import DataSent from "./screens/DataSent";
import Error from "./screens/Error";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false, headerBackVisible: false }}
        >
          <Stack.Screen name="EcoWatcher" component={Home} />
          <Stack.Screen name="UploadData" component={UploadData} />
          <Stack.Screen name="DataSent" component={DataSent} />
          <Stack.Screen name="Error" component={Error} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

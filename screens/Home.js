import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Open up App to start working on your app!</Text>
      <StatusBar style="dark" />
      <OutlinedButton icon="camera" onPress={() => alert("asd")}>
        Click
      </OutlinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

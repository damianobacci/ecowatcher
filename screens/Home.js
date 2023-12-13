import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/logo.png")}
        />
      </View>
      <Text>Ecowatcher</Text>
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
  imageContainer: {
    width: 250,
    height: 250,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

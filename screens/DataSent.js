import { Text, View, StyleSheet, Image } from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
import Colors from "../utils/colors";

export default function DataSent({ navigation }) {
  function backHandler() {
    navigation.navigate("UploadData");
  }
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/success.png")}
        />
      </View>
      <Text style={styles.title}>Success!</Text>
      <View style={styles.claimContainer}>
        <Text style={styles.claim}>
          Your data was sent to the garbage collection authority and it will be
          taken care as soon as possible.
        </Text>
      </View>
      <OutlinedButton icon="arrow-back-circle-outline" onPress={backHandler}>
        BACK
      </OutlinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary500,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 220,
    height: 220,
    backgroundColor: "white",
    borderRadius: 220,
    borderWidth: 10,
    borderColor: Colors.primary500,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontFamily: "BowlbyOneSC_400Regular",
    fontSize: 28,
    color: Colors.primary500,
    marginTop: 18,
  },
  claim: {
    fontFamily: "Merriweather_400Regular",
    textAlign: "center",
    lineHeight: 26,
    fontSize: 18,
    color: Colors.primary500,
    marginBottom: 18,
  },
  claimContainer: {
    marginTop: 8,
    padding: 30,
  },
});

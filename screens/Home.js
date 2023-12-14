import { StyleSheet, Text, View, Image } from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
import Colors from "../utils/colors";
import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter";
import { Roboto_700Bold } from "@expo-google-fonts/roboto";
import { BowlbyOneSC_400Regular } from "@expo-google-fonts/bowlby-one-sc";
import { Merriweather_400Regular } from "@expo-google-fonts/merriweather";

export default function Home({ navigation }) {
  let [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Roboto_700Bold,
    BowlbyOneSC_400Regular,
    Merriweather_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  function getStartedHandler() {
    navigation.navigate("UploadData");
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/logo.png")}
        />
      </View>
      <Text style={styles.title}>EcoWatcher</Text>
      <View style={styles.claimContainer}>
        <Text style={styles.claim}>
          EcoWatcher allows to report litter and pollution hotspots in your city
          by simply snapping a photo of the trash and sharing it to the local
          public administration.
        </Text>
      </View>
      <OutlinedButton
        icon="arrow-forward-circle-outline"
        onPress={getStartedHandler}
      >
        GET STARTED
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
    fontSize: 40,
    color: Colors.primary500,
    marginTop: 18,
  },
  claim: {
    fontFamily: "Merriweather_400Regular",
    textAlign: "center",
    lineHeight: 26,
    fontSize: 18,
    color: Colors.primary500,
  },
  claimContainer: {
    marginTop: 8,
    padding: 30,
  },
});

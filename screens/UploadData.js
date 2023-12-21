import {
  TextInput,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
import { useState } from "react";
import Colors from "../utils/colors";
import { launchCameraAsync, launchImageLibraryAsync } from "expo-image-picker";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import FullButton from "../components/ui/FullButton";
import { getMapPreview, reverseGeocode } from "../utils/location";
import { storeLitter } from "../utils/http";
import * as Linking from "expo-linking";

export default function UploadData({ navigation }) {
  const [enteredDescription, setEnteredDescription] = useState("");
  const [pickedImage, setPickedImage] = useState();
  const [pickingLocation, setpickingLocation] = useState(false);
  const [location, setLocation] = useState("");
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();

  function descriptionHandler(inputText) {
    setEnteredDescription(inputText);
  }

  async function takeImageHandler() {
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });
    setPickedImage(image.assets[0].uri);
  }

  async function imageLibraryHandler() {
    const image = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });
    setPickedImage(image.assets[0].uri);
  }

  async function verifyPermission() {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    setpickingLocation(true);
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const currentLocation = await getCurrentPositionAsync({ accuracy: 5 });

    const address = await reverseGeocode(
      currentLocation.coords.latitude,
      currentLocation.coords.longitude
    );
    setLocation({
      lat: currentLocation.coords.latitude,
      lng: currentLocation.coords.longitude,
      address: address,
    });
  }

  function twitterHandler() {
    if (!enteredDescription || !location || !pickedImage) {
      Alert.alert("Missing data", "Please fill all the data fields");
      return;
    }
    Linking.openURL(
      `https://twitter.com/intent/tweet?text=Ciao%20%40amsa_spa%2C%20vi%20segnalo%20${enteredDescription}.%20Indirizzo%3A%20${location.address}%2C%20coord%3A%20${location.lat}%2C${location.lng}`
    );
    resetHandler();
  }

  async function sendDataHandler() {
    if (!enteredDescription || !location || !pickedImage) {
      Alert.alert("Missing data", "Please fill all the data fields");
      return;
    }
    try {
      await storeLitter({
        description: enteredDescription,
        location: location,
      });
      navigation.navigate("DataSent");
      resetHandler();
    } catch (error) {
      navigation.navigate("Error", { errorMessage: error.toString() });
    }
  }

  function resetHandler() {
    setEnteredDescription("");
    setPickedImage("");
    setLocation("");
    setpickingLocation(false);
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>
          Describe the litter (material, position..)
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={descriptionHandler}
          value={enteredDescription}
        />
        <Text style={styles.label}>Image of the litter</Text>
        <View>
          <View style={styles.imageContainer}>
            {pickedImage ? (
              <Image style={styles.image} source={{ uri: pickedImage }} />
            ) : (
              <Text style={styles.previewText}>No image taken yet.</Text>
            )}
          </View>
          <View style={styles.controls}>
            <OutlinedButton icon="camera" onPress={takeImageHandler}>
              TAKE IMAGE
            </OutlinedButton>
            <OutlinedButton
              icon="cloud-upload-outline"
              onPress={imageLibraryHandler}
            >
              UPLOAD IMAGE
            </OutlinedButton>
          </View>
        </View>
        <Text style={styles.label}>Location of the litter</Text>
        <View>
          <View style={styles.imageContainer}>
            {location ? (
              <Image
                style={styles.image}
                source={{ uri: getMapPreview(location.lat, location.lng) }}
              />
            ) : (
              <Text style={styles.previewText}>No location picked yet.</Text>
            )}
            {pickingLocation && !location && (
              <Text style={styles.previewText}>Picking a location...</Text>
            )}
          </View>

          <View style={styles.controls}>
            <OutlinedButton icon="locate-outline" onPress={getLocationHandler}>
              LOCATE
            </OutlinedButton>
          </View>
        </View>
        <View style={styles.buttons}>
          <View style={styles.controls}>
            <FullButton icon="paper-plane-outline" onPress={sendDataHandler}>
              SEND
            </FullButton>
            <FullButton icon="logo-twitter" onPress={twitterHandler}>
              TWEET
            </FullButton>
            <OutlinedButton icon="refresh-outline" onPress={resetHandler}>
              RESET
            </OutlinedButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary500,
    padding: 24,
    paddingTop: 36,
  },
  label: {
    color: Colors.primary500,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    color: Colors.primary500,
    borderColor: Colors.primary500,
    fontSize: 16,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.primary500,
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  previewText: {
    color: Colors.primary500,
  },
  buttons: {
    marginTop: 16,
    borderTopWidth: 1,
    borderColor: Colors.primary500,
  },
});

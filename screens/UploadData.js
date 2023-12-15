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
import { getMapPreview } from "../utils/location";
import * as Linking from "expo-linking";

export default function UploadData() {
  const [enteredDescription, setEnteredDescription] = useState("");
  const [pickedImage, setPickedImage] = useState();
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
        "Insufficient Permisisons!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const currentLocation = await getCurrentPositionAsync({ accuracy: 5 });
    setLocation({
      lat: currentLocation.coords.latitude,
      lng: currentLocation.coords.longitude,
    });
  }

  function pickOnMapHandler() {}

  function resetHandler() {
    setEnteredDescription("");
    setPickedImage();
    setLocation();
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
          </View>

          <View style={styles.controls}>
            <OutlinedButton icon="locate-outline" onPress={getLocationHandler}>
              LOCATE
            </OutlinedButton>
            <OutlinedButton icon="map-outline" onPress={pickOnMapHandler}>
              PIN ON MAP
            </OutlinedButton>
          </View>
        </View>
        <View>
          <FullButton icon="paper-plane-outline">SEND</FullButton>
          <FullButton
            icon="logo-twitter"
            onPress={() =>
              Linking.openURL(
                `https://twitter.com/intent/tweet?text=Ciao%20%40amsa_spa%2C%20ti%20segnalo%20${enteredDescription}.%20Indirizzo%3A%20xxx%2C%20geo%3A%20${location.lat}%2C${location.lng}`
              )
            }
          >
            TWEET
          </FullButton>
          <OutlinedButton icon="refresh-outline" onPress={resetHandler}>
            RESET
          </OutlinedButton>
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
    color: Colors.secondary500,
    borderColor: Colors.primary500,
    backgroundColor: Colors.primary500,
    fontSize: 16,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary500,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  previewText: {
    color: Colors.secondary500,
  },
});

import { TextInput, View, Text, Image, StyleSheet } from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
import { useState } from "react";
import Colors from "../utils/colors";
import { launchCameraAsync, launchImageLibraryAsync } from "expo-image-picker";

export default function UploadData() {
  const [enteredDescription, setEnteredDescription] = useState("");
  const [pickedImage, setPickedImage] = useState();
  const [location, setLocation] = useState();

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

  return (
    <View style={styles.container}>
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
    marginTop: 30,
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
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    marginVertical: 8,
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

import { TextInput, View, Text, Image, StyleSheet } from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
import { useState } from "react";
import Colors from "../utils/colors";

export default function UploadData() {
  const [enteredDescription, setEnteredDescription] = useState("");

  function descriptionHandler(inputText) {
    setEnteredDescription(inputText);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        onChangeText={descriptionHandler}
        value={enteredDescription}
      />
      <Text style={styles.label}>Pick an image</Text>
      <View>
        <View style={styles.controls}>
          <OutlinedButton
            icon="camera"
            onPress={() => alert("Open the camera")}
          >
            TAKE IMAGE
          </OutlinedButton>
          <OutlinedButton
            icon="cloud-upload-outline"
            onPress={() => alert("Open the gallery")}
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
});

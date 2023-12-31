import { Pressable, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../utils/colors";

export default function FullButton({ onPress, icon, children }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons
        style={styles.icon}
        name={icon}
        size={18}
        color={Colors.secondary500}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.secondary500,
    marginTop: 14,
    backgroundColor: Colors.primary500,
    marginRight: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: Colors.secondary500,
  },
});

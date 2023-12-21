import { Text } from "react-native";

export default function Error({ route }) {
  const { errorMessage } = route.params;
  return <Text>There was an error! {errorMessage}</Text>;
}

import { View, Button, Text, StyleSheet, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

function IconButton({ onPress }) {
  return (
    <View>
      <Pressable style={styles.mimo} onPress={onPress}>
        <AntDesign name="star" size={24} color="white" />
      </Pressable>
    </View>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  mimo: {
    padding: 6,
  },
});

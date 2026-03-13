import { View, Text, StyleSheet } from "react-native";
function MealDetail({ duration, complexity, affordability, style, textStyle }) {
  return (
    <View style={[styles.details, style]}>
      <Text style={[styles.text, textStyle]}>{duration} minute</Text>
      <Text style={[styles.text, textStyle]}>{complexity?.toUpperCase()}</Text>
      <Text style={[styles.text, textStyle]}>
        {affordability?.toUpperCase()}
      </Text>
    </View>
  );
}

export default MealDetail;

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 9,
  },
});

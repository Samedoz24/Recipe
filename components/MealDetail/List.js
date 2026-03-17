import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // İkonlar için

function List({ data, onAddPress }) {
  return data.map((dataPoint, index) => (
    <View key={`${dataPoint.substring(0, 5)}-${index}`} style={styles.listItem}>
      <Text style={styles.itemText}>{dataPoint}</Text>

      {/* Eğer onAddPress fonksiyonu gönderilmişse (yani bu bir malzeme listesiyse) + ikonunu göster */}
      {onAddPress && (
        <TouchableOpacity onPress={() => onAddPress(dataPoint)}>
          <Ionicons name="add-circle" size={24} color="#351401" />
        </TouchableOpacity>
      )}
    </View>
  ));
}

export default List;

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 8, // Biraz genişlettik
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: "#fff",
    flexDirection: "row", // Yazı ve ikonu yan yana dizer
    justifyContent: "space-between", // İkonu en sağa atar
    alignItems: "center",
  },
  itemText: {
    color: "#351401",
    flex: 1, // Uzun metinlerin alt satıra geçmesini sağlar
    marginRight: 10,
  },
});

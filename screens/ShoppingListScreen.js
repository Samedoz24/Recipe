import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

import { doc, onSnapshot, setDoc, arrayRemove } from "firebase/firestore";
import { db, auth } from "../util/firebaseConfig";

function ShoppingListScreen() {
  const [shoppingItems, setShoppingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userUid = auth.currentUser?.uid;

  // Firebase'den Alışveriş Listesini Canlı Dinle
  useEffect(() => {
    if (!userUid) {
      setIsLoading(false);
      return;
    }

    const docRef = doc(db, "shoppingList", userUid);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      setIsLoading(true);
      if (docSnap.exists()) {
        setShoppingItems(docSnap.data().items || []);
      } else {
        setShoppingItems([]);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [userUid]);

  // Tek Bir Malzemeyi Silme
  async function removeItem(item) {
    if (!userUid) return;
    const docRef = doc(db, "shoppingList", userUid);
    try {
      await setDoc(docRef, { items: arrayRemove(item) }, { merge: true });
    } catch (error) {
      Alert.alert("Hata", "Malzeme silinemedi.");
    }
  }

  // Tüm Listeyi Temizleme
  async function clearAllItems() {
    if (shoppingItems.length === 0) return;
    Alert.alert("Emin misiniz?", "Tüm alışveriş listeniz temizlenecek.", [
      { text: "Vazgeç", style: "cancel" },
      {
        text: "Hepsini Sil",
        style: "destructive",
        onPress: async () => {
          const docRef = doc(db, "shoppingList", userUid);
          await setDoc(docRef, { items: [] }, { merge: true });
        },
      },
    ]);
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF6347" />
      </View>
    );
  }

  // 🚀 LOTTIE EKRANI: Arka planı tamamen siyah olan şef animasyonu
  if (shoppingItems.length === 0) {
    return (
      <View style={styles.center}>
        <View style={styles.lottieWrapper}>
          <LottieView
            autoPlay
            loop
            style={{ width: 280, height: 280 }}
            source={require("../assets/chef.json")}
          />
        </View>
        <Text style={styles.emptyText}>Mutfakta Malzeme Kalmadı!</Text>
        <Text style={styles.subText}>
          Yeni bir tarif seçip malzemeleri ekleyebilirsin.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.clearButton} onPress={clearAllItems}>
          <Text style={styles.clearButtonText}>Listeyi Temizle</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={shoppingItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.itemText}>{item}</Text>
            <TouchableOpacity onPress={() => removeItem(item)}>
              <Ionicons
                name="checkmark-circle-outline"
                size={28}
                color="#41d95d"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

export default ShoppingListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F2022",
  },
  center: {
    flex: 1,
    backgroundColor: "#1F2022",
    justifyContent: "center",
    alignItems: "center",
  },
  // 🚀 Animasyonun arkasını siyah yapan yeni stil
  lottieWrapper: {
    backgroundColor: "black",
    borderRadius: 20, // Hafif yumuşatılmış köşeler daha profesyonel durur
    overflow: "hidden",
    marginBottom: 10,
  },
  emptyText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  subText: {
    color: "gray",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 40,
  },
  headerContainer: {
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 5,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#FF6347",
  },
  clearButtonText: { color: "#FF6347", fontWeight: "500", fontSize: 12 },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2c2d30",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 10,
  },
  itemText: { color: "white", fontSize: 16, flex: 1 },
});

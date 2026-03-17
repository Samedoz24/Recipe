import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  FlatList,
  RefreshControl, // 🚀 Yenileme çarkı için eklendi
} from "react-native";
import LottieView from "lottie-react-native"; // 🚀 Lottie modülü eklendi

// Firebase motorları
import { doc, onSnapshot, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../util/firebaseConfig";

// Senin kendi bileşenin
import MealItem from "../components/MealItem";

function FavoritesScreen() {
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // 🚀 Yenileme durumu
  const userUid = auth.currentUser?.uid;

  // Veri çekme mantığını fonksiyonlaştırdık (Yenileme için lazım)
  async function fetchFavorites(favIds) {
    if (favIds.length === 0) {
      setFavoriteMeals([]);
      return;
    }

    const loadedFavorites = [];
    for (const id of favIds) {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        if (data.meals) {
          const meal = data.meals[0];
          loadedFavorites.push({
            id: meal.idMeal,
            title: meal.strMeal,
            imageUrl: meal.strMealThumb,
            duration: 30,
            complexity: meal.strArea,
            affordability: meal.strCategory,
          });
        }
      } catch (error) {
        console.error("Favori yemeği API'den çekilemedi:", id);
      }
    }
    setFavoriteMeals(loadedFavorites);
  }

  useEffect(() => {
    if (!userUid) {
      setIsLoading(false);
      return;
    }

    const docRef = doc(db, "favoriteMeals", userUid);

    // Favorileri canlı dinle
    const unsubscribe = onSnapshot(docRef, async (docSnap) => {
      setIsLoading(true);
      if (docSnap.exists()) {
        const favIds = docSnap.data().mealIds || [];
        await fetchFavorites(favIds);
      } else {
        setFavoriteMeals([]);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [userUid]);

  // 🚀 Aşağı çekince çalışan fonksiyon (Gri çark)
  async function onRefresh() {
    setRefreshing(true);
    const docRef = doc(db, "favoriteMeals", userUid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const favIds = docSnap.data().mealIds || [];
      await fetchFavorites(favIds);
    }
    setRefreshing(false);
  }

  async function clearAllFavorites() {
    if (favoriteMeals.length === 0) return;

    Alert.alert("Emin misiniz?", "Tüm favoriler silinecek.", [
      { text: "Vazgeç", style: "cancel" },
      {
        text: "Sil",
        style: "destructive",
        onPress: async () => {
          try {
            const docRef = doc(db, "favoriteMeals", userUid);
            await updateDoc(docRef, { mealIds: [] });
          } catch (error) {
            Alert.alert("Hata", "Silme işlemi başarısız.");
          }
        },
      },
    ]);
  }

  function renderMealItem(itemData) {
    const mealItemProps = {
      id: itemData.item.id,
      title: itemData.item.title,
      imageUrl: itemData.item.imageUrl,
      affordability: itemData.item.affordability,
      complexity: itemData.item.complexity,
      duration: itemData.item.duration,
    };
    return <MealItem {...mealItemProps} />;
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6347" />
      </View>
    );
  }

  // 🚀 FAVORİLER BOŞSA: FOOD.json animasyonu çıkacak
  if (favoriteMeals.length === 0) {
    return (
      <FlatList
        data={[]}
        renderItem={null}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <LottieView
              autoPlay
              loop
              style={{ width: 280, height: 280 }}
              source={require("../assets/FOOD.json")}
            />
            <Text style={styles.emptyTextTitle}>Favori listeniz boş.</Text>
            <Text style={styles.emptyTextSub}>
              Beğendiğin tarifleri buraya ekleyerek koleksiyonunu
              oluşturabilirsin!
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="gray"
            colors={["gray"]}
          />
        }
        style={styles.container}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearAllFavorites}
        >
          <Text style={styles.clearButtonText}>Listeyi Temizle</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={favoriteMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="gray"
            colors={["gray"]}
          />
        }
      />
    </View>
  );
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1F2022" },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#1F2022",
    justifyContent: "center",
    alignItems: "center",
  },
  // Lottie için yeni boş konteyner stili
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyTextTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: -20,
  },
  emptyTextSub: {
    color: "gray",
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 40,
    marginTop: 8,
  },
  buttonWrapper: {
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
});

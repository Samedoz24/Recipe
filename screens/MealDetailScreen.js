import { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Linking,
  Share,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics"; // Titreşim modülü

import MealDetail from "../components/MealDetail";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";

// Firebase
import {
  doc,
  setDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../util/firebaseConfig";

function MealDetailScreen({ route, navigation }) {
  const mealId = route.params.mealId;
  const userUid = auth.currentUser?.uid;

  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // 🚀 1. ÇÖKME KORUMALI VERİ ÇEKME İŞLEMİ
  useEffect(() => {
    async function fetchMealDetail() {
      setIsLoading(true);
      try {
        // ID'nin boş gelme ihtimaline karşı ekstra güvenlik
        if (!mealId) throw new Error("Yemek ID'si bulunamadı.");

        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );

        // Veriyi direkt JSON yapmadan önce düz metin (text) olarak alıyoruz
        const textData = await response.text();

        let data;
        try {
          // Şimdi JSON'a çevirmeyi deniyoruz
          data = JSON.parse(textData);
        } catch (parseError) {
          // Eğer JSON değilse (API bozuksa), uygulamayı çökertmeden hataya düşürüyoruz
          console.log("API'den geçersiz veri geldi:", textData);
          throw new Error("Geçersiz API yanıtı.");
        }

        if (!data.meals || data.meals.length === 0) {
          throw new Error("Tarif bulunamadı.");
        }

        const meal = data.meals[0];

        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ingredient && ingredient.trim() !== "") {
            ingredients.push(`${measure ? measure : ""} ${ingredient}`);
          }
        }

        setSelectedMeal({
          id: meal.idMeal,
          title: meal.strMeal,
          imageUrl: meal.strMealThumb,
          youtubeUrl: meal.strYoutube,
          ingredients: ingredients,
          steps: meal.strInstructions
            ? meal.strInstructions
                .split(/\r?\n|\r/)
                .map((s) => s.trim())
                .filter((s) => s !== "" && s !== ".")
            : [],
          duration: Math.floor(Math.random() * 45) + 15,
          complexity: meal.strArea,
          affordability: meal.strCategory,
        });
      } catch (error) {
        // Hata olursa kullanıcıya sessizce "Yüklenemedi" ekranını gösterecek
        console.error("Detay yükleme hatası:", error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMealDetail();
  }, [mealId]);

  // 2. Firebase Favori Dinleyicisi
  useEffect(() => {
    if (!userUid) return;
    const docRef = doc(db, "favoriteMeals", userUid);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const favs = docSnap.data().mealIds || [];
        setIsFavorite(favs.includes(mealId));
      }
    });
    return () => unsubscribe();
  }, [mealId, userUid]);

  async function changeFavoriteStatusHandler() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); // Titreşim
    if (!userUid) return;
    const docRef = doc(db, "favoriteMeals", userUid);
    try {
      if (isFavorite) {
        await setDoc(docRef, { mealIds: arrayRemove(mealId) }, { merge: true });
      } else {
        await setDoc(docRef, { mealIds: arrayUnion(mealId) }, { merge: true });
      }
    } catch (error) {
      Alert.alert("Hata", "İşlem başarısız.");
    }
  }

  async function addToShoppingList(ingredient) {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); // Başarı Titreşimi
    if (!userUid) return;
    const docRef = doc(db, "shoppingList", userUid);
    try {
      await setDoc(docRef, { items: arrayUnion(ingredient) }, { merge: true });
      Alert.alert(
        "Başarılı",
        `"${ingredient}" alışveriş listesine eklendi! 🛒`
      );
    } catch (error) {
      Alert.alert("Hata", "Listeye eklenemedi.");
    }
  }

  function openYoutubeVideo() {
    if (selectedMeal?.youtubeUrl) {
      Linking.openURL(selectedMeal.youtubeUrl);
    } else {
      Alert.alert("Üzgünüz", "Bu tarifin videosu bulunmuyor.");
    }
  }

  async function shareRecipeHandler() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // Titreşim
    if (!selectedMeal) return;
    try {
      const shareMessage = `Harika bir tarif buldum: ${
        selectedMeal.title
      }!\n\nVideolu anlatım için buraya tıkla: ${
        selectedMeal.youtubeUrl
          ? selectedMeal.youtubeUrl
          : selectedMeal.imageUrl
      }`;
      await Share.share({ message: shareMessage });
    } catch (error) {
      Alert.alert("Hata", "Tarif paylaşılamadı.");
    }
  }

  // 7. Üst Bar Butonları
  useLayoutEffect(() => {
    if (!selectedMeal) return; // Veri yoksa butonları çıkarma

    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtonsContainer}>
          <TouchableOpacity
            onPress={shareRecipeHandler}
            style={styles.circleButton}
          >
            <Ionicons name="share-outline" size={22} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={changeFavoriteStatusHandler}
            style={[styles.circleButton, { marginLeft: 12 }]}
          >
            <Ionicons
              name={isFavorite ? "star" : "star-outline"}
              size={22}
              color={isFavorite ? "#FFD700" : "white"}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, isFavorite, selectedMeal]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6347" />
      </View>
    );
  }

  // Veri API'den gelemediyse veya JSON hatası olduysa bunu göster!
  if (!selectedMeal) {
    return (
      <View style={styles.loadingContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="gray" />
        <Text style={styles.errorText}>Yemek detayları yüklenemedi.</Text>
        <Text style={styles.errorSubText}>
          Lütfen daha sonra tekrar deneyin.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      </View>

      <Text style={styles.title}>{selectedMeal.title}</Text>

      {selectedMeal.youtubeUrl ? (
        <TouchableOpacity
          style={styles.youtubeButton}
          onPress={openYoutubeVideo}
        >
          <Ionicons name="logo-youtube" size={24} color="white" />
          <Text style={styles.youtubeButtonText}>Tarifi Videolu İzle</Text>
        </TouchableOpacity>
      ) : null}

      <MealDetail
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />

      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List
            data={selectedMeal.ingredients}
            onAddPress={addToShoppingList}
          />

          <Subtitle>Instructions</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: { marginBottom: 15, backgroundColor: "#1F2022" },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#1F2022",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
  },
  errorSubText: { color: "gray", fontSize: 14, marginTop: 5 },
  imageContainer: { width: "100%", height: 250, padding: 18, paddingTop: 0 },
  image: { width: "100%", height: "100%", borderRadius: 15 },
  title: {
    fontWeight: "bold",
    fontSize: 23,
    margin: 10,
    textAlign: "center",
    color: "white",
  },
  detailText: { color: "white" },
  listOuterContainer: { alignItems: "center" },
  listContainer: { width: "90%" },
  youtubeButton: {
    flexDirection: "row",
    backgroundColor: "#FF0000",
    marginHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  youtubeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  headerButtonsContainer: { flexDirection: "row", alignItems: "center" },
  circleButton: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: 8,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

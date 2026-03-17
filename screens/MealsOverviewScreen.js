import { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import MealItem from "../components/MealItem";

function MealsOverviewScreen({ route, navigation }) {
  const catId = route.params.categoryId;
  const searchQuery = route.params.searchQuery;

  const [displayedMeals, setDisplayedMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: catId ? catId : `Sonuçlar: "${searchQuery}"`,
    });
  }, [catId, searchQuery, navigation]);

  useEffect(() => {
    async function fetchMeals() {
      setIsLoading(true);
      try {
        if (catId) {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catId}`
          );
          const data = await response.json();

          // KORUMA: Eğer data.meals null gelirse boş dizi [] kullan
          const mealsArray = data.meals || [];

          const detailedMealsPromises = mealsArray.map(async (meal) => {
            const detailResponse = await fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
            );
            const detailData = await detailResponse.json();
            const fullMeal = detailData.meals ? detailData.meals[0] : meal;

            return {
              id: fullMeal.idMeal,
              title: fullMeal.strMeal,
              imageUrl: fullMeal.strMealThumb,
              duration: Math.floor(Math.random() * 45) + 15,
              complexity: fullMeal.strArea
                ? fullMeal.strArea.toUpperCase()
                : "KARMA",
              affordability: fullMeal.strCategory
                ? fullMeal.strCategory.toUpperCase()
                : "GENEL",
            };
          });

          const detailedMeals = await Promise.all(detailedMealsPromises);
          setDisplayedMeals(detailedMeals);
        } else if (searchQuery) {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
          );
          const data = await response.json();

          if (data.meals) {
            const searchMeals = data.meals.map((meal) => ({
              id: meal.idMeal,
              title: meal.strMeal,
              imageUrl: meal.strMealThumb,
              duration: Math.floor(Math.random() * 45) + 15,
              complexity: meal.strArea ? meal.strArea.toUpperCase() : "KARMA",
              affordability: meal.strCategory
                ? meal.strCategory.toUpperCase()
                : "GENEL",
            }));
            setDisplayedMeals(searchMeals);
          } else {
            setDisplayedMeals([]);
          }
        }
      } catch (error) {
        console.error("Yemekler yüklenirken hata:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMeals();
  }, [catId, searchQuery]);

  function renderMealItem(itemData) {
    const item = itemData.item;
    return <MealItem {...item} />;
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6347" />
      </View>
    );
  }

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.notFoundText}>Hiçbir sonuç bulunamadı.</Text>
        <Text style={styles.notFoundSubText}>
          Lütfen başka bir kelime deneyin.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#1F2022" },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#1F2022",
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: { color: "white", fontSize: 20, fontWeight: "bold" },
  notFoundSubText: { color: "gray", fontSize: 16, marginTop: 8 },
});

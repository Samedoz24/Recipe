import { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  RefreshControl,
} from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";

function CategoriesScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const [refreshing, setRefreshing] = useState(false);

  async function fetchCategories() {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await response.json();

      const colorPalette = [
        "#f5428d",
        "#f54242",
        "#f5a442",
        "#f5d142",
        "#368dff",
        "#41d95d",
        "#9eecff",
        "#b9ffb0",
        "#ffc7ff",
        "#47fced",
        "#ff6347",
        "#9370db",
      ];

      const transformedCategories = data.categories.map((cat, index) => ({
        id: cat.strCategory,
        title: cat.strCategory,
        color: colorPalette[index % colorPalette.length],
      }));

      setCategories(transformedCategories);
    } catch (error) {
      console.error("Kategoriler yüklenirken hata:", error);
    }
  }

  useEffect(() => {
    async function loadInitialData() {
      setIsLoading(true);
      await fetchCategories();
      setIsLoading(false);
    }
    loadInitialData();
  }, []);

  async function onRefreshHandler() {
    setRefreshing(true);

    await fetchCategories();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setRefreshing(false);
  }

  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("MealsOverview", { categoryId: itemData.item.id });
    }
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  }

  function searchHandler() {
    if (searchText.trim().length === 0) return;
    navigation.navigate("MealsOverview", { searchQuery: searchText });
    setSearchText("");
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6347" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={2}
        ListHeaderComponent={
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Yemek Ara (Örn: Pizza, Chicken...)"
              placeholderTextColor="#a0a0a0"
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={searchHandler}
              returnKeyType="search"
            />
          </View>
        }
        // 🚀 SADECE BURADAKİ RENKLER "gray" OLARAK DEĞİŞTİRİLDİ
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefreshHandler}
            tintColor="gray"
            colors={["gray"]}
            progressViewOffset={10}
          />
        }
      />
    </View>
  );
}

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F2022",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#1F2022",
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#1F2022",
  },
  searchInput: {
    backgroundColor: "#2c2d30",
    color: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#3a3b3f",
  },
});

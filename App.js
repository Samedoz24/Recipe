import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Text,
  Modal,
  Image,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Firebase motorları
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./util/firebaseConfig";

// Ekranlar
import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ShoppingListScreen from "./screens/ShoppingListScreen";
import OnboardingScreen from "./screens/OnboardingScreen";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function TabNavigator() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#1F2022" },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: "#1F2022" },
        tabBarActiveTintColor: "#FF6347",
        sceneStyle: { backgroundColor: "#1F2022" },
        headerRight: () => (
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              Alert.alert("Çıkış Yap", "Emin misiniz?", [
                { text: "İptal", style: "cancel" },
                {
                  text: "Çıkış Yap",
                  style: "destructive",
                  onPress: () => signOut(auth),
                },
              ]);
            }}
          >
            <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <BottomTabs.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "Kategoriler",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: "Favorilerim",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="ShoppingList"
        component={ShoppingListScreen}
        options={{
          title: "Alışveriş",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" color={color} size={size} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [randomMeal, setRandomMeal] = useState(null); // 🚀 Rastgele yemek verisi burada tutulacak

  const navigationRef = useNavigationContainerRef();

  // 🚀 Rastgele yemek çekme fonksiyonu
  async function fetchRandomMeal() {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await response.json();
      if (data.meals) {
        setRandomMeal(data.meals[0]);
      }
    } catch (error) {
      console.error("Rastgele yemek çekilemedi:", error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsChecking(false);

      if (currentUser) {
        // Kullanıcı varsa önce rastgele yemeği çek, sonra modalı aç
        fetchRandomMeal().then(() => {
          setTimeout(() => setShowModal(true), 2000);
        });
      }
    });
    return unsubscribe;
  }, []);

  function handleGoToDetail() {
    if (!randomMeal) return;

    setShowModal(false);

    if (navigationRef.isReady()) {
      navigationRef.navigate("MealDetail", {
        mealId: randomMeal.idMeal, // 🚀 Artık ID dinamik olarak geliyor
      });
    }
  }

  if (isChecking) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6347" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer ref={navigationRef}>
        {/* 🚀 MODAL İÇERİĞİ ARTIK DİNAMİK */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={showModal && randomMeal !== null}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTag}>GÜNÜN ŞANSLI TARİFİ</Text>

              {randomMeal && (
                <>
                  <Image
                    source={{ uri: randomMeal.strMealThumb }}
                    style={styles.modalImage}
                  />
                  <Text style={styles.modalTitle}>{randomMeal.strMeal}</Text>
                  <Text style={styles.modalDesc}>
                    {randomMeal.strArea} mutfağından nefis bir lezzet! Bugün
                    denemeye ne dersin?
                  </Text>
                </>
              )}

              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleGoToDetail}
              >
                <Text style={styles.modalButtonText}>Harika, Başlayalım!</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={styles.closeText}>Belki Daha Sonra</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#1F2022" },
            headerTintColor: "white",
            contentStyle: { backgroundColor: "#1F2022" },
          }}
        >
          {!user ? (
            <>
              <Stack.Screen
                name="Onboarding"
                component={OnboardingScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MealsOverview"
                component={MealsOverviewScreen}
                options={{ title: "Yemekler" }}
              />
              <Stack.Screen
                name="MealDetail"
                component={MealDetailScreen}
                options={{ title: "Tarif Detayı" }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#1F2022",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButton: {
    marginRight: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FF6347",
  },
  logoutButtonText: { color: "#FF6347", fontSize: 12, fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#2c2d30",
    borderRadius: 30,
    padding: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#444",
  },
  modalTag: {
    color: "#FF6347",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 15,
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 20,
    marginBottom: 15,
  },
  modalTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalDesc: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 20,
  },
  modalButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  closeText: { color: "#666", marginTop: 15, fontSize: 13 },
});

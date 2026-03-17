import { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Telefon ekranının genişliğini alıyoruz ki sayfalar tam ekrana otursun
const { width } = Dimensions.get("window");

// Tanıtım slaytlarımızın içeriği
const slides = [
  {
    id: "1",
    title: "Lezzet Dünyasına\nHoş Geldiniz",
    description:
      "Dünya mutfağından binlerce nefis tarifi keşfetmek için doğru yerdesiniz.",
    icon: "restaurant-outline",
  },
  {
    id: "2",
    title: "Favorilerinizi\nKaydedin",
    description:
      "Beğendiğiniz tarifleri yıldızlayıp her an elinizin altında olacak kendi menünüzü oluşturun.",
    icon: "star-outline",
  },
  {
    id: "3",
    title: "Alışveriş Listenizi\nHazırlayın",
    description:
      "Tariflerdeki eksik malzemeleri tek tıkla alışveriş sepetinize atın ve markette rahat edin.",
    icon: "cart-outline",
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);

  // Ekranda hangi slaytın göründüğünü takip eden fonksiyon
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // İleri veya Başla butonuna tıklandığında çalışacak fonksiyon
  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      // Eğer son slaytta değilsek bir sonrakine kaydır
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // Eğer son slayttaysak Giriş Yap (Login) ekranına yönlendir
      navigation.replace("Login");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Ionicons
              name={item.icon}
              size={120}
              color="#FF6347"
              style={styles.icon}
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled // Sayfaların yarım kalmasını engeller, tam oturmasını sağlar
        bounces={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      {/* ALT KISIM (Noktalar ve Buton) */}
      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              // Aktif olan nokta genişleyecek ve Mercan rengi olacak
              style={[
                styles.indicator,
                currentIndex === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={nextSlide}>
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? "Hadi Başlayalım" : "İleri"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F2022",
  },
  slide: {
    width,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  icon: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: "#a0a0a0",
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  footer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    paddingHorizontal: 20,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: 5,
  },
  activeIndicator: {
    width: 25, // Aktif nokta çizgi gibi genişleyecek
    backgroundColor: "#FF6347",
  },
  button: {
    backgroundColor: "#FF6347",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

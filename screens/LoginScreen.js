import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../util/firebaseConfig";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Giriş Yap butonuna basılınca çalışacak motor:
  const handleLogin = async () => {
    try {
      // Firebase'e "Bu biletle içeri girmeye çalışıyorum" diyoruz
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert("Giriş Hatası", "E-posta veya şifre yanlış!");
    }
  };

  return (
    <View style={styles.container}>
      {/* DEĞİŞTİRİLEN KISIM: Başlık güncellendi */}
      <Text style={styles.title}>Giriş Yap</Text>

      <TextInput
        style={styles.input}
        placeholder="E-posta adresiniz"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Şifreniz"
        placeholderTextColor="#ccc"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.switchText}>Hesabın yok mu? Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginScreen;

// SENİN TASARIM DİLİNE SADIK KALINARAK HAZIRLANMIŞ STİLLER:
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F2022", // Senin ana rengin
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#333436", // Koyu temaya uygun input arka planı
    color: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#FF6347", // DEĞİŞTİRİLEN KISIM: Canlı mercan rengi
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "white", // DEĞİŞTİRİLEN KISIM: Yazı rengi beyaz oldu
    fontWeight: "bold",
    fontSize: 16,
  },
  switchText: {
    color: "#FF6347", // DEĞİŞTİRİLEN KISIM: Alt yazı rengi butonla uyumlu oldu
    textAlign: "center",
  },
});

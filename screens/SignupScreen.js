import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../util/firebaseConfig";
import { Ionicons } from "@expo/vector-icons"; // YENİ: İkon paketini çağırdık

function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert("Kayıt Hatası", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* YENİ EKLENEN KISIM: Sol Üst Geri Butonu */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // navigation.navigate('Login') de yazabilirdik ama goBack() daha profesyoneldir
      >
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Yeni Hesap Oluştur</Text>

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
        placeholder="Şifreniz (En az 6 hane)"
        placeholderTextColor="#ccc"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.switchText}>Zaten hesabın var mı? Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignupScreen;

// STİLLER (Tasarımına dokunulmadı, sadece backButton eklendi)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F2022",
    justifyContent: "center",
    padding: 20,
  },
  // YENİ: Geri butonunu diğer her şeyden bağımsız olarak sol üste çiviliyoruz
  backButton: {
    position: "absolute",
    top: 60, // Telefonun çentiğinin (notch) altında kalması için yukarıdan boşluk
    left: 20, // Sol kenardan boşluk
    zIndex: 1, // Butonun tıklanabilir olması için diğer elemanların üstüne çıkarıyoruz
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#333436",
    color: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#FF6347",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  switchText: {
    color: "#FF6347",
    textAlign: "center",
  },
});

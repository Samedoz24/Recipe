📝 Recipe App - React Native & Firebase
Bu proje, kullanıcıların lezzetli yemek tarifleri keşfedebileceği, favorilerine ekleyebileceği ve alışveriş listesi oluşturabileceği kapsamlı bir mobil uygulamadır. Modern kullanıcı deneyimi için Lottie animasyonları ve dinamik API entegrasyonu ile güçlendirilmiştir.

✨ Öne Çıkan Özellikler
Dinamik Günün Tarifi: Uygulama her açıldığında API'den rastgele çekilen şanslı bir yemek tarifi modal (açılır pencere) ile kullanıcıya sunulur.

Kategori Bazlı Listeleme: Farklı dünya mutfakları ve yemek türlerine göre kategorize edilmiş binlerce tarif.

Favoriler Sistemi: Firebase Firestore ile senkronize çalışan, kullanıcıya özel favori listesi.

Akıllı Alışveriş Listesi: Tarif detaylarından tek tıkla eklenen malzemelerin yönetildiği alışveriş ekranı.

Canlı Veri Senkronizasyonu: Sayfayı aşağı çekerek (Pull-to-Refresh) verileri anında güncelleme özelliği.

Lottie Animasyonları: Boş liste durumlarında ve yükleme ekranlarında kullanıcıyı karşılayan etkileşimli animasyonlar.

🛠 Kullanılan Teknolojiler
Framework: React Native (Expo)

Navigation: React Navigation (Stack & Bottom Tabs)

Backend: Firebase Auth & Firestore

API: TheMealDB API

Animasyon: Lottie React Native

İkonlar: Expo Vector Icons (Ionicons)

🚀 Kurulum
Projeyi yerel makinenizde çalıştırmak için şu adımları izleyin:

Depoyu klonlayın:

Bash
git clone https://github.com/samedoz24/recipe.git
Bağımlılıkları yükleyin:

Bash
npm install
Firebase Yapılandırması:
util/ klasörü altında bir firebaseConfig.js dosyası oluşturun ve kendi Firebase anahtarlarınızı ekleyin.

Uygulamayı başlatın:

Bash
npx expo start
📂 Dosya Yapısı
screens/: Uygulamanın ana ekranları (Login, Onboarding, Categories, vb.).

components/: Tekrar kullanılabilir UI bileşenleri (MealItem, IconButton, vb.).

assets/: Lottie (JSON) animasyonları ve statik görseller.

util/: Firebase yapılandırması ve yardımcı fonksiyonlar.

models/: Veri modelleri ve sınıflar.

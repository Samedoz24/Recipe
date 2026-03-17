🥗 Recipe - Akıllı Yemek Tarifi Uygulaması
📖 Proje Nedir?
Bu proje, "Bugün ne pişirsem?" derdine son veren, binlerce tarife anında ulaşabileceğiniz ve kendi yemek koleksiyonunuzu yönetebileceğiniz modern bir mobil uygulamadır. Mutfakta vakit geçirmeyi sevenler için hem görsel hem de işlevsel bir yardımcı olarak tasarlanmıştır.

✨ Uygulamanın Özellikleri Neler?
👨‍🍳 Günün Şanslı Tarifi (Sürpriz Modal)
Uygulamayı her açtığınızda sizi harika bir görselle karşılayan "Günün Şanslı Tarifi" modalı çıkar. API'den gelen bu rastgele öneriyle her gün yeni bir lezzet keşfedebilirsiniz.

⭐ Kişisel Favori Listem
Beğendiğiniz tarifleri yıldızlayarak favorilerinize ekleyebilirsiniz. Firebase desteği sayesinde favorileriniz bulutta saklanır; telefonunuzu değiştirseniz bile tarifleriniz güvende kalır!

🛒 Akıllı Alışveriş Listesi
Bir tarifi beğendiniz ama malzemeleriniz mi eksik? Tek tıkla malzemeleri alışveriş listesine gönderin. Marketten aldığınız ürünlerin yanındaki onay işaretine basarak listenizi kolayca yönetin.

🎬 Lottie ile Canlı Animasyonlar
Boş listeler veya yükleme ekranları artık sıkıcı değil! Uygulama genelinde kullanılan profesyonel Lottie animasyonları ile çok daha akıcı ve eğlenceli bir kullanıcı deneyimi yaşarsınız.

🌓 Modern ve Şık Arayüz
Koyu tema (Dark Mode) öncelikli tasarımıyla hem gözlerinizi yormaz hem de yemek fotoğraflarının en iştah açıcı haliyle görünmesini sağlar.

💻 Hangi Teknolojiler Kullanıldı?
⚛️ React Native & Expo
Uygulamanın hem iOS hem de Android cihazlarda yüksek performansla çalışmasını sağlayan en modern mobil yazılım teknolojileri kullanıldı.

🔥 Firebase (Auth & Firestore)
Kullanıcı giriş-çıkış işlemleri ve verilerin anlık olarak kaydedilmesi için Google'ın güçlü bulut altyapısı tercih edildi.

🌍 TheMealDB API
Dünya mutfaklarından binlerce güncel yemek verisini çekmek için kullanılan devasa bir veri kaynağıdır.

🚀 Bilgisayarımda Nasıl Çalıştırırım?
Projeyi kendi bilgisayarınızda açıp denemek isterseniz, aşağıdaki basit adımları sırasıyla izleyebilirsiniz:

📥 1. Adım: Projeyi Bilgisayarına İndir
Terminali aç ve şu komutu yazarak projeyi kopyala:
git clone https://github.com/samedoz24/recipe.git

📦 2. Adım: Gerekli Paketleri Yükle
Proje klasörünün içine gir ve gerekli kütüphaneleri indir:
cd recipe
npm install

▶️ 3. Adım: Uygulamayı Başlat
Her şey hazır! Şu komutu yaz:
npx expo start
(Not: Ekranda çıkan QR kodu telefonuna "Expo Go" indirerek okutabilir ve uygulamayı canlı test edebilirsin!)

📁 Proje Klasör Yapısı (İçerik Rehberi)
🖼️ assets
Uygulamanın ruhu olan JSON animasyonlarının (Lottie) ve görsel ikonların saklandığı klasördür.

🧩 components
Yemek kartları (MealItem), kategoriler ve özel butonlar gibi tekrar kullanılabilir yapı taşlarının bulunduğu yerdir.

📱 screens
Uygulamanın ana sayfalarını (Giriş, Kategoriler, Yemek Detayı, Favoriler, Alışveriş Listesi) temsil eden dosyalar.

💾 data & models
Yemeklerin nasıl modellendiği ve statik kategori bilgilerinin tutulduğu mimari katmandır.

🛠️ util
Firebase yapılandırma dosyası ve tarih/metin düzenleyici gibi yardımcı araçların merkezidir.

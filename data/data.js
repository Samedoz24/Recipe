class Category {
  constructor(id, title, color) {
    this.id = id;
    this.title = title;
    this.color = color;
  }
}

class Meal {
  constructor(
    id,
    categoryIds,
    title,
    affordability,
    complexity,
    imageUrl,
    duration,
    ingredients,
    steps,
    isGlutenFree,
    isVegan,
    isVegetarian,
    isLactoseFree
  ) {
    this.id = id;
    this.categoryIds = categoryIds;
    this.title = title;
    this.imageUrl = imageUrl;
    this.ingredients = ingredients;
    this.steps = steps;
    this.duration = duration;
    this.complexity = complexity;
    this.affordability = affordability;
    this.isGlutenFree = isGlutenFree;
    this.isVegan = isVegan;
    this.isVegetarian = isVegetarian;
    this.isLactoseFree = isLactoseFree;
  }
}

export const CATEGORIES = [
  new Category("c1", "İtalyan", "#f5428d"),
  new Category("c2", "Hızlı & Kolay", "#f54242"),
  new Category("c3", "Hamburger", "#f5a442"),
  new Category("c4", "Alman", "#f5d142"),
  new Category("c5", "Hafif & Sağlıklı", "#368dff"),
  new Category("c6", "Egzotik", "#41d95d"),
  new Category("c7", "Kahvaltı", "#9eecff"),
  new Category("c8", "Asya", "#b9ffb0"),
  new Category("c9", "Fransız", "#ffc7ff"),
  new Category("c10", "Yaz Lezzetleri", "#47fced"),
];

export const MEALS = [
  new Meal(
    "m1",
    ["c1", "c2"],
    "Domates Soslu Spagetti",
    "uygun",
    "basit",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg/800px-Spaghetti_Bolognese_mit_Parmesan_oder_Grana_Padano.jpg",
    20,
    [
      "4 Domates",
      "1 Yemek Kaşığı Zeytinyağı",
      "1 Soğan",
      "250g Spagetti",
      "Baharatlar",
      "Peynir (isteğe bağlı)",
    ],
    [
      "Domatesleri ve soğanı küçük parçalar halinde doğrayın.",
      "Suyu kaynatın ve içine tuz ekleyin.",
      "Spagettiyi kaynayan suya atın ve yaklaşık 10-12 dakika pişirin.",
      "Bu arada zeytinyağını bir tavada ısıtın ve doğranmış soğanı ekleyin.",
      "2 dakika kavurduktan sonra domates parçalarını ve baharatları ekleyin.",
      "Sos yaklaşık 10 dakika kaynadıktan sonra, sosu süzülmüş spagetti ile karıştırın.",
    ],
    false,
    true,
    true,
    true
  ),

  new Meal(
    "m2",
    ["c2"],
    "Tost Hawaii",
    "uygun",
    "basit",
    "https://cdn.pixabay.com/photo/2018/07/11/21/51/toast-3532016_1280.jpg",
    10,
    [
      "1 Dilim Beyaz Ekmek",
      "1 Dilim Jambon",
      "1 Dilim Ananas",
      "1-2 Dilim Peynir",
      "Tereyağı",
    ],
    [
      "Ekmeğin bir yüzüne tereyağı sürün.",
      "Üzerine sırasıyla jambon, ananas ve peyniri yerleştirin.",
      "Peynir eriyene kadar yaklaşık 10 dakika 200°C fırında pişirin.",
    ],
    false,
    false,
    false,
    false
  ),

  new Meal(
    "m3",
    ["c3"],
    "Klasik Hamburger",
    "pahalı",
    "basit",
    "https://cdn.pixabay.com/photo/2014/10/23/18/05/burger-500054_1280.jpg",
    45,
    [
      "300g Dana Kıyma",
      "1 Domates",
      "1 Salatalık",
      "1 Soğan",
      "Ketçap",
      "2 Hamburger Ekmeği",
    ],
    [
      "Kıymadan 2 adet köfte yapın.",
      "Köfteleri tavada veya ızgarada her iki tarafı için 4 dakika pişirin.",
      "Hamburger ekmeklerini hafifçe kızartın.",
      "Ekmeklerin içine ketçap sürün ve sırasıyla köfte, domates, salatalık ve soğanı ekleyin.",
    ],
    false,
    false,
    false,
    true
  ),

  new Meal(
    "m4",
    ["c4"],
    "Viyana Şnitzeli",
    "lüks",
    "orta",
    "https://cdn.pixabay.com/photo/2018/03/31/19/29/schnitzel-3279045_1280.jpg",
    60,
    [
      "8 Dana Pirzola",
      "4 Yumurta",
      "200g Galeta Unu",
      "100g Un",
      "300ml Tereyağı",
      "100g Bitkisel Yağ",
      "Limon Dilimleri",
    ],
    [
      "Etleri yaklaşık 2-4mm inceliğine gelene kadar dövün ve tuz, karabiber ile tatlandırın.",
      "Etleri sırasıyla una, çırpılmış yumurtaya ve galeta ununa bulayın.",
      "Tereyağı ve bitkisel yağı büyük bir tavada ısıtın.",
      "Şnitzelleri altın rengi olana kadar her iki tarafını da kızartın.",
      "Limon dilimleriyle servis yapın.",
    ],
    false,
    false,
    false,
    false
  ),

  new Meal(
    "m5",
    ["c2", "c5", "c10"],
    "Somon Salatası",
    "lüks",
    "basit",
    "https://cdn.pixabay.com/photo/2016/10/25/13/29/smoked-salmon-salad-1768890_1280.jpg",
    15,
    [
      "Arugula (Roka)",
      "Kuzu Kulağı",
      "Maydanoz",
      "Rezene",
      "200g Füme Somon",
      "Hardal",
      "Balzamik Sirke",
      "Zeytinyağı",
      "Tuz ve Karabiber",
    ],
    [
      "Yeşillikleri ve rezeneyi yıkayıp doğrayın.",
      "Somonları küp şeklinde kesin.",
      "Hardal, sirke ve zeytinyağını karıştırarak sosu hazırlayın.",
      "Salatayı, somonu ve sosu birleştirerek servis yapın.",
    ],
    true,
    false,
    true,
    true
  ),

  new Meal(
    "m6",
    ["c6", "c10"],
    "Portakallı Mus",
    "uygun",
    "zor",
    "https://cdn.pixabay.com/photo/2017/05/01/05/18/pastry-2274750_1280.jpg",
    240,
    [
      "4 Yaprak Jelatin",
      "150ml Portakal Suyu",
      "80g Şeker",
      "300g Yoğurt",
      "200g Krema",
      "Portakal Kabuğu Rendesi",
    ],
    [
      "Jelatini suda eritin.",
      "Portakal suyu ve şekeri kaynatıp jelatini ekleyin.",
      "Karışımı yoğurtla birleştirin.",
      "Kremayı çırpıp karışıma ekleyin ve dolapta en az 4 saat bekletin.",
    ],
    true,
    false,
    true,
    false
  ),

  new Meal(
    "m7",
    ["c7"],
    "Pankek",
    "uygun",
    "basit",
    "https://cdn.pixabay.com/photo/2018/07/10/21/23/pancake-3529653_1280.jpg",
    20,
    [
      "1,5 Bardak Un",
      "3,5 Çay Kaşığı Kabartma Tozu",
      "1 Çay Kaşığı Tuz",
      "1 Yemek Kaşığı Şeker",
      "1,25 Bardak Süt",
      "1 Yumurta",
      "3 Yemek Kaşığı Eritilmiş Tereyağı",
    ],
    [
      "Kuru malzemeleri bir kapta karıştırın.",
      "Ortasını havuz gibi açıp süt, yumurta ve tereyağını ekleyin.",
      "Tavayı ısıtıp hamurdan küçük porsiyonlar halinde dökün.",
      "Her iki tarafını da kızartın.",
    ],
    true,
    false,
    true,
    false
  ),

  new Meal(
    "m8",
    ["c8"],
    "Tavuk Köri",
    "pahalı",
    "orta",
    "https://cdn.pixabay.com/photo/2018/06/18/16/05/indian-food-3482749_1280.jpg",
    35,
    [
      "4 Tavuk Göğsü",
      "1 Soğan",
      "2 Diş Sarımsak",
      "1 Parça Zencefil",
      "4 Yemek Kaşığı Badem",
      "1 Çay Kaşığı Toz Biber",
      "500ml Hindistan Cevizi Sütü",
    ],
    [
      "Tavukları doğrayıp kızartın.",
      "Soğan, sarımsak ve zencefili püre haline getirip tavuklara ekleyin.",
      "Baharatları ve sütü ekleyip 10 dakika pişirin.",
    ],
    true,
    false,
    false,
    true
  ),

  new Meal(
    "m9",
    ["c9"],
    "Çikolatalı Sufle",
    "uygun",
    "zor",
    "https://cdn.pixabay.com/photo/2014/08/07/21/07/souffle-412785_1280.jpg",
    45,
    [
      "1 Tatlı Kaşığı Erimiş Tereyağı",
      "2 Yemek Kaşığı Şeker",
      "60g Bitter Çikolata",
      "1 Yemek Kaşığı Tereyağı",
      "1 Yemek Kaşığı Un",
      "4 Yemek Kaşığı Süt",
      "1 Tutam Tuz",
      "1 Çay Kaşığı Vanilya",
      "1 Büyük Yumurta Sarısı",
      "2 Büyük Yumurta Akı",
    ],
    [
      "Fırını 190°C ısıtın ve kalıpları yağlayın.",
      "Çikolata ve tereyağını benmari usulü eritin.",
      "Un, süt ve tuzu karıştırıp çikolataya ekleyin.",
      "Yumurta aklarını kar gibi olana kadar çırpın.",
      "Hepsini nazikçe birleştirip kalıplara dökün.",
      "12-15 dakika fırında pişirin.",
    ],
    true,
    false,
    true,
    false
  ),

  new Meal(
    "m10",
    ["c2", "c5", "c10"],
    "Kuşkonmaz Salatası",
    "lüks",
    "basit",
    "https://cdn.pixabay.com/photo/2018/04/09/18/26/asparagus-3304997_1280.jpg",
    30,
    [
      "Beyaz ve Yeşil Kuşkonmaz",
      "30g Çam Fıstığı",
      "300g Çeri Domates",
      "Salata Yeşillikleri",
      "Tuz, Karabiber ve Zeytinyağı",
    ],
    [
      "Kuşkonmazları yıkayıp soyun ve tuzlu suda haşlayın.",
      "Çam fıstıklarını yağsız tavada kavurun.",
      "Domatesleri ikiye bölün.",
      "Kuşkonmaz, domates ve yeşillikleri birleştirip sosla servis yapın.",
    ],
    true,
    true,
    true,
    true
  ),
];

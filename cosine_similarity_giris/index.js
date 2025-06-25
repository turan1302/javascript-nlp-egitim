/*
Süper seçim kanka! 🔥
**Cosine Similarity** çok temel ve güçlü bir araç — şimdi sana hem basit hem de geliştirici kafasıyla açıklıyorum:

---

## 🧠 COSINE SIMILARITY NEDİR?

### 📌 Tanım (Basitçe):

Cosine Similarity, **iki metnin birbirine ne kadar BENZEDİĞİNİ** ölçer.

Metinleri matematiksel olarak bir **vektöre** çeviririz (TF-IDF gibi), sonra iki vektör arasındaki **açıyı** ölçeriz.

* Eğer açı **küçükse** → metinler **benzer**
* Eğer açı **büyükse** → metinler **farklı**

Bu açıya `cos(θ)` üzerinden bakılır.

---

### 🔢 Matematiksel Formül:

$$
\cos(\theta) = \frac{A \cdot B}{||A|| \cdot ||B||}
$$

* `A` ve `B`: iki metin vektörü
* `A · B`: noktasal çarpım
* `||A||`: A'nın büyüklüğü (length)
* Sonuç **0 ile 1** arasında çıkar:

  * `1` → tamamen benzer
  * `0` → hiç benzemiyor

---

### 📦 Bizim kullanım senaryomuz:

Sen şunu yapacaksın:

> “Kullanıcının yazdığı yeni not, **eski hangi notlara benziyor**?”

Bunun için:

1. Tüm notları TF-IDF vektörlerine çevireceksin
2. Yeni notu da aynı şekilde vektöre çevir
3. Ardından Cosine Similarity hesapla
4. En yüksek skoru veren notları öner

---

### ✅ Şimdi ne yapalım?

İstersen hemen küçük bir örnekle başlayalım:

* 3 tane kısa metin
* Yeni bir kullanıcı cümlesi
* Cosine Similarity hesaplayacağız

Hazırım — başlatayım mı? 🔥

 */

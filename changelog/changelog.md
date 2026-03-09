<div style="max-width: 900px; margin: 0 auto; padding: 0 16px;">

# 📋 Changelog

Bu projedeki tüm kayda değer değişiklikler bu dosyada belgelenecektir.

---

## [Unreleased]

### <span style="color:#22c55e;">[2.1.4+128]</span>

---

### Added

#### Belgelerim Sekmesi
- My_Drawer'a Belgelerim sekmesi eklendi buradan kullanıcı daha önce analiz etmiş olduğu tüm belgeleri görebiliyor. İsterse bu ekran üzerinden yeni dosya yüklemesi gerçekleştirebiliyor ve dosya analizlerine bu ekran üzerinden ulaşım sağlayabiliyor. Yüklemiş olduğu belgenin analizi yoksa yine bu ekran üzerinden analiz edebiliyor.

#### Dosya Hash & Duplicate Kontrolü
- Kullanıcı bir belge yüklediği zaman bu belge hashleniyor ve firebase üzerine yazılıyor
- Eğer kullanıcı daha önce yüklemiş olduğu bir belgeyi bir kez daha yüklemek isterse bu hash kontrol ediliyor. Eğer hash aynı çıkarsa kullanıcı bu belgeyi yükleyemiyor

#### Yeni Özellikler
- Geçmiş Sohbetler ekranına arama çubuğu eklendi

- Kullanıcıya gönderilen su takip bildirimlerinin sesi değişti:
  <div>
    <audio controls>
      <source src="../assets/notifications/water_notification.mp3" type="audio/mpeg" />
      Tarayıcın audio etiketini desteklemiyor.
    </audio>
  </div>

- IOS'da da, uygulama güncellendiğinde Android deki gibi uygulama güncelleme dialogu geliyor artık kullanıcının karşısına:
  <div style="margin: 12px 0;">
    <img src="dialog.webp" alt="Güncelleme Dialog" width="220" style="border-radius: 4%;"/>
  </div>

- Kullanıcıya expert modda kalan soru sayısı hakkı gösteriliyor. Artık expertUsage ve normalUsage olarak ayrılıyor veritabanında:
  <div style="margin: 12px 0;">
    <img src="Screenshot_1767023633.webp" alt="Expert Usage Gösterimi" width="220" style="border-radius: 4%;"/>
  </div>


- Kullanıcıdan yorum istemek amacıyla kullanıcının karşısına şu şekilde bir dialog çıkarıyoruz;
  <div style="margin: 12px 0;">
    <img src="rate.webp" alt="Güncelleme Dialog" width="220" style="border-radius: 4%;"/>
  </div>
---

#### 📊 Upload Akışı (Hash + Dedup + Storage)

<div align="center" style="margin: 12px 0 18px 0;">
  <a href="mermaid.svg">
    <img src="mermaid.svg" alt="Upload sequence diagram" style="max-width: 50%; height: auto; display: block;" />
  </a>
</div>

---

#### Belge İsimlendirme

Kullanıcının yüklemiş olduğu belgenin ismi bu ekranda:
- Eğer analiz olmadan direkt yüklerse → dosyanın telefondaki ismi
- Eğer analiz ettiyse → analizde dosya için oluşturulan isim

---

#### Belgelerim Ekranı Özellikleri

<table>
  <tr>
    <td style="vertical-align: top; width: 70%;">
      <div style="display:flex; align-items:flex-start; gap:16px;">
        <div style="flex:1;">
          <strong>Bu ekran şunları içermektedir:</strong><br><br>
          • Bütün belgeleri görüntüleme<br>
          • PDF / görsel ayrımı<br>
          • İlgili belgeye tıklayınca açılan show bottom sheet modal<br>
          • Dosyanın analizi varsa açılan bottom sheet içerisinde "Analize git" seçeneği<br>
          • Dosyanın analizi yoksa "Analiz et" butonu<br>
          • Dosyayı silme seçeneği<br>
          • Yeni → Eski sıralama<br>
          • Dosyalarda arama gerçekleştirme<br>
          • Kullanıcı dosya yüklediği zaman skeletonizer<br>
          • Kullanıcı ilk kez bu sayfaya girdiği zaman skeletonizer
        </div>
      </div>
    </td>
    <td style="vertical-align: top; width: 30%;">
      <a href="Screenshot_1766132504.webp">
        <img src="Screenshot_1766132504.webp" alt="Belgelerim ekranı" style="width: 220px; height: auto; display:block;" />
      </a>
    </td>
  </tr>
</table>

---

#### PDF ve Resim Görüntüleme

<div style="display:flex; gap:12px; align-items:flex-start; flex-wrap: wrap;">
  <img src="image copy 4.webp" alt="PDF Görüntüleme 1" width="220" style="border-radius: 4%;"/>
  <img src="image copy 2.webp" alt="PDF Görüntüleme 2" width="220" style="border-radius: 4%;"/>
  <img src="image copy.webp" alt="PDF Görüntüleme 3" width="220" style="border-radius: 4%;"/>
  <img src="image.webp" alt="Resim Görüntüleme" width="220" style="border-radius: 4%;"/>
</div>

---

#### Yeni Eklenen Paketler

| Paket | Versiyon |
|-------|----------|
| [crypto](https://pub.dev/packages/crypto) | ^3.0.7 |
| [cached_network_image](https://pub.dev/packages/cached_network_image) | ^3.4.1 |
| [skeletonizer](https://pub.dev/packages/skeletonizer) | ^2.1.2 |
| [firebase_storage](https://pub.dev/packages/firebase_storage) | ^12.4.10 |
| [syncfusion_flutter_pdfviewer](https://pub.dev/packages/syncfusion_flutter_pdfviewer) | ^29.2.7 |
| [in_app_review](https://pub.dev/packages/in_app_review) | ^2.0.10 |

---

### Changed

- Kullanıcının yüklemiş olduğu her türlü dosya Firebase Storage'da saklanıyor

- Firebase Storage kullanımını azaltmak için (maliyeti optimize etmek için) kullanıcının yüklemiş olduğu belgeler her görüntülemede download etmek yerine SharedPreferences ile kullanıcının cihazına kaydediliyor:
  - Kullanıcı uygulamayı her yeniden açtığında bu cache okunuyor Storage üzerinden okuma gerçekleştirilmiyor
  - Kullanıcı ancak ve ancak uygulamadaki hesabından çıkış yaparsa bu bilgiler cache'den siliniyor

- AnalysisResultScreen Renkleri değiştirildi

- Belirli yaştaki kullanıcıların kalori takibi yapması engellendi. Sebebi: [kaynak](https://www.quora.com/Being-under-18-restricts-my-access-to-websites-for-calculating-caloric-maintenance-Can-the-Shofield-equation-x-1-26-be-relied-upon-as-a-valid-method-for-determining-caloric-maintenance-for-a-15-year-old-like-me)

<div style="display:flex; gap:12px; align-items:flex-start; flex-wrap: wrap; margin: 12px 0;">
  <img src="image copy 6.webp" alt="Kalori Takibi Yaş Uyarısı 1" width="220" style="border-radius: 4%;"/>
  <img src="image copy 7.webp" alt="Kalori Takibi Yaş Uyarısı 2" width="220" style="border-radius: 4%;"/>
</div>


- Tüm kullanıcılar artık anonim bir şekilde trackerları kullanabiliyor ancak 3 kez herhangi bir işlem yaparsa karşısına hesabını yedeklemesi için bir dialog çıkıyor:
  <div style="margin: 12px 0;">
    <img src="Screenshot_1766132504.webp" alt="Hesap Yedekleme Dialog" style="width: 220px; height: auto; display:block;" />
  </div>

---

### Fixed

<table>
  <tr>
    <td style="vertical-align: top; width: 70%;">
      <div style="display:flex; align-items:flex-start; gap:16px;">
        <div style="flex:1;">
          <strong>Düzeltilen Hatalar:</strong><br><br>
          • Kullanıcı PDF analizi yaptıktan sonra, eski sohbetler ekranından görüntülerken oluşan parse hatası düzeltildi.<br><br>
          • Eski yapıda kalan <code>AnalysisDetailedScreen</code> kaldırıldı; PDF analizinden sonra açılan <code>AnalysisResultScreen</code> public yapıldı ve artık bu ekran kullanılıyor.
        </div>
      </div>
    </td>
    <td style="vertical-align: top; width: 30%;">
      <a href="Screenshot_1766133905.webp">
        <img src="Screenshot_1766133905.webp" alt="PDF Analiz Düzeltmesi" style="width: 220px; height: auto; display:block;" />
      </a>
    </td>
  </tr>
</table>

---

</div>

---
title: "API hataları kullanıcı deneyiminin bir parçasıdır"
description: "İyi hata tasarımı yalnızca doğru HTTP kodunu seçmek değildir; mobil uygulamanın kullanıcıya güvenilir bir sonraki adım sunabilmesini sağlamaktır."
slug: "api-hatalari-kullanici-deneyiminin-parcasidir"
publishedAt: 2026-07-15
tags: ["api", "backend", "mobil", "ux"]
category: "Backend ve API"
heroImage: "/blog/api-hata-tasarimi.png"
heroAlt: "Dağınık hata mesajlarının düzenli ve eyleme dönük bir API hata sözleşmesine dönüştüğü diyagram"
featured: false
draft: false
sources:
  - label: "RFC 9457 — Problem Details for HTTP APIs"
    url: "https://www.rfc-editor.org/rfc/rfc9457.html"
    note: "HTTP API hataları için makinece okunabilir standart problem ayrıntısı formatını tanımlar."
  - label: "RFC 9110 — HTTP Semantics"
    url: "https://www.rfc-editor.org/rfc/rfc9110.html"
    note: "HTTP durum kodlarının anlamını ve istemci-sunucu semantiğini tanımlar."
---

Bir API’nin başarılı cevabı geliştirici deneyimini gösterir. Hata cevabı ise ürünün ne kadar güvenilir hissettirdiğini.

Mobil uygulamada gördüğümüz “Bir hata oluştu” mesajı çoğu zaman tasarım eksikliği değilmiş gibi ele alınır. Oysa bu mesajın arkasında istemcinin anlayamadığı bir backend cevabı, ayırt edilemeyen hata türleri ve belirsiz bir sonraki adım vardır.

**Hata modeli, API sözleşmesinin kenarında duran teknik bir ayrıntı değil; kullanıcı deneyiminin görünmeyen altyapısıdır.**

## HTTP kodu gerekli ama yeterli değil

`400`, `401`, `404` veya `500` seçmek önemli. İstemci hatanın genel sınıfını buradan anlar. Fakat tek başına `400 Bad Request`, mobil uygulamaya kullanıcının neyi düzeltebileceğini söylemez.

Örneğin kayıt ekranında aynı `400` şu durumların hepsini temsil edebilir:

- E-posta biçimi geçersiz.
- E-posta daha önce kullanılmış.
- Parola politikayı karşılamıyor.
- İstek artık desteklenmeyen bir uygulama sürümünden geliyor.

Bunların kullanıcıya gösterilecek mesajı ve arayüzde yapılacak işlem aynı değildir. Birinde e-posta alanını işaretlemek, birinde giriş sayfasına yönlendirmek, diğerinde güncelleme ekranı açmak gerekebilir.

RFC 9110 durum kodlarının semantiğini tanımlar; fakat alanımıza özel kararları bizim sözleşmemiz tamamlar.

## Makineye kod, insana mesaj

Sağlam bir hata cevabında en az iki ayrı katman bulunmasını tercih ederim:

```json
{
  "type": "https://api.example.com/problems/email-already-used",
  "title": "Bu e-posta kullanılıyor",
  "status": 409,
  "code": "EMAIL_ALREADY_USED",
  "detail": "Bu adresle daha önce hesap oluşturulmuş.",
  "traceId": "01J...",
  "actions": ["SIGN_IN", "RESET_PASSWORD"]
}
```

`code`, istemcinin güvenilir biçimde dallanmasını sağlar. `title` ve `detail`, kullanıcıya veya log inceleyen ekibe bağlam verir. `traceId`, mobilde görülen olayla backend log’unu eşleştirir. `actions` ise sözleşmeye uygunsa olası sonraki adımları ifade edebilir.

RFC 9457’nin tanımladığı Problem Details biçimi; `type`, `title`, `status`, `detail` ve `instance` gibi ortak alanlarla bu ihtiyaca standart bir temel sunuyor. Alana özel alanlar da formatı genişletebilir.

Burada kritik kural şu: istemci, ekranda gösterilen Türkçe metni parse ederek karar vermemeli. Metin değişebilir; kararlı hata kodu değişmemelidir.

## Hata, kullanıcının yapabileceği şeye göre sınıflanmalı

Teknik kök neden kadar kullanıcının eylemi de önemlidir. Pratikte hataları şu gözle gruplamak faydalı olur:

### Kullanıcı düzeltebilir

Form doğrulama hataları buna girer. Hangi alanın neden geçersiz olduğu açıkça dönmeli. Arayüz ilgili alana odaklanmalı ve girilmiş diğer veriyi kaybetmemelidir.

### Tekrar denenebilir

Geçici ağ sorunu, rate limit veya kısa süreli servis kesintisi buna örnektir. İstemci otomatik tekrar deneyecekse istek idempotent olmalı, exponential backoff kullanılmalı ve sonsuz döngü oluşmamalıdır. Kullanıcıya da “neden” ve “ne zaman tekrar” bilgisi mümkün olduğunca verilmelidir.

### Yeniden kimlik doğrulama gerekir

Token yenileme arka planda çözülebiliyorsa kullanıcı bölünmemeli. Çözülemiyorsa oturumun neden sona erdiği anlaşılır olmalı ve tamamlanmamış işlem mümkünse korunmalıdır.

### Kullanıcı çözemez

Sunucu hatasını kullanıcıya teknik ayrıntıyla dökmek güvenlik ve deneyim açısından yanlıştır. Buna karşılık yalnızca “hata” demek de destek ekibini kör bırakır. Güvenli bir genel mesaj ve paylaşılabilir olay kimliği daha kullanışlıdır.

## Offline ile sunucu hatasını ayırmak gerekir

Mobilde her başarısız istek backend hatası değildir. Cihaz offline olabilir, DNS çözülemeyebilir, bağlantı ortasında kesilebilir veya istek timeout’a uğrayabilir. Sunucudan hiç cevap alınmayan durumla sunucunun `503` döndürdüğü durum aynı değildir.

Bu ayrım kullanıcı metnini de değiştirir:

- Offline: “İnternet bağlantını kontrol et.”
- Timeout: “İstek beklenenden uzun sürdü, tekrar deneyebilirsin.”
- Bakım/kesinti: “Hizmet şu anda geçici olarak kullanılamıyor.”
- Form hatası: “Telefon numarası ülke koduyla başlamalı.”

Her hata için ayrı şiir yazmak gerekmiyor. Ancak doğru eyleme yönlendiren sınırlı ve tutarlı bir mesaj sistemi gerekiyor.

## Sözleşmeyi test etmeden güvenilmez

Hata cevapları dokümana yazılıp unutulmamalı. Contract testleri ile durum kodu, içerik tipi ve zorunlu alanlar doğrulanabilir. Mobil tarafta da her hata sınıfının doğru UI durumuna dönüştüğü test edilmelidir.

Özellikle şu senaryoları kontrol ederim:

1. Bilinmeyen bir hata kodunda güvenli fallback var mı?
2. Eski uygulama sürümü yeni bir hata alanını görmezden gelebiliyor mu?
3. `detail` içinde kişisel veya hassas veri sızıyor mu?
4. Aynı hata log, analitik ve kullanıcı mesajında ortak bir olay kimliğiyle izlenebiliyor mu?
5. Retry yalnızca güvenli isteklerde ve sınırlı sayıda mı yapılıyor?

## İyi hata tasarımı güven üretir

Kullanıcı sistemin hiç hata vermemesini beklemeyebilir. Fakat ne olduğunu anlamayı, emeğini kaybetmemeyi ve ne yapabileceğini bilmeyi bekler.

Backend’in görevi yalnızca hatayı raporlamak değil; istemcinin doğru deneyimi kurabilmesi için yeterli, kararlı ve güvenli bağlamı sağlamaktır. Bu yüzden API hata modeli, endpoint tasarımının sonunda eklenen bir detay değil, en başta konuşulması gereken ürün kararıdır.

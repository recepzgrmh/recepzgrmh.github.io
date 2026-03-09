import os
from PIL import Image

# Taranacak ana dizin (scriptin çalıştığı yer)
root_dir = "."

# İşlem yapılmayacak (hariç tutulan) klasörler
exclude_dirs = {".git", "_bmad"}

# Dönüştürülecek hedef uzantılar
target_extensions = {".jpg", ".jpeg", ".png"}

def convert_and_cleanup():
    converted_count = 0
    
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Hariç tutulan klasörleri atla
        dirnames[:] = [d for d in dirnames if d not in exclude_dirs]
        
        for filename in filenames:
            # Dosya uzantısını kontrol et
            ext = os.path.splitext(filename)[1].lower()
            
            if ext in target_extensions:
                original_path = os.path.join(dirpath, filename)
                
                # Yeni .webp dosya yolunu oluştur
                new_filename = os.path.splitext(filename)[0] + ".webp"
                webp_path = os.path.join(dirpath, new_filename)
                
                try:
                    # Resmi aç ve webp olarak kaydet
                    with Image.open(original_path) as img:
                        # Bazı PNG'lerin renk paleti sorunlarını önlemek için RGBA'ya çevir
                        if img.mode not in ("RGB", "RGBA"):
                            img = img.convert("RGBA")
                        
                        img.save(webp_path, "webp")
                    
                    # İşlem başarılıysa orijinal dosyayı sil
                    os.remove(original_path)
                    print(f"✅ Dönüştürüldü ve eski dosya silindi: {original_path} -> {webp_path}")
                    converted_count += 1
                    
                except Exception as e:
                    print(f"❌ Hata oluştu ({original_path}): {e}")

    print(f"\n🎉 İşlem tamamlandı! Toplam {converted_count} adet dosya başarıyla .webp formatına dönüştürüldü.")

if __name__ == "__main__":
    convert_and_cleanup()
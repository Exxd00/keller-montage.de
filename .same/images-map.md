# خريطة الصور - Keller Montage

## هيكل تسمية الصور

### الأقسام الرئيسية
| اسم الملف | القسم | الوصف |
|-----------|-------|-------|
| `hero-desktop.jpg` | HeroSection | صورة البطل (ديسكتوب فقط) |
| `vorher-nachher-vorher.jpg` | BeforeAfterSection | صورة "قبل" |
| `vorher-nachher-nachher.jpg` | BeforeAfterSection | صورة "بعد" |
| `quality-detail.jpg` | QualitySection | صورة تفاصيل الجودة |
| `team-professional.jpg` | WhyUsSection | صورة الفريق المحترف |

### مشاريع الكيشن (ProjectsSection)

#### المشروع 1 - IKEA Küchenmontage
| اسم الملف | المرحلة |
|-----------|---------|
| `projekt1-ikea-vorher.jpg` | قبل (Vorher) |
| `projekt1-ikea-montage.jpg` | أثناء التركيب (Montage) |
| `projekt1-ikea-nachher.jpg` | بعد (Nachher) |

#### المشروع 2 - Küchenmontage in kleiner Wohnung
| اسم الملف | المرحلة |
|-----------|---------|
| `projekt2-wohnung-vorher.jpg` | قبل (Vorher) |
| `projekt2-wohnung-montage.jpg` | أثناء التركيب (Montage) |
| `projekt2-wohnung-nachher.jpg` | بعد (Nachher) |

#### المشروع 3 - Familienküche Montage
| اسم الملف | المرحلة |
|-----------|---------|
| `projekt3-familie-vorher.jpg` | قبل (Vorher) |
| `projekt3-familie-montage.jpg` | أثناء التركيب (Montage) |
| رابط خارجي (same-assets) | بعد (Nachher) |

## نمط التسمية

```
{قسم/مشروع}-{وصف}-{مرحلة}.{امتداد}
```

**أمثلة:**
- `projekt1-ikea-vorher.jpg` → مشروع 1، ايكيا، صورة قبل
- `vorher-nachher-nachher.jpg` → قسم قبل/بعد، صورة بعد
- `quality-detail.jpg` → قسم الجودة، تفاصيل

## الموقع
جميع الصور في: `/public/images/`

## ملاحظات
- عند إضافة مشروع جديد: استخدم النمط `projekt{N}-{اسم}-{مرحلة}.jpg`
- المراحل: `vorher`, `montage`, `nachher`

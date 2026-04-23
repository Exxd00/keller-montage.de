# Keller Montage Project Todos

## قيد التنفيذ
- [ ] **إعداد Resend للإيميلات** - يجب على المستخدم:
  1. إنشاء حساب في https://resend.com
  2. الحصول على API Key من https://resend.com/api-keys
  3. إضافة النطاق `keller-montage.de` وتأكيده
  4. تحديث ملف `.env.local` بالمفتاح الصحيح

## مكتمل
- [x] Import repository from GitHub (Apr 23, 2026)
- [x] Install dependencies with bun
- [x] Start development server on Same.new
- [x] إنشاء ملف `.env.local`
- [x] تحسين رسائل الخطأ في API
- [x] إصلاح مشكلة التمرير عند الضغط على "Weiter" في النموذج (v4)
- [x] **إضافة نافذة تأكيد للاتصال والواتساب** (Apr 23, 2026)
  - تم إنشاء مكون `contact-confirmation-dialog.tsx`
  - عند الضغط على زر الاتصال/الواتساب تظهر نافذة تأكيد
  - التتبع يتم فقط بعد تأكيد المستخدم
- [x] **إضافة تتبع GA4 للأحداث الثلاثة الرئيسية** (Apr 23, 2026)
  - `phone_call_confirmed` - تأكيد الاتصال
  - `whatsapp_confirmed` - تأكيد الواتساب
  - صفحة الشكر (thank_you_page)
- [x] **تحديث Google Sheets Script** (Apr 23, 2026)
  - إضافة عمود Kontaktart (نوع التواصل)
  - إضافة عمود GCLID للتتبع
  - إضافة عمود Bewertung (تقييم العميل)
  - السكربت موجود في `.same/google-sheets-script.js`

## ملاحظات هامة

### إعداد Google Sheets:
1. افتح Google Sheets جديد
2. اذهب إلى Extensions → Apps Script
3. انسخ السكربت من `.same/google-sheets-script.js`
4. احفظ وانشر كـ Web App
5. انسخ URL وأضفه في `.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_SHEETS_URL=https://script.google.com/...
   ```

### الأحداث الرئيسية في GA4:
1. **📞 phone_call_confirmed** - عندما يؤكد المستخدم الاتصال
2. **💬 whatsapp_confirmed** - عندما يؤكد المستخدم الواتساب
3. **📝 thank_you_page** - عند إرسال النموذج بنجاح

### للإصلاح مشكلة الإيميل:

1. **احصل على Resend API Key:**
   - اذهب إلى https://resend.com/api-keys
   - أنشئ مفتاح جديد
   - انسخ المفتاح

2. **أضف النطاق في Resend:**
   - اذهب إلى https://resend.com/domains
   - أضف `keller-montage.de`
   - أضف سجلات DNS المطلوبة

3. **حدّث `.env.local`:**
   ```
   RESEND_API_KEY=re_your_actual_key_here
   ```

4. **أعد تشغيل السيرفر**

# إضافة حقول الدفع إلى Appwrite

هذا السكريبت يضيف الحقول المطلوبة لنظام الدفع إلى collection "subscribers" في Appwrite.

## الخطوات المطلوبة:

### 1. الحصول على API Key من Appwrite

1. افتح Appwrite Console: https://fra.cloud.appwrite.io/console
2. اذهب إلى Project: **Bousla-v4**
3. من القائمة الجانبية، اختر **"Settings"** (الإعدادات)
4. اختر **"API Keys"**
5. اضغط على **"Create API Key"**
6. أدخل الإعدادات التالية:
   - **Name**: Payment Setup Script
   - **Expiration**: Never (أو اختر تاريخ بعيد)
   - **Scopes**: اختر:
     - ✅ `databases.read`
     - ✅ `databases.write`
7. اضغط **"Create"**
8. **انسخ الـ API Key** (ستظهر مرة واحدة فقط!)

### 2. إضافة API Key إلى السكريبت

افتح ملف `add-payment-attributes.js` وابحث عن السطر:

```javascript
.setKey('standard_c2a3e7f6c2c9e1d4c2b8a5f3e1d9c7b5a3f1e9d7c5b3a1f9e7d5c3b1a9f7e5d3b1');
```

واستبدله بـ API Key الذي نسخته:

```javascript
.setKey('YOUR_API_KEY_HERE');
```

### 3. تشغيل السكريبت

في Terminal، نفذ الأوامر التالية:

```bash
# تثبيت المكتبات المطلوبة
npm install

# تشغيل السكريبت
npm run add-payment-fields
```

أو مباشرة:

```bash
npm install && node add-payment-attributes.js
```

### 4. التحقق من النجاح

إذا نجح السكريبت، ستظهر رسالة:

```
🎉 All payment attributes have been added successfully!
📋 Summary:
   - paymentMethod (String, 100 chars, optional)
   - paymentProofId (String, 100 chars, optional)

✨ You can now use the payment features in your application!
```

## الحقول التي سيتم إضافتها:

1. **paymentMethod** (String, 100 chars, optional)
   - يحفظ طريقة التحويل (محفظة أو حساب بنكي/انستا باي)

2. **paymentProofId** (String, 100 chars, optional)
   - يحفظ معرف صورة إثبات التحويل في Appwrite Storage

## ملاحظات مهمة:

- ⚠️ **لا تشارك API Key مع أحد**
- ⚠️ يمكنك حذف API Key بعد تشغيل السكريبت من Appwrite Console
- ✅ السكريبت آمن ويتحقق من وجود الحقول قبل إضافتها
- ✅ إذا كانت الحقول موجودة بالفعل، سيتخطاها السكريبت

## في حالة حدوث خطأ:

إذا ظهرت رسالة خطأ، تأكد من:
1. ✅ API Key صحيح ومنسوخ بالكامل
2. ✅ API Key له صلاحيات `databases.read` و `databases.write`
3. ✅ معرفات Database و Collection صحيحة
4. ✅ اتصالك بالإنترنت يعمل

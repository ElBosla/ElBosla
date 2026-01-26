const sdk = require('node-appwrite');

// --- إعدادات الاتصال ---
const PROJECT_ID = '6971430c00318957e6d7';
const API_KEY = 'standard_527ce4b84ec6fc871c44da70372d48ece23ef25159e2085ec2a8d779acc63158c37656f92c1c570827774b61a097bfc8335a230ba02e1dfa1df8cd0ba950f853a3899bdd417076d2bc75759b6d2bfe1775c3c5ea1f47a87548daff6c1fa456ab526da4423435bcedbd6fc23de1324b710aab2acf6a076f02ab8382f5f6229410';
const DATABASE_ID = '6971454f002823a65775';
const COLLECTION_ID = 'subscribers';

const client = new sdk.Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new sdk.Databases(client);

async function addAttribute(name, size = 255, required = false, defaultValue = null, isArray = false) {
    try {
        console.log(`⏳ جاري محاولة إضافة حقل: ${name}...`);
        await databases.createStringAttribute(
            DATABASE_ID,
            COLLECTION_ID,
            name,
            size,
            required,
            defaultValue,
            isArray
        );
        console.log(`✅ تم إضافة حقل ${name} بنجاح.`);
    } catch (error) {
        if (error.message.includes('already exists')) {
            console.log(`ℹ️ حقل ${name} موجود بالفعل.`);
        } else {
            console.error(`❌ خطأ في إضافة ${name}:`, error.message);
        }
    }
}

async function runSetup() {
    console.log('🚀 بدء تحديث هيكل قاعدة البيانات...');

    await addAttribute('paymentStatus', 20, false, 'pending', false);
    await addAttribute('courses', 255, false, null, true);
    await addAttribute('watchedVideos', 255, false, null, true);

    console.log('\n✨ انتهى فحص الهيكل.');
}

runSetup();

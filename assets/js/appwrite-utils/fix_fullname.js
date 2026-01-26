const sdk = require('node-appwrite');

const client = new sdk.Client();
const databases = new sdk.Databases(client);

const API_KEY = 'standard_527ce4b84ec6fc871c44da70372d48ece23ef25159e2085ec2a8d779acc63158c37656f92c1c570827774b61a097bfc8335a230ba02e1dfa1df8cd0ba950f853a3899bdd417076d2bc75759b6d2bfe1775c3c5ea1f47a87548daff6c1fa456ab526da4423435bcedbd6fc23de1324b710aab2acf6a076f02ab8382f5f6229410';

const PROJECT_ID = '6971430c00318957e6d7';
const DATABASE_ID = '6971454f002823a65775';
const COLLECTION_ID = 'trainees';

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

async function fixFullNameAttribute() {
    console.log('🔧 جاري إصلاح عمود fullName...\n');

    try {
        // 1. حذف العمود القديم
        console.log('⏳ حذف العمود القديم (fullName)...');
        await databases.deleteAttribute(DATABASE_ID, COLLECTION_ID, 'fullName');
        console.log('✅ تم الحذف');

        // 2. الانتظار قليلاً للتأكد من اكتمال الحذف
        console.log('⏳ انتظار 3 ثوانٍ...');
        await new Promise(r => setTimeout(r, 3000));

        // 3. إنشاء العمود الجديد بالحجم الصحيح
        console.log('⏳ إنشاء العمود الجديد بحجم 128 حرف...');
        await databases.createStringAttribute(
            DATABASE_ID,
            COLLECTION_ID,
            'fullName',
            128,  // الحجم الصحيح
            true  // required
        );
        console.log('✅ تم الإنشاء بنجاح');

        console.log('\n🎉 تم إصلاح المشكلة! يمكنك الآن تجربة إرسال النموذج.');

    } catch (error) {
        console.error('❌ حدث خطأ:', error.message);
        console.log('\n⚠️ إذا استمرت المشكلة، قم بالتالي يدوياً:');
        console.log('   1. افتح Appwrite Console > trainees collection');
        console.log('   2. اذهب إلى Attributes');
        console.log('   3. احذف العمود "fullName"');
        console.log('   4. أنشئ عمود جديد: fullName (String, Size: 128, Required)');
    }
}

fixFullNameAttribute();

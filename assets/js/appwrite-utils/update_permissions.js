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

async function updatePermissions() {
    console.log('🔐 جاري تحديث صلاحيات Collection "trainees"...\n');

    try {
        await databases.updateCollection(
            DATABASE_ID,
            COLLECTION_ID,
            COLLECTION_ID, // name
            [
                sdk.Permission.create(sdk.Role.any()),      // أي شخص يمكنه التقديم
                sdk.Permission.read(sdk.Role.any()),        // أي شخص يمكنه القراءة (للأدمن)
                sdk.Permission.update(sdk.Role.any()),      // أي شخص يمكنه التحديث (للأدمن)
                sdk.Permission.delete(sdk.Role.any())       // أي شخص يمكنه الحذف (للأدمن)
            ],
            false, // documentSecurity (استخدام صلاحيات Collection)
            true   // enabled
        );

        console.log('✅ تم تحديث الصلاحيات بنجاح!');
        console.log('\n📋 الصلاحيات الحالية:');
        console.log('   - Create: Any (أي شخص)');
        console.log('   - Read: Any (أي شخص)');
        console.log('   - Update: Any (أي شخص - للأدمن)');
        console.log('   - Delete: Any (أي شخص - للأدمن)');
        console.log('\n💡 الآن يمكن للأدمن إدارة البيانات بالكامل.');

    } catch (error) {
        console.error('❌ فشل التحديث:', error.message);
        console.log('\n⚠️ قم بالتحديث يدوياً:');
        console.log('   1. افتح Appwrite Console > trainees');
        console.log('   2. Settings > Permissions');
        console.log('   3. أضف: Users - Read, Update, Delete');
    }
}

updatePermissions();

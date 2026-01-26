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

// الأعمدة التي تحتاج إعادة إنشاء
const ATTRIBUTES_TO_FIX = [
    'email',
    'mobile',
    'level',
    'package',
    'status',
    'githubLink',
    'cvLink',
    'reason'
];

async function deleteAndRecreate() {
    console.log('🔧 جاري إصلاح جميع الأعمدة الخاطئة...\n');

    // الخطوة 1: حذف الأعمدة الخاطئة
    console.log('📝 المرحلة 1: حذف الأعمدة الخاطئة\n');
    for (const key of ATTRIBUTES_TO_FIX) {
        try {
            process.stdout.write(`⏳ حذف ${key}... `);
            await databases.deleteAttribute(DATABASE_ID, COLLECTION_ID, key);
            console.log('✅');
            await new Promise(r => setTimeout(r, 500));
        } catch (error) {
            console.log(`⚠️ (${error.message})`);
        }
    }

    console.log('\n⏳ انتظار 5 ثوانٍ للتأكد من اكتمال الحذف...\n');
    await new Promise(r => setTimeout(r, 5000));

    // الخطوة 2: إعادة إنشاء الأعمدة بالإعدادات الصحيحة
    console.log('📝 المرحلة 2: إعادة إنشاء الأعمدة بالإعدادات الصحيحة\n');

    const attributes = [
        { type: 'email', key: 'email', required: true },
        { type: 'string', key: 'mobile', size: 20, required: false },
        { type: 'string', key: 'level', size: 64, required: true },
        { type: 'string', key: 'package', size: 64, required: true },
        { type: 'string', key: 'status', size: 32, required: true },
        { type: 'url', key: 'githubLink', required: true },
        { type: 'url', key: 'cvLink', required: false },
        { type: 'string', key: 'reason', size: 2000, required: true }
    ];

    for (const attr of attributes) {
        try {
            process.stdout.write(`⏳ إنشاء ${attr.key}... `);

            if (attr.type === 'string') {
                await databases.createStringAttribute(
                    DATABASE_ID,
                    COLLECTION_ID,
                    attr.key,
                    attr.size,
                    attr.required
                );
            } else if (attr.type === 'email') {
                await databases.createEmailAttribute(
                    DATABASE_ID,
                    COLLECTION_ID,
                    attr.key,
                    attr.required
                );
            } else if (attr.type === 'url') {
                await databases.createUrlAttribute(
                    DATABASE_ID,
                    COLLECTION_ID,
                    attr.key,
                    attr.required
                );
            }

            console.log('✅');
            await new Promise(r => setTimeout(r, 1000));

        } catch (error) {
            console.log(`❌ (${error.message})`);
        }
    }

    console.log('\n🎉 تم الانتهاء من الإصلاح!');
    console.log('\n💡 للتحقق من النتيجة، شغّل: node check_attributes.js');
}

deleteAndRecreate();

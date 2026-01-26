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

// التعريف الصحيح لجميع الأعمدة المطلوبة
const EXPECTED_ATTRIBUTES = {
    'fullName': { type: 'string', size: 128, required: true },
    'email': { type: 'email', required: true },
    'mobile': { type: 'string', size: 20, required: false },
    'track': { type: 'string', size: 64, required: true },
    'level': { type: 'string', size: 64, required: true },
    'package': { type: 'string', size: 64, required: true },
    'status': { type: 'string', size: 32, required: true },
    'githubLink': { type: 'url', required: true },
    'cvLink': { type: 'url', required: false },
    'reason': { type: 'string', size: 2000, required: true },
    'appliedAt': { type: 'datetime', required: true }
};

async function checkAllAttributes() {
    console.log('🔍 جاري فحص جميع الأعمدة في Collection "trainees"...\n');

    try {
        // جلب معلومات الـ Collection
        const collection = await databases.getCollection(DATABASE_ID, COLLECTION_ID);
        const existingAttributes = collection.attributes;

        console.log(`📊 عدد الأعمدة الموجودة: ${existingAttributes.length}\n`);

        const issues = [];
        const missing = [];

        // فحص كل عمود متوقع
        for (const [key, expected] of Object.entries(EXPECTED_ATTRIBUTES)) {
            const existing = existingAttributes.find(attr => attr.key === key);

            if (!existing) {
                missing.push(key);
                console.log(`❌ ${key}: غير موجود`);
                continue;
            }

            let hasIssue = false;
            let issueDetails = [];

            // فحص النوع
            if (existing.type !== expected.type) {
                hasIssue = true;
                issueDetails.push(`النوع خاطئ (موجود: ${existing.type}, مطلوب: ${expected.type})`);
            }

            // فحص الحجم للأعمدة النصية
            if (expected.size && existing.size !== expected.size) {
                hasIssue = true;
                issueDetails.push(`الحجم خاطئ (موجود: ${existing.size}, مطلوب: ${expected.size})`);
            }

            // فحص Required
            if (existing.required !== expected.required) {
                hasIssue = true;
                issueDetails.push(`Required خاطئ (موجود: ${existing.required}, مطلوب: ${expected.required})`);
            }

            if (hasIssue) {
                issues.push({ key, details: issueDetails });
                console.log(`⚠️  ${key}: ${issueDetails.join(', ')}`);
            } else {
                console.log(`✅ ${key}: صحيح (${expected.type}${expected.size ? `, ${expected.size}` : ''}, required: ${expected.required})`);
            }
        }

        // فحص الأعمدة الزائدة
        const extraAttributes = existingAttributes.filter(
            attr => !EXPECTED_ATTRIBUTES[attr.key]
        );

        if (extraAttributes.length > 0) {
            console.log('\n⚠️  أعمدة إضافية غير متوقعة:');
            extraAttributes.forEach(attr => {
                console.log(`   - ${attr.key} (${attr.type})`);
            });
        }

        // ملخص النتائج
        console.log('\n' + '='.repeat(60));
        console.log('📋 ملخص الفحص:');
        console.log('='.repeat(60));

        if (missing.length === 0 && issues.length === 0) {
            console.log('✅ جميع الأعمدة صحيحة ومطابقة للمواصفات!');
        } else {
            if (missing.length > 0) {
                console.log(`\n❌ أعمدة مفقودة (${missing.length}):`);
                missing.forEach(key => console.log(`   - ${key}`));
            }

            if (issues.length > 0) {
                console.log(`\n⚠️  أعمدة بها مشاكل (${issues.length}):`);
                issues.forEach(issue => {
                    console.log(`   - ${issue.key}: ${issue.details.join(', ')}`);
                });
            }

            console.log('\n💡 لإصلاح المشاكل:');
            console.log('   1. احذف الأعمدة الخاطئة من Appwrite Console');
            console.log('   2. شغّل السكربت: node setup_trainees_schema.js');
        }

    } catch (error) {
        console.error('❌ حدث خطأ أثناء الفحص:', error.message);
    }
}

checkAllAttributes();

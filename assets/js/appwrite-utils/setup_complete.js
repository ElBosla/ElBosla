const sdk = require('node-appwrite');

const client = new sdk.Client();
const databases = new sdk.Databases(client);

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('6971430c00318957e6d7')
    .setKey('standard_527ce4b84ec6fc871c44da70372d48ece23ef25159e2085ec2a8d779acc63158c37656f92c1c570827774b61a097bfc8335a230ba02e1dfa1df8cd0ba950f853a3899bdd417076d2bc75759b6d2bfe1775c3c5ea1f47a87548daff6c1fa456ab526da4423435bcedbd6fc23de1324b710aab2acf6a076f02ab8382f5f6229410');

const DATABASE_ID = '6971454f002823a65775';

const collections = [
    {
        id: 'applicants',
        name: 'Applicants',
        attributes: [
            { key: 'name', type: 'string', size: 255, required: true },
            { key: 'phone', type: 'string', size: 50, required: true },
            { key: 'email', type: 'string', size: 255, required: false },
            { key: 'specialization', type: 'string', size: 255, required: true },
            { key: 'plan', type: 'string', size: 100, required: true },
            { key: 'status', type: 'string', size: 50, required: false, default: 'في الانتظار' },
            { key: 'paymentStatus', type: 'string', size: 50, required: false, default: 'unpaid' },
            { key: 'timestamp', type: 'datetime', required: true },
            { key: 'notes', type: 'string', size: 5000, required: false },
            { key: 'teacherId', type: 'string', size: 255, required: false },
            { key: 'teacherName', type: 'string', size: 255, required: false },
            { key: 'password', type: 'string', size: 255, required: false },
            { key: 'bio', type: 'string', size: 5000, required: false },
            { key: 'portfolio', type: 'string', size: 1000, required: false },
            { key: 'subscriptionStart', type: 'string', size: 100, required: false },
            { key: 'subscriptionEnd', type: 'string', size: 100, required: false },
            { key: 'goal3months', type: 'string', size: 2000, required: false },
            { key: 'goal6months', type: 'string', size: 2000, required: false },
            { key: 'learningReason', type: 'string', size: 2000, required: false },
            { key: 'pathName', type: 'string', size: 255, required: false },
            { key: 'totalWeeks', type: 'integer', required: false, default: 0 },
            { key: 'currentWeek', type: 'integer', required: false, default: 0 }
        ]
    },
    {
        id: 'admins',
        name: 'Admins',
        attributes: [
            { key: 'username', type: 'string', size: 100, required: true },
            { key: 'password', type: 'string', size: 255, required: true },
            { key: 'role', type: 'string', size: 50, required: false, default: 'admin' },
            { key: 'name', type: 'string', size: 255, required: false },
            { key: 'subject', type: 'string', size: 255, required: false },
            { key: 'phone', type: 'string', size: 50, required: false },
            { key: 'image', type: 'string', size: 500, required: false },
            { key: 'bio', type: 'string', size: 2000, required: false },
            { key: 'createdAt', type: 'datetime', required: false },
            { key: 'updatedAt', type: 'datetime', required: false }
        ]
    },
    {
        id: 'messages',
        name: 'Messages',
        attributes: [
            { key: 'senderId', type: 'string', size: 255, required: true },
            { key: 'senderType', type: 'string', size: 50, required: true },
            { key: 'text', type: 'string', size: 5000, required: false },
            { key: 'type', type: 'string', size: 50, required: false, default: 'text' },
            { key: 'audioUrl', type: 'string', size: 500, required: false },
            { key: 'fileUrl', type: 'string', size: 500, required: false },
            { key: 'fileName', type: 'string', size: 255, required: false },
            { key: 'fileType', type: 'string', size: 100, required: false },
            { key: 'fileId', type: 'string', size: 255, required: false },
            { key: 'meetingUrl', type: 'string', size: 500, required: false },
            { key: 'timestamp', type: 'datetime', required: true }
        ]
    },
    {
        id: 'calendar_content',
        name: 'Calendar Content',
        attributes: [
            { key: 'date', type: 'string', size: 50, required: true },
            { key: 'notes', type: 'string', size: 2000, required: false },
            { key: 'images', type: 'string', size: 2000, required: false },
            { key: 'platforms', type: 'string', size: 500, required: false },
            { key: 'publishTime', type: 'string', size: 50, required: false },
            { key: 'dayTasks', type: 'string', size: 2000, required: false },
            { key: 'status', type: 'string', size: 50, required: false, default: 'draft' },
            { key: 'updatedAt', type: 'datetime', required: false }
        ]
    },
    {
        id: 'global_tasks',
        name: 'Global Tasks',
        attributes: [
            { key: 'text', type: 'string', size: 1000, required: true },
            { key: 'done', type: 'boolean', required: false, default: false },
            { key: 'createdAt', type: 'datetime', required: true }
        ]
    },
    {
        id: 'transactions',
        name: 'Transactions',
        attributes: [
            { key: 'amount', type: 'double', required: true },
            { key: 'type', type: 'string', size: 50, required: true },
            { key: 'category', type: 'string', size: 100, required: true },
            { key: 'note', type: 'string', size: 1000, required: false },
            { key: 'date', type: 'datetime', required: true }
        ]
    },
    {
        id: 'finance_todos',
        name: 'Finance Todos',
        attributes: [
            { key: 'text', type: 'string', size: 1000, required: true },
            { key: 'completed', type: 'boolean', required: false, default: false },
            { key: 'timestamp', type: 'datetime', required: true }
        ]
    },
    {
        id: 'trainees',
        name: 'Trainees',
        attributes: [
            { key: 'fullName', type: 'string', size: 128, required: true },
            { key: 'email', type: 'string', size: 128, required: true },
            { key: 'mobile', type: 'string', size: 20, required: false },
            { key: 'track', type: 'string', size: 64, required: true },
            { key: 'level', type: 'string', size: 64, required: true },
            { key: 'package', type: 'string', size: 64, required: true },
            { key: 'status', type: 'string', size: 32, required: false, default: 'Pending' },
            { key: 'githubLink', type: 'string', size: 255, required: true },
            { key: 'cvLink', type: 'string', size: 255, required: false },
            { key: 'reason', type: 'string', size: 2000, required: true },
            { key: 'appliedAt', type: 'datetime', required: true }
        ]
    },
    {
        id: 'courses',
        name: 'Courses',
        attributes: [
            { key: 'title', type: 'string', size: 255, required: true },
            { key: 'description', type: 'string', size: 2000, required: false },
            { key: 'oldPrice', type: 'string', size: 50, required: false },
            { key: 'price', type: 'string', size: 50, required: false },
            { key: 'thumbnailId', type: 'string', size: 255, required: false }
        ]
    },
    {
        id: 'course_videos',
        name: 'Course Videos',
        attributes: [
            { key: 'courseId', type: 'string', size: 255, required: true },
            { key: 'title', type: 'string', size: 255, required: true },
            { key: 'videoId', type: 'string', size: 255, required: true },
            { key: 'order', type: 'integer', required: false, default: 0 }
        ]
    },
    {
        id: 'subscribers',
        name: 'Subscribers',
        attributes: [
            { key: 'name', type: 'string', size: 255, required: true },
            { key: 'phone', type: 'string', size: 50, required: true },
            { key: 'password', type: 'string', size: 255, required: false },
            { key: 'paymentStatus', type: 'string', size: 50, required: false, default: 'pending' },
            { key: 'courses', type: 'string', size: 1000, required: false, array: true },
            { key: 'watchedVideos', type: 'string', size: 5000, required: false, array: true },
            { key: 'deviceId', type: 'string', size: 255, required: false }
        ]
    },
    {
        id: 'notifications',
        name: 'Notifications',
        attributes: [
            { key: 'title', type: 'string', size: 255, required: true },
            { key: 'message', type: 'string', size: 1000, required: true },
            { key: 'type', type: 'string', size: 50, required: false, default: 'info' },
            { key: 'targetRole', type: 'string', size: 50, required: false, default: 'all' },
            { key: 'timestamp', type: 'datetime', required: true }
        ]
    }
];

async function setup() {
    for (const coll of collections) {
        try {
            console.log(`📦 Ensuring collection: ${coll.name}...`);
            await databases.createCollection(DATABASE_ID, coll.id, coll.name, ['read("any")', 'create("any")', 'update("any")', 'delete("any")']);
            console.log(`✅ Collection ${coll.name} created.`);
        } catch (e) {
            if (e.code === 409) {
                console.log(`⚠️ Collection ${coll.name} exists.`);
            } else {
                console.error(`❌ Error on collection ${coll.name}: ${e.message}`);
            }
        }

        for (const attr of coll.attributes) {
            try {
                console.log(`  ➕ Adding attribute: ${attr.key}...`);
                if (attr.type === 'string') {
                    await databases.createStringAttribute(DATABASE_ID, coll.id, attr.key, attr.size, attr.required, attr.default, attr.array);
                } else if (attr.type === 'integer') {
                    await databases.createIntegerAttribute(DATABASE_ID, coll.id, attr.key, attr.required, 0, 1000000, attr.default, attr.array);
                } else if (attr.type === 'boolean') {
                    await databases.createBooleanAttribute(DATABASE_ID, coll.id, attr.key, attr.required, attr.default, attr.array);
                } else if (attr.type === 'datetime') {
                    await databases.createDatetimeAttribute(DATABASE_ID, coll.id, attr.key, attr.required, attr.default, attr.array);
                } else if (attr.type === 'double') {
                    await databases.createFloatAttribute(DATABASE_ID, coll.id, attr.key, attr.required, 0, 1000000, attr.default, attr.array);
                }
                await new Promise(r => setTimeout(r, 600));
            } catch (e) {
                if (e.code === 409) {
                    // console.log(`  ⚠️ Attribute ${attr.key} exists.`);
                } else {
                    console.error(`  ❌ Error on attribute ${attr.key}: ${e.message}`);
                }
            }
        }
    }
}

setup();

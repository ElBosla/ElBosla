const { Client, Databases } = require('node-appwrite');

// Config
const ENDPOINT = 'https://fra.cloud.appwrite.io/v1';
const PROJECT_ID = '6971430c00318957e6d7';
const API_KEY = 'standard_527ce4b84ec6fc871c44da70372d48ece23ef25159e2085ec2a8d779acc63158c37656f92c1c570827774b61a097bfc8335a230ba02e1dfa1df8cd0ba950f853a3899bdd417076d2bc75759b6d2bfe1775c3c5ea1f47a87548daff6c1fa456ab526da4423435bcedbd6fc23de1324b710aab2acf6a076f02ab8382f5f6229410'; // Using the key from previous context
const DATABASE_ID = '6971454f002823a65775';
const COLLECTION_ID = 'applicants';

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

const databases = new Databases(client);

async function createIndex() {
    console.log('Checking indexes for applicants collection...');

    try {
        const settings = await databases.listIndexes(DATABASE_ID, COLLECTION_ID);
        const exists = settings.indexes.some(idx => idx.key === 'teacherId');

        if (exists) {
            console.log('✅ Index for teacherId already exists.');
        } else {
            console.log('Creating index for teacherId...');
            await databases.createIndex(
                DATABASE_ID,
                COLLECTION_ID,
                'idx_teacher',
                'key',
                ['teacherId'],
                ['ASC']
            );
            console.log('✅ Index created successfully!');
        }
    } catch (error) {
        console.error('❌ Error managing indexes:', error.message);
    }
}

createIndex();

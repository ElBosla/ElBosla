/**
 * Fix Calendar Index
 * Creates an index for the 'date' attribute in calendar_content to enable querying
 */

const sdk = require('node-appwrite');

const client = new sdk.Client();
const databases = new sdk.Databases(client);

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('6971430c00318957e6d7')
    .setKey('standard_527ce4b84ec6fc871c44da70372d48ece23ef25159e2085ec2a8d779acc63158c37656f92c1c570827774b61a097bfc8335a230ba02e1dfa1df8cd0ba950f853a3899bdd417076d2bc75759b6d2bfe1775c3c5ea1f47a87548daff6c1fa456ab526da4423435bcedbd6fc23de1324b710aab2acf6a076f02ab8382f5f6229410');

const DATABASE_ID = '6971454f002823a65775';
const COLLECTION_ID = 'calendar_content';

async function createIndex() {
    console.log('🔧 Creating index for calendar_content...\n');

    try {
        await databases.createIndex(
            DATABASE_ID,
            COLLECTION_ID,
            'date_index',
            'key',
            ['date'],
            ['ASC']
        );
        console.log('✅ Index created successfully!');
        console.log('⏳ Note: Indexes may take a few minutes to become active.');
    } catch (error) {
        if (error.code === 409) {
            console.log('⚠️  Index already exists.');
        } else {
            console.error('❌ Error creating index:', error.message);
        }
    }
}

createIndex();

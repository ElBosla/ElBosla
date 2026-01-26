/**
 * Database Health Check
 * This script checks the current state of all collections and their attributes
 * 
 * Usage: node check-database.js
 */

const sdk = require('node-appwrite');

// Configuration
const client = new sdk.Client();
const databases = new sdk.Databases(client);

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('6971430c00318957e6d7')
    .setKey('standard_527ce4b84ec6fc871c44da70372d48ece23ef25159e2085ec2a8d779acc63158c37656f92c1c570827774b61a097bfc8335a230ba02e1dfa1df8cd0ba950f853a3899bdd417076d2bc75759b6d2bfe1775c3c5ea1f47a87548daff6c1fa456ab526da4423435bcedbd6fc23de1324b710aab2acf6a076f02ab8382f5f6229410');

const DATABASE_ID = '6971454f002823a65775';

const EXPECTED_COLLECTIONS = [
    'applicants',
    'page_visits',
    'admins',
    'messages',
    'calendar_content',
    'global_tasks',
    'transactions',
    'finance_todos'
];

async function checkDatabase() {
    console.log('🏥 Database Health Check\n');
    console.log('═'.repeat(60));

    try {
        const database = await databases.get(DATABASE_ID);
        console.log(`\n📊 Database: ${database.name} (ID: ${database.$id})`);
        console.log(`   Created: ${new Date(database.$createdAt).toLocaleString()}`);

        console.log('\n📦 Collections Status:\n');

        for (const collectionId of EXPECTED_COLLECTIONS) {
            try {
                const collection = await databases.getCollection(DATABASE_ID, collectionId);
                const attributeCount = collection.attributes.length;

                console.log(`✅ ${collection.name} (${collectionId})`);
                console.log(`   Attributes: ${attributeCount}`);

                // List all attributes
                const attrs = collection.attributes.map(a => `${a.key} (${a.type})`).join(', ');
                console.log(`   Fields: ${attrs}`);

                // Check for documents
                const docs = await databases.listDocuments(DATABASE_ID, collectionId);
                console.log(`   Documents: ${docs.total}`);
                console.log('');

            } catch (error) {
                console.log(`❌ ${collectionId}: NOT FOUND`);
                console.log(`   Error: ${error.message}\n`);
            }
        }

        console.log('═'.repeat(60));
        console.log('\n🗂️  Storage Buckets Check:\n');

        const storage = new sdk.Storage(client);
        try {
            const buckets = await storage.listBuckets();

            if (buckets.total === 0) {
                console.log('⚠️  No storage buckets found!');
                console.log('   You need to create:');
                console.log('   - chats (for chat files)');
                console.log('   - calendar (for calendar images)\n');
            } else {
                buckets.buckets.forEach(bucket => {
                    console.log(`✅ ${bucket.name} (${bucket.$id})`);
                    console.log(`   Max File Size: ${bucket.maximumFileSize / 1024 / 1024} MB`);
                    console.log(`   Files: ${bucket.fileSecurity ? 'Secure' : 'Public'}\n`);
                });
            }
        } catch (error) {
            console.log(`❌ Error checking buckets: ${error.message}\n`);
        }

        console.log('═'.repeat(60));
        console.log('\n👥 Users Check:\n');

        const admins = await databases.listDocuments(DATABASE_ID, 'admins');
        console.log(`Total Admin Users: ${admins.total}`);

        if (admins.total > 0) {
            admins.documents.forEach((user, i) => {
                console.log(`\n${i + 1}. ${user.username}`);
                console.log(`   Role: ${user.role || '⚠️  NOT SET'}`);
                console.log(`   Name: ${user.name || 'N/A'}`);
            });
        } else {
            console.log('⚠️  No admin users found! Run create-admin.js');
        }

        console.log('\n' + '═'.repeat(60));
        console.log('\n✨ Health check complete!\n');

    } catch (error) {
        console.error('❌ Error during health check:', error.message);
    }
}

checkDatabase();

/**
 * List All Admin Users
 * This script lists all users in the admins collection
 * 
 * Usage: node list-admins.js
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
const COLLECTION_ID = 'admins';

async function listAdmins() {
    console.log('👥 Listing all admin users...\n');

    try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);

        if (response.documents.length === 0) {
            console.log('⚠️  No users found in the admins collection.\n');
            return;
        }

        console.log(`📊 Found ${response.documents.length} user(s):\n`);

        response.documents.forEach((user, index) => {
            console.log(`${index + 1}. User ID: ${user.$id}`);
            console.log(`   Username: ${user.username}`);
            console.log(`   Password: ${user.password}`);
            console.log(`   Role: ${user.role || 'Not set'}`);
            console.log(`   Name: ${user.name || 'N/A'}`);
            console.log(`   Created: ${user.createdAt || 'N/A'}`);
            console.log('');
        });

        console.log('✨ Done!\n');

    } catch (error) {
        console.error('❌ Error listing admins:', error.message);
    }
}

listAdmins();

const sdk = require('node-appwrite');

// --- CONFIGURATION ---
const client = new sdk.Client();
const databases = new sdk.Databases(client);

const PROJECT_ID = '6971430c00318957e6d7';
const DATABASE_ID = '6971454f002823a65775';
const COLLECTION_ID = 'analytics';
const ENDPOINT = 'https://fra.cloud.appwrite.io/v1';
const API_KEY = 'standard_527ce4b84ec6fc871c44da70372d48ece23ef25159e2085ec2a8d779acc63158c37656f92c1c570827774b61a097bfc8335a230ba02e1dfa1df8cd0ba950f853a3899bdd417076d2bc75759b6d2bfe1775c3c5ea1f47a87548daff6c1fa456ab526da4423435bcedbd6fc23de1324b710aab2acf6a076f02ab8382f5f6229410';

client
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

async function fixPermissions() {
    console.log('🔄 Updating Collection Permissions...');

    try {
        // We need to allow Role.any() for READ because the dashboard currently
        // uses a custom auth system (Database-based) and not Appwrite Auth.
        // Therefore, the browser client is treated as a "Guest".

        await databases.updateCollection(
            DATABASE_ID,
            COLLECTION_ID,
            'Analytics', // Name
            [
                sdk.Permission.create(sdk.Role.any()),    // Anyone can log data
                sdk.Permission.read(sdk.Role.any()),      // <--- CHANGED: Allow Guests (Dashboard) to read
                sdk.Permission.update(sdk.Role.users()),
                sdk.Permission.delete(sdk.Role.users())
            ]
        );
        console.log('✅ Permissions Updated: Read access granted to Guests (Role.any()).');
        console.log('   The Dashboard should now be able to fetch analytics data.');

    } catch (error) {
        console.error('❌ Failed to update permissions:', error.message);
    }
}

fixPermissions();

/**
 * Update Admin User with Role
 * This script updates an existing admin user to add the role attribute
 * 
 * Usage: node update-admin-role.js
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
const USER_ID = '696451390037ca911ea3';

async function updateAdminRole() {
    console.log('🔧 Updating admin user with role...\n');

    try {
        // First, let's check if role attribute exists
        const collection = await databases.getCollection(DATABASE_ID, COLLECTION_ID);
        const hasRoleAttribute = collection.attributes.some(attr => attr.key === 'role');

        if (!hasRoleAttribute) {
            console.log('⚠️  Role attribute does not exist yet.');
            console.log('📝 Creating role attribute...\n');

            try {
                await databases.createStringAttribute(
                    DATABASE_ID,
                    COLLECTION_ID,
                    'role',
                    50,
                    false, // Not required to avoid issues
                    'admin' // Default value
                );
                console.log('✅ Role attribute created!\n');

                // Wait a bit for the attribute to be ready
                console.log('⏳ Waiting for attribute to be ready...');
                await new Promise(resolve => setTimeout(resolve, 3000));
            } catch (attrError) {
                console.error('❌ Error creating role attribute:', attrError.message);
                return;
            }
        }

        // Update the user with role
        const updatedUser = await databases.updateDocument(
            DATABASE_ID,
            COLLECTION_ID,
            USER_ID,
            {
                role: 'admin'
            }
        );

        console.log('✅ Admin user updated successfully!\n');
        console.log('📋 User details:');
        console.log('   ID:', updatedUser.$id);
        console.log('   Username:', updatedUser.username);
        console.log('   Role:', updatedUser.role);
        console.log('   Name:', updatedUser.name || 'N/A');
        console.log('\n✨ You can now login with this user!\n');

    } catch (error) {
        console.error('❌ Error updating admin:', error.message);
        console.log('\n💡 Tip: Make sure the user ID is correct and the role attribute exists.');
    }
}

updateAdminRole();

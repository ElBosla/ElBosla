/**
 * Create Default Admin User
 * This script creates a default admin user for initial login
 * 
 * Usage: node create-admin.js
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

async function createDefaultAdmin() {
    console.log('🔐 Creating default admin user...\n');

    try {
        // Create default admin
        const admin = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            sdk.ID.unique(),
            {
                username: 'admin',
                password: 'admin123',
                name: 'المسؤول الرئيسي',
                createdAt: new Date().toISOString()
            },
            ['read("any")', 'update("any")', 'delete("any")']
        );

        console.log('✅ Default admin user created successfully!\n');
        console.log('📋 Login credentials:');
        console.log('   Username: admin');
        console.log('   Password: admin123\n');
        console.log('⚠️  IMPORTANT: Please change this password after first login!\n');

    } catch (error) {
        if (error.code === 409) {
            console.log('⚠️  Admin user already exists!\n');
            console.log('📋 Try logging in with:');
            console.log('   Username: admin');
            console.log('   Password: admin123\n');
        } else {
            console.error('❌ Error creating admin:', error.message);
        }
    }
}

createDefaultAdmin();

const sdk = require('node-appwrite');

// Initialize Appwrite client
const client = new sdk.Client();
const databases = new sdk.Databases(client);

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('6971430c00318957e6d7') // Project ID: Bousla-v4
    .setKey('standard_9279b1b74d46729332450bcc814834036e518664a93a5a73e65e9b61b88e44ca14c6a171806be1e787a7a9075481b996ae0ff38b60824b7a6c05e9a1e42e3d7b9e6ef80805c500b4922032967485cb11bf077c689fe86b872aa6768621bc21f8aa51dba44e79f072a9d2b364720e902c0f6f8e723fc1d4b8fd38946b690cd7e5');

const DATABASE_ID = '6971454f002823a65775';
const COLLECTION_ID = 'subscribers';

async function addPaymentAttributes() {
    console.log('🚀 Starting to add payment attributes to subscribers collection...\n');

    try {
        // Add paymentMethod attribute
        console.log('📝 Adding "paymentMethod" attribute...');
        try {
            await databases.createStringAttribute(
                DATABASE_ID,
                COLLECTION_ID,
                'paymentMethod',
                100,
                false, // not required
                '' // default value
            );
            console.log('✅ "paymentMethod" attribute added successfully!\n');
        } catch (error) {
            if (error.message.includes('already exists')) {
                console.log('⚠️  "paymentMethod" attribute already exists, skipping...\n');
            } else {
                throw error;
            }
        }

        // Add paymentProofId attribute
        console.log('📝 Adding "paymentProofId" attribute...');
        try {
            await databases.createStringAttribute(
                DATABASE_ID,
                COLLECTION_ID,
                'paymentProofId',
                100,
                false, // not required
                '' // default value
            );
            console.log('✅ "paymentProofId" attribute added successfully!\n');
        } catch (error) {
            if (error.message.includes('already exists')) {
                console.log('⚠️  "paymentProofId" attribute already exists, skipping...\n');
            } else {
                throw error;
            }
        }

        console.log('🎉 All payment attributes have been added successfully!');
        console.log('📋 Summary:');
        console.log('   - paymentMethod (String, 100 chars, optional)');
        console.log('   - paymentProofId (String, 100 chars, optional)');
        console.log('\n✨ You can now use the payment features in your application!');

    } catch (error) {
        console.error('❌ Error adding attributes:', error.message);
        console.error('\n💡 Possible solutions:');
        console.error('   1. Make sure you have added your Appwrite API key in this script');
        console.error('   2. Verify that the API key has "databases.write" permission');
        console.error('   3. Check that the database and collection IDs are correct');
        process.exit(1);
    }
}

// Run the script
addPaymentAttributes();

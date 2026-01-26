/**
 * Add Missing Attributes for Applicants Form
 * Usage: node add-applicant-attributes.js
 */

const sdk = require('node-appwrite');

const client = new sdk.Client();
const databases = new sdk.Databases(client);

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('6971430c00318957e6d7')
    .setKey('standard_527ce4b84ec6fc871c44da70372d48ece23ef25159e2085ec2a8d779acc63158c37656f92c1c570827774b61a097bfc8335a230ba02e1dfa1df8cd0ba950f853a3899bdd417076d2bc75759b6d2bfe1775c3c5ea1f47a87548daff6c1fa456ab526da4423435bcedbd6fc23de1324b710aab2acf6a076f02ab8382f5f6229410');

const DATABASE_ID = '6971454f002823a65775';
const COLLECTION_ID = 'applicants';

async function addAttributes() {
    console.log('🔧 Adding missing attributes to Applicants collection...\n');

    const attributes = [
        { key: 'portfolio', type: 'string', size: 500, required: false },
        { key: 'bio', type: 'string', size: 5000, required: false }
    ];

    for (const attr of attributes) {
        try {
            console.log(`  ➕ Adding ${attr.key}...`);
            await databases.createStringAttribute(
                DATABASE_ID,
                COLLECTION_ID,
                attr.key,
                attr.size,
                attr.required
            );
            console.log(`  ✅ ${attr.key} added successfully!`);
            // Wait to avoid rate limit
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            if (error.code === 409) {
                console.log(`  ⚠️  ${attr.key} already exists.`);
            } else {
                console.error(`  ❌ Error adding ${attr.key}:`, error.message);
            }
        }
    }
    console.log('\n✨ Done!');
}

addAttributes();

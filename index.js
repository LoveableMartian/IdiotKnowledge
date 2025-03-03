
const express = import('express');

// set up express app
const app = express();

app.get('/', function(){
    console.log('GET request');
});

// listen for requests
app.listen(4000,function(){
    console.log('listening for requests');
});

async function main() {
	// we'll add code here soon
    const uri = "mongodb+srv://kurterikhedqvist:1Ys0CS6xApJjbAI5@kurterikcluster.sj4u9.mongodb.net/"
    
        const client = new MongoClient(uri);
     
        try {
            // Connect to the MongoDB cluster
            await client.connect();
     
            // Make the appropriate DB calls
            await  listDatabases(client);
     
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }
    
    main().catch(console.error);

    async function listDatabases(client){
        databasesList = await client.db().admin().listDatabases();
     
        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    };


    async function findOneListingByName(client, nameOfListing) {

        const result = await client.db("IdiotKnowledge").collection("gamequestions").findOne({ name: nameOfListing });
    
        if (result) {
    
            console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
    
            console.log(result);
    
        } else {
    
            console.log(`No listings found with the name '${nameOfListing}'`);
    
        }
    
    }
    
    await findOneListingByName(client, "How many people in the world share the same birth day as you?");

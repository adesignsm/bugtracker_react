const {MongoClient} = require("mongodb");
const Db = process.env.URI;

const client = new MongoClient(Db, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let _db;

module.exports = {

    connectToServer: function(callback) {
        client.connect((error, db) => {
            
            if (db) {
                _db = db.db("bugs");
                console.log("mongo connect success");
            }
            
            return callback(error);
        })
    },

    getDB: function() {

        return _db;
    }
}
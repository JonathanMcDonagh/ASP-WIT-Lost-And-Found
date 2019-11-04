const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const User = require("../../../models/users");
const { MongoClient } = require("mongodb");


const _ = require("lodash");
let server, mongod, db, url, connection, validID, studentID, WITBuilding, WITRoom;

describe("Userss", () => {
    before(async () => {
        try {
            mongod = new MongoMemoryServer({
                instance: {
                    port: 27017,
                    dbPath: "./test/database",
                    dbName: "witlostandfounddb" // by default generate random dbName
                }
            });
            // Async Trick - this ensures the database is created before
            // we try to connect to it or start the server
            url = await mongod.getConnectionString();

            connection = await MongoClient.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            server = require("../../../bin/www");
            db = connection.db(await mongod.getDbName());
        } catch (error) {
            console.log(error);
        }
    });

    after(async () => {
        try {
            await connection.close();
            await mongod.stop();
            await server.close()
        } catch (error) {
            console.log(error);
        }
    });

    beforeEach(async () => {
        try {
            await User.deleteMany({});
            let user = new User();
            user.email = "20074520@mail.wit.ie";
            user.name = "Jonathan";
            user.password = "20074520";
            user.posts = 0;
            await user.save();
            user.email = "20074530@mail.wit.ie";
            user.name = "Lauren";
            user.password = "20074530";
            user.posts = 0;
            await user.save();
            user = await user.findOneUser({email: "20074520@mail.wit.ie"});
            validID = user._id;
            userName = user.name;
        } catch (error) {
            console.log(error);
        }
    });


});

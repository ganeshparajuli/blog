const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express();

app.use(bodyParser.json());

const withDB = async (operations, res) => {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db("blog");
    await operations(db);
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to db", error });
  }
};
//postman get url: http://localhost:8000/api/articles/learn-react
app.get("/api/articles/:name", async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;

    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(articleInfo);
    // client.close();
  }, res);
});

//post method url: http://localhost:8000/api/articles/learn-react/add-comments  
/*body:
{
  "username": "ganesh",
  "text": "good"
}
*/
app.post("/api/articles/:name/add-comments", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;

  withDB(async (db) => {
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    await db.collection("articles").updateOne(
      { name: articleName },
      {
        $set: {
          comments: articleInfo.comments.concat({ username, text }),
        },
      }
    );
    const updatedArticleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(updatedArticleInfo);
  }, res);
});

app.listen(8000, () => console.log("Listening on port 8000"));

/*
const express=require("express");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.json());
app.get("/hello",(req,res)=>res.send("Hello")); 
get postman url: http://localhost:8000/hello
post postman url: http://localhost:8000/hello
    body: {"name": "Server"}

app.post("/hello",(req,res)=>res.send(`Hello${req.body.name}`));
app.listen(8000,()=>console.log("Listening on port 8000"));

mongo db cmd
> db.articles.insert([{name: 'learn-react', comments: [] }, {name: 'learn-node', comments: [] }, {name: 'my-thoughts-on-learning-react', comments: [] }])
BulkWriteResult({
        "writeErrors" : [ ],
        "writeConcernErrors" : [ ],
        "nInserted" : 3,
        "nUpserted" : 0,
        "nMatched" : 0,
        "nModified" : 0,
        "nRemoved" : 0,
        "upserted" : [ ]
})
> db.articles.find({})
{ "_id" : ObjectId("628672b9296ba8c8c72d7ba0"), "name" : "learn-react", "comments" : [ ] }
{ "_id" : ObjectId("628672b9296ba8c8c72d7ba1"), "name" : "learn-node", "comments" : [ ] }
{ "_id" : ObjectId("628672b9296ba8c8c72d7ba2"), "name" : "my-thoughts-on-learning-react", "comments" : [ ] }
*/
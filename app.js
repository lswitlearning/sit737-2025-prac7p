const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`;
const client = new MongoClient(uri);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1); // Exit process if DB connection fails
  }
}

// CREATE
app.post("/products", async (req, res) => {
  try {
    const { name, price } = req.body;
    const result = await db.collection("products").insertOne({ name, price });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ
app.get("/products", async (req, res) => {
  try {
    const products = await db.collection("products").find().toArray();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, price } }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on port ${port}`);
});

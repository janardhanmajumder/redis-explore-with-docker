import express from "express";
import Redis from "ioredis";
import mongoose from "mongoose";

const app = express();

const redis = new Redis(
  process.env.REDIS_URL || {
    host: "localhost",
    port: 6379,
  },
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/redis", async (req, res) => {
  const value = await redis.ping();
  res.send({ redis: value });
});

app.get("/mongo", async (req, res) => {
  const url =
    process.env.MONGO_URL || "mongodb://localhost:27017/janardhan_redis";
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(url);
  }
  res.send({
    mongo: "connected",
    database: mongoose.connection.name,
  });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

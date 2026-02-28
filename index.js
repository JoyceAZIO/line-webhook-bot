import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server OK");
});

// 👇 加上這個
app.post("/callback", (req, res) => {
  console.log("LINE webhook hit");
  res.status(200).send("OK");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Server started");
});

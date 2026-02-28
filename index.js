import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Server OK");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server started");
});

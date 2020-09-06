const express = require("express");
const { Pool, Client } = require("pg");

const app = express();

const client = new Client({
  user: "dev",
  host: "localhost",
  database: "postgres",
  password: "Qwerty@321",
  port: 5432,
});

(async () => {
  console.log("Trying to connect");
  try {
    client.connect();
    client.query("SELECT NOW()", (err, response) => {
      console.log("connected");
      console.log(err, response);
    });
  } catch (err) {
    console.log(err);
  }

})();


app.get("/", (req, res) => {
  call("adsfsdfsadsfsdfs", "adsfsdfsadsfsdfs", "adsfsdfsadsfsdfs", "adsfsdfsadsfsdfs", "adsfsdfsadsfsdfs", "adsfsdfsadsfsdfs");
});

app.post("/login", (req, res) => { });

app.listen(1234, () => {
  console.log("App running");
});

function call(a, b, c, d, e, f) {
  console.log(a, b, c, d, e, f);
}

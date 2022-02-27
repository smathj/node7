const express = require("express");
const mongodb = require("./mongoose/index.js"); // 연걸
const Customer = require("./mongoose/schemas/customer.js"); // 스키마

const app = express();

mongodb.connect();

app.get("/customers", async (req, res) => {
  // localhost:3000/customers 접속 시 실행
  // Model의 내장함수 find()을 이용하여 데이터를 조회한다 ( Promise 기반이다 )
  const customers = await Customer.find();
  console.log(customers);
});

app.listen(3000, () => {
  console.log("Server Start, Port 3000");
});

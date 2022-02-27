const express = require("express");
require("dotenv").config({ path: "mysql/.env" });
const mysql = require("./mysql"); // mysql 폴더의 index.js, 마우스 올리면 보이기도 함

const app = express();

// 클라이언트가 json으로 요청했을때 처리()
// express 4.16이상 버전부터는 expres내에 body-parser가 내장되어있음
app.use(
  express.json({
    limit: "50mb", // 최대 500메가
  })
);

app.listen(3000, () => {
  console.log("Server started. port 3000");
});

// 고객 리스트 라우터
app.get("/api/customers", async (req, res) => {
  console.log("/api/customers");
  const customers = await mysql.query("customerList"); // 다른 값은 필요없어서 첫번재 파라미터만 넣음
  console.log(customers);
  res.send(customers);
});

// 고객 리스트 상세 조회 라우터
app.get("/api/customer/detail/:id", async (req, res) => {
  console.log("/api/customers/:id");
  const { id } = req.params;
  const customers = await mysql.query("customerDetail", id);
  console.log(customers);
  res.send(customers);
});

// 고객 가입 라우터
app.post("/api/customer/insert", async (req, res) => {
  console.log("/api/customer/insert");
  console.log("req.body.param ↓");
  console.log(req.body.param);

  const result = await mysql.query("customerInsert", req.body.param); // 두번째 파라미터는 sql에 ? 에 매핑된다(JDBC처럼)
  console.log(result);
  res.send(result);
});

// 고객 정보 수정 라우터
app.post("/api/customer/update", async (req, res) => {
  console.log("/api/customer/update");
  console.log("req.body.param ↓");
  console.log(req.body.param);
  const result = await mysql.query("customerUpdate", req.body.param); // 두번째 파라미터는 sql에 ? 에 매핑된다(JDBC처럼)
  console.log(result);
  res.send(result);
});

// 고객 정보 삭제 라우터
app.delete("/api/customer/delete/:id", async (req, res) => {
  console.log("/api/customer/delete");
  console.log("req.params ↓");
  console.log(req.params);
  const { id } = req.params;
  const result = await mysql.query("customerDelete", id); // 두번째 파라미터는 sql에 ? 에 매핑된다(JDBC처럼)
  console.log(result);
  res.send(result);
});

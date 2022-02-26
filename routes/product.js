const express = require("express");
const router = express.Router();

/**
 * 고객 정보 조회을 위한 라우트
 * app.js에서 기본 경로에 /product를 사용하기 때문에
 * "/product" 라우트 경로를 가진다
 */
router.get("/", (req, res) => {
  res.send("/product 라우트 루트");
});

/**
 * 고객 정보 수정을 위한 라우트
 * app.js에서 기본 경로에 /product를 사용하기 때문에
 * "/product/update" 라우트 경로를 가진다
 */
router.post("/update", (req, res) => {
  res.send("/product/update 라우트 루트");
});

/**
 * 고객 정보 삭제을 위한 라우트
 * app.js에서 기본 경로에 /product를 사용하기 때문에
 * "/product/delete" 라우트 경로를 가진다
 */
router.delete("/delete", (req, res) => {
  res.send("/product/delete 라우트 루트");
});

module.exports = router;

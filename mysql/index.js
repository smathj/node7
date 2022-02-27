const mysql = require("mysql");
const sql = require("./sql.js");

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: "127.0.0.1",
//   port: 3307,
//   user: "dev01",
//   password: "1234",
//   database: "dev",
// });

const pool = mysql.createPool({
  connectionLimit: process.env.MYSQL_LIMIT,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

// 쿼리 실행후 결과를 리턴하는 함수
const query = async (alias, values) => {
  // 프로미스
  return new Promise((resolve, reject) => {
    /**
     * 커넥션풀의 query 메서드(1,2,3)
     * 첫번재 파라미터 : 쿼리문
     * 두번째 파라미터 : 쿼리문으로 전달할 데이터 배열
     * 세번째 파라미터 : 콜백 함수로 쿼리 결과 전달
     */
    pool.query(sql[alias], values, (err, result) => {
      if (err) {
        console.log(err);
        reject({ err }); // 에러 발생시 reject() 실행
      } else {
        resolve(result); // 에러가 없을시 실행
      }
    }); // - 콜백 끝
  });
};

module.exports = { query };

const mongoose = require("mongoose");

const connect = () => {
  // 운영 환경이 아닌 개발 환경일 때만
  if (process.env.NODE_ENV !== "production") {
    // 콘솔에서 쿼리 내용을 확인할 수있도록 디버그 모드 활성화
    mongoose.set("debug", true);
  }

  // mongodb://[사용자이름]:[비밀번호]@호스트:포트 번호/데이터베이스
  mongoose.connect(
    "mongodb://root:1234@localhost:27017/admin",
    { dbName: "dev" }, // 접속할 데이터베이스 ( admin은 접속용, 실제사용할 데이터베이스는 dev 이다 )
    (err) => {
      if (err) {
        console.error("MongoDB 연결 에러", err);
      } else {
        console.log("MongoDB 연결 성공", "localhost:27017/admin");
      }
    }
  );
};

// MongoDB 연결시 에러가 있을 때
// 발생하는 이벤트에 대한 리스너 등록
mongoose.connection.on("error", (err) => {
  console.error("MongoDB 연결 에러", err);
});

// MongoDB 연결이 종료되었을때
// 발생하는 이벤트에 대한 리스너 등록
mongoose.connection.on("disconnect", () => {
  console.error("MongoDB 연결이 종료되어 연결을 재시도합니다.");
  connect();
});

module.exports = {
  connect,
};

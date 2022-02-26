const express = require("express");
const customerRouter = require("./routes/customer");
const productRouter = require("./routes/product");
//const bodyParser = require("body-parser");
const compression = require("compression");
//const cookieSession = require("cookie-session");
const session = require("express-session");
const fileStore = require("session-file-store")(session);
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const app = express();

const storage = multer.diskStorage({
  // 디스크 저장소 정의
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // cb 콜백함수를 통해 전송된 파일 저장 디렉터리 설정
  },
  filename: (req, file, cb) => {
    // cb(null, file.originalname) // cb 콜백 함수를 통해 전송된 파일 이름 설정
    // 업로드되는 파일명 : 날짜.확장자
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  },
});

// multer 객체 생성
const upload = multer({ storage: storage });

app.use(morgan("short"));

// 정적파일 설정

// public 폴더에 있는 모든 정적파일을 URL 제공할 수 있다
//app.use(express.static("public"));
// files 폴더에 있는 모든 정적파일을 URL 제공할 수 있다
//app.use(express.static("files"));

// URL로 접근시 가상경로를 주고싶다면?
// 즉 실제 위치를 알려주고 싶지 않을때
// static 밑에 public의 특정 파일이나 폴더로 요청하면됨
app.use("/static", express.static("public"));

// body-parser 사용
// ✅ expres 4.16미만
// express 4.16이상 버전부터는 expres내에 body-parser가 내장되어있음
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

// ✅ expres 4.16이상

// parse apllication/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

// 클라이언트 요청 body를 json으로 파싱 처리
app.use(
  express.json({
    limit: "50mb", // 최대 50메가
  })
);

// 쿠키기반 세션 설정(클라이언트에 저장하는 방식)
// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["하북이"],
//     maxAge: 24 * 60 * 60 * 1000,
//   })
// );

//
app.use(
  session({
    secret: "나북이키", // 암호화에 쓰이는 비밀키
    resave: false, // 세션에 변경 사항이 없어도 항상 다시 저장하는지에대한 여부
    saveUninitialized: true, // 초기화되지 않은 세션을 저장소에 강제로 저장할지 여부
    // 세션 쿠키 설정(클라이언트에게 보내지는 부분)
    cookie: {
      httpOnly: true, // true일때 자바스키릅트로 꺼낼수 없다
      secure: false, // https에서만 쿠키 정보 주고 받도록 처리
      maxAge: 60000, // 유지 시간 밀리세컨드단위(1000 곱해야 1초)
    },
    store: new fileStore(), // 세션 저장소로 fileStore 사용
  })
);

// 어디에서 응답을 하든, 모든 데이터를 압축해서 응답한다
app.use(compression());

// 크로스 브라우저 설정
const corsOptions = {
  origin: "http://example.com", // 허용할 도메인 설정
  optionsSuccessStatus: 200,
};

// customer 라우터 등록
app.use("/customer", customerRouter);

// product 라우터 등록
app.use("/product", productRouter);

// 모든 라우터에 cors 적용
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  // console.log(req.session);
  // if (req.session.num === undefined) {
  //   req.session.num = 1;
  // } else {
  //   req.session.num += 1;
  // }

  // res.send(`View: ${req.session.num}`);

  req.session.habook = "야식땡김";
  req.session.save((err) => {
    if (err) throw err;
  });
  res.send(`<h1>Hello~~~ ${req.session.habook}</h1>`);
  //res.send(req.session);
  res.end();
});

app.get("/session", (req, res) => {
  console.log(req.session);
  res.send(req.session);
});

// ✨ 단일 업로드 ✨
app.post("/profile", upload.single("myFile"), (req, res, next) => {
  // form 태그가 감싼 타입이 file 인 input 태그
  console.log("폼 파일 확인");
  console.log(req.file);
  // for 태그가 감싼 그외 태그
  console.log("폼 데이터 확인");
  console.log(req.body);
});

// ✨ 멀티 업로드 ✨
app.post("/profile2", upload.array("myFile"), (req, res, next) => {
  // form 태그가 감싼 타입이 file 인 input 태그
  console.log("폼 파일 확인");
  console.log(req.files);
  // for 태그가 감싼 그외 태그
  console.log("폼 데이터 확인");
  console.log(req.body);
});

// 에러처리 미들웨어로 보내고싶을때 이렇게
app.get("/error", (req, res) => {
  // 이런식으로 에러가 나타나면 웹상에서 에러가 고스란히 나온다
  throw new Error("에러 발생");
});

// 에러처리 미들웨어로 보내고싶을때 이렇게
app.get("/error2", (req, res, next) => {
  // next() 함수를 사용해서 에러처리 핸들러로 에러 전달할 수 있다
  next(new Error("에러 발생"));
});

// 에러처리 핸들러 미들웨어 함수
app.use((err, req, res, next) => {
  // 상태코드 500, 에러메시지 전달
  res.status(500).json({
    statusCode: res.statusCode,
    errMessage: err.errMessage,
  });
});

app.listen(3000);

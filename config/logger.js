const winston = require("winston"); // winston 모듈
const winstonDaily = require("winston-daily-rotate-file"); // 로그 파일을 일자별로 생성함
const appRoot = require("app-root-path"); // 프로젝트의 루프 경로를 찾아줌
const process = require("process");

// 로그파일 저장경로
const logDir = `${appRoot}/logs`;

const { combine, timestamp, label, printf } = winston.format;

// 로그 출력 포맷 정의
const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  format: combine(
    label({
      label: "nataeKoon Log",
    }),
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),
  transports: [
    // INFO 레벨 로그 저장할 파일 설정
    new winstonDaily({
      level: "info",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 30, // 최근 30일치 로그 파일만 저장
      zippedArchive: true,
    }),
    // ERROR 레벨 로그 저장할 파일 설정
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: `%DATE%.error.log`,
      maxFiles: 30, // 최근 30일치 로그 파일만 저장
      zippedArchive: true,
    }),
  ],
  exceptionHandlers: [
    // uncaughtException 발생 시
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: `%DATE%.exception.log`,
      maxFiles: 30, // 최근 30일치 로그 파일만 저장
      zippedArchive: true,
    }),
  ],
});

// 운영 환경이 아니라면 콘솔에도 로그를 같이 출력함
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // 색상 넣어서 출력한다
        winston.format.simple() // 간단한 포맷으로 출력한다
      ),
    })
  );
}

module.exports = logger;

const logger = require("./config/logger");
const xlsx = require("xlsx");

const workbook = xlsx.readFile("./xlsx/test.xlsx");
const firtSheetName = workbook.SheetNames[0]; // 엑셀의 첫번째 시트 이름가져오기
const firstSheet = workbook.Sheets[firtSheetName]; // 시트이름으로해서 첫번째 시트 가져오기

// 해당 메서드로 첫번째 시트 내용을 JSOn으로 가져오기
const firstSheetJson = xlsx.utils.sheet_to_json(firstSheet);

//logger.info(firstSheetJson);
console.log(firstSheetJson);

// 특정 시트의, 특정 셀의 값을 읽는다
console.log(firstSheet["A2"].v);

firstSheet["B2"].v = "habook@naver.com";
// 셀을 정의한 자바스크립트 오브젝트를 셀에 할당해서 새로운 셀추가
firstSheet["A3"] = { t: "s", v: "Jermey" }; // t : 셀타입 , s는 Text, v : 원시값

// 새로운 파일에 변경내용 저장, 즉 다른 이름 저장
xlsx.writeFile(workbook, "./xlsx/test2.xlsx");

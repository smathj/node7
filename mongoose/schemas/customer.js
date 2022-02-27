const mongoose = require("mongoose");

// 스키마 설정
const { Schema } = mongoose;
const customerSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  phone: {
    type: String,
    require: true,
    unique: true,
  },
  address: {
    type: String,
  },
});

// 스키마를 사용해서 모델 생성
/**
 * 첫번째 파라미터: 스키마 이름
 * 두번째 파라미터: 스키마 객체
 *
 * 몽고DB에는 스키마 이름을 소문자 + 복수형 으로 컬렉션이 만들어진다
 * 이미 동일한게 있다면 그것을 사용함
 */
const Customer = mongoose.model("Customer", customerSchema);

// 외부에서는 모델에 접근하도록 모듈화
module.exports = Customer;

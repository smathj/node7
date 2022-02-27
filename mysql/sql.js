module.exports = {
  customerList: `select * from customers`,
  customerDetail: `select * from customers where id=?`,
  customerInsert: `insert into customers set ?`,
  customerUpdate: `update customers set ? where id=?`,
  customerDelete: `delete from customers where id=?`,
};

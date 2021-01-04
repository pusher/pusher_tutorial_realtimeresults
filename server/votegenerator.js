const fs = require('fs')
const Excel  = require('exceljs')
const workbook = new Excel.Workbook()
const u = './votes.xlsx'
async function readXlsx(limit){
  const votes = []
  const book = await workbook.xlsx.readFile(u).then(function(){
      const book = workbook.getWorksheet(1);
      const headers = book.getRow(1).values

      book.eachRow(async function(row, rowNumber) {
          // if(rowNumber < limit){
               
          // }
          votes.push(row.values)
      });
  })
  return votes
}

module.exports = readXlsx
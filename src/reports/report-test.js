import PDFDocument from 'pdfkit'
import fs from 'fs'

var doc = new PDFDocument()

doc.pipe(fs.createWriteStream('output.pdf'))

doc
  .addPage()
  .fillColor('blue')
  .text('Here is a link!', 100, 100)
  .link(100, 100, 160, 27, 'http://google.com/')

doc.end()

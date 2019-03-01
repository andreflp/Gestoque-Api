import server from '../server/index'
import { Router } from 'restify-router'
import service from '../services/categoria.service'
import errorHandler from '../server/errorHandler'
import PDFDocument from 'pdfkit'
import fs from 'fs'
const router = new Router()

router.get('/categoria', async (req, res, next) => {
  try {
    let pagination = req.query
    const categorias = await service.findAll(pagination)
    res.send({ categorias })
    return next()
  } catch (error) {
    res.send(400, { error: error.parent.sqlMessage })
    return next()
  }
})

router.post('/pdf', async (req, res, next) => {
  const doc = new PDFDocument()

  doc.pipe(fs.createWriteStream('output.pdf'))
  doc.fontSize(25).text('Some text with an embedded font!', 100, 100)

  doc
    .addPage()
    .fontSize(25)
    .text('Here is some vector graphics...', 100, 100)

  doc
    .save()
    .moveTo(100, 150)
    .lineTo(100, 250)
    .lineTo(200, 250)
    .fill('#FF3300')

  doc
    .scale(0.6)
    .translate(470, -380)
    .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
    .fill('red', 'even-odd')
    .restore()

  doc
    .addPage()
    .fillColor('blue')
    .text('Here is a link!', 100, 100)
    .underline(100, 100, 160, 27, { color: '#0000FF' })
    .link(100, 100, 160, 27, 'http://google.com/')

  doc.end()
  next()
})

router.get('/categoria/:id', async (req, res, next) => {
  try {
    const data = req.params.id
    const categoria = await service.findById(data)
    if (categoria === null) {
      res.send(404, { message: 'Categoria não encontrada' })
      return next(false)
    }
    res.send({ categoria })
    return next()
  } catch (error) {
    res.send(400, { error: error.parent.sqlMessage })
    return next()
  }
})

router.post('/categoria', async (req, res, next) => {
  try {
    const categoria = req.body
    const result = await service.create(categoria)
    res.send({ result })
    return next()
  } catch (error) {
    errorHandler(res, error, next)
  }
})

router.put('/categoria/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const data = req.body
    const categoria = await service.findById(id)
    if (categoria === null) {
      res.send(404, { message: 'Categoria não encontrada' })
      return next(false)
    }
    await service.update(data, id)
    res.send({ message: 'Categoria atualizada com sucesso' })
    return next()
  } catch (error) {
    res.send(400, { error: error.parent.sqlMessage })
    return next()
  }
})

router.del('/categoria/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const categoria = await service.findById(id)
    if (categoria === null) {
      res.send(404, { message: 'Categoria não encontrada' })
      return next(false)
    }
    await service.del(id)
    res.send({ message: 'Categoria excluida com sucesso' })
    return next()
  } catch (error) {
    res.send(400, { error: error.parent.sqlMessage })
    return next()
  }
})

router.applyRoutes(server)

export default router

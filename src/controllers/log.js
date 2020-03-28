const model = require('../models').logs
const Log = {}

Log.getAll = async (req, res, next) => {
  const { type, statusCode, origin, limit, skip } = req.query

  const query = { where: {} }

  if (type) {
    query.where.type = type
  }

  if (statusCode) {
    query.where.statusCode = statusCode
  }

  if (origin) {
    query.where.origin = origin
  }

  const data = await model.findAndCountAll({ query, limit: parseInt(limit), offset: parseInt(skip) })
  res.status(200).json({
    total: data.length,
    pageCount: Math.ceil(data.length / limit),
    data
  })
}

Log.getById = async (req, res, next) => {
  const LogId = req.params.logsId
  const data = await model.findOne({ where: { id: LogId }})

  res.status(200).json({data})
}

Log.create = async (req, res, next) => {
  await model.create(req.body)

  res.status(201).json({ message: 'Logs saved to database successfully' })
}

Log.update = async (req, res, next) => {
  const LogId = req.params.logsId
  await model.update(req.body, { where: { id: LogId }})

  res.status(200).json({message: 'The data sent has been updated successfully' })
}

Log.delete = async (req, res, next) => {
  const LogId = req.params.logsId
  await model.destroy({ where: { id: LogId }})

  res.status(204).json({ message: 'Data deleted from the database' })
}

module.exports = Log

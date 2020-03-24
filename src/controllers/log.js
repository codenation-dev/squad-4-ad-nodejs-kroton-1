const model = require('../models').logs

const Log = {}

Log.save = async (req, res, next) => {
  const result = await req.body

  return result
}

Log.getAll = async (req, res, next) => {
  const data = await model.findAll({})

  res.status(200).json({
    total: data.length,
    data
  })
}

Log.getById = async (req, res, next) => {
  const { LogId } = req.params
  const data = await model.findOne({
    where: { id: LogId }
  })

  res.status(200).json(data)
}

Log.create = async (req, res, next) => {
  const result = await model.create(req.body)

  res.status(201).json({ result })
}

Log.update = async (req, res, next) => {
  const { LogId } = req.params
  const result = await model.update(req.body, {
    where: { id: LogId }
  })

  res.status(200).json({ result })
}

Log.delete = async (req, res, next) => {
  const { LogId } = req.params
  const result = await model.destroy({
    where: { id: LogId }
  })

  res.status(204).json({ result })
}

module.exports = Log

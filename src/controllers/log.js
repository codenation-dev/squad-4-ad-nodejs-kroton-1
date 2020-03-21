const model = require('../models')['logs']

let Log = {}

Log.getAll = async (req, res, next) => {
  const type = req.query.type
  const statusCode = req.query.statusCode
  const origin = req.query.origin

  if(type){
    model.findAll({where: {type: type}})
      .then(types => res.json(types))
  }

  if(statusCode){
    model.findAll({where: {statusCode: statusCode}})
      .then(status => res.json(status))
  }

  if(origin){
    model.findAll({where: {origin: origin}})
      .then(origins => res.json(origins))
  }

  const data = await model.findAll({})
   res.status(200).json({
     total: data.length,
     data
    })
}
  
  Log.getById = async (req, res, next) => {

    const LogId = req.params.logsId
    const data = await model.findOne({
      where: { id: LogId }
    })
  
    res.status(200).json(data)
  }
  
  Log.create = async (req, res, next) => {
    const result = await model.create(req.body)
  
    res.status(201).json({message: `Logs salvo na base de dados com sucesso: ${result}`})
  }
  
  Log.update = async (req, res, next) => {
    const LogId = req.params.logsId
    const result = await model.update(req.body, {
      where: { id: LogId }
    })
  
    res.status(200).json({ result })
  }
  
  Log.delete = async (req, res, next) => {
    const LogId = req.params.logsId
    const result = await model.destroy({
      where: { id: LogId }
    })
  
    res.status(204).json({ result })
  }

module.exports = Log







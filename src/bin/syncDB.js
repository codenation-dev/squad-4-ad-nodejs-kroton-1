#!/usr/bin/env node

const db = require('../models/index.js')

db.sequelize.sync()
  .then(() => process.exit(0))
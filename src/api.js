//express initialization
const express = require('express')
const app = express()
app.listen(3000, () => console.log('listening on 3000'))

const mc = require('mongodb').MongoClient
mc.connect('mongodb://192.168.1.109:27017', {useUnifiedTopology: true})
  .then(db => {
    console.log('DB OK')
    db.db('testdb').createCollection('testCol').then(col => console.log('collection OK'))
  })
  .catch(err => console.error(err))
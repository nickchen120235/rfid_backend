//express initialization
const express = require('express')
const app = express()
app.listen(4000, () => console.log('listening on 4000'))

//Middleware
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())

//MongoDB initialization
const mc = require('mongodb').MongoClient

mc.connect('mongodb://192.168.159.14:27017', {useUnifiedTopology: true})
  .then(db => {
    console.log('connection OK')
    const cardDB = db.db('RFID_CARD')
    const card_info = cardDB.collection('card_info')
    const card_record = cardDB.collection('card_record')

    //add card info
    app.post('/api/addCard', (req, res) => {
      console.log(`req.body: ${req.body}`)
      card_info.find({cardID: req.body.cardID}).toArray()
        .then(findRes => {
          console.log('findRes:')
          console.log(findRes)
          if(findRes.length === 0){
            card_info.insertOne(req.body)
              .then(insertRes => res.send(insertRes.result))
              .catch(err => console.error(err))
          }
          else {
            res.send('This card has been registered.')
          }
        })
      //res.redirect('#')
    })

    //remove card info
    app.delete('/api/delCard', (req, res) => {
      card_info.deleteOne()
    })

    //get all cards
    app.get('/api/getAll', (req, res) => {
      card_info.find({}, {projection: {_id: 0, name: 1, card: 1}}).toArray()
        .then(cards => {
          console.log(cards)
          res.send(cards)
        })
        .catch(err => console.error(err))
    })

    //add card record
    app.post('/api/addRecord', (req, res) => {
      card_info.find({cardID: req.body.cardID}).toArray()
        .then(findRes => {
          if(findRes.length){
            card_record.insertOne(req.body)
              .then(insertRes => console.log(insertRes.result))
              .catch(err => console.error(err))
          }
          else console.log('This card is not registered.')
        })
        .catch(err => console.error(err))
      res.redirect('#')
    })

  })
  .catch(err => console.error(err))
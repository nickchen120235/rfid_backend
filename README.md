# Backend
## Requirements
- Express.js
- MongoDB

## Type Definition
### card_info
```ts
{
  name: string,
  cardID: string,
  added: Date
}
```
### card_record
```ts
{
  cardID: string,
  last: Date
}
```

## API
|       URI      | Method | Request Type | Response Type |         Description         |
|:--------------:|:------:|:------------:|:-------------:|:---------------------------:|
|  /api/addCard  |  POST  |   card_info  |      bool     |        Add a new card       |
|  /api/delCard  |        |              |               |        Delete a card        |
|   /api/getAll  |   GET  |     none     |  card_info[]  |      Get all card info      |
| /api/addRecord |  POST  |  card_record |      bool     | Add a record if card exists |
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
});

/*
db.students.insert({name: "Dylann", home_state: "WA", lucky_number: 7, birthday: {month: 3, year: 2017}})
WriteResult({ "nInserted" : 1 })
> db.students.insert({name: "Matt", home_state: "WA", lucky_number: 12, birthday: {month: 4, year: 1992}})
WriteResult({ "nInserted" : 1 })
> db.students.insert({name: "Chris", home_state: "WA", lucky_number: 3, birthday: {month: 5, year: 1987}})
WriteResult({ "nInserted" : 1 })
> db.students.insert({name: "Sara", home_state: "WA", lucky_number: 8, birthday: {month: 6, year: 1992}})
WriteResult({ "nInserted" : 1 })
> db.students.insert({name: "Amber", home_state: "GA", lucky_number: 8, birthday: {month: 4, year: 1994}})
WriteResult({ "nInserted" : 1 })
> db.students.insert({name: "Roshni", home_state: "CA", lucky_number: 25, birthday: {month: 4, year: 1991}})
WriteResult({ "nInserted" : 1 })
> db.students.find({home_state: "CA"})
> db.students.find({home_state: "WA"}).pretty()
> db.students.find({lucky_number: {$gt: 3}})
> db.students.find({lucky_number: {$lte: 10}})
> db.students.update({}, {$set: {interests: ["coding", "brunch", "MongoDB"]}}) // single
> db.students.update({}, {$set: {interests: ["coding", "brunch", "MongoDB"]}}, true, true ) // all no duplicates
> db.students.updateMany({}, { $set: { interests: ["bullshit"] } })
> db.students.update( {name:"Amber"}, {$push: { interests:"singing" } } )
> db.students.update( {name:"Matt"}, {$push: { interests:"dancing" } } )
> db.students.update( {name:"Chris"}, {$set: { interests:["taxes"] } } )
> db.students.remove( {home_state: "CA"} )
> db.students.remove( {lucky_number: {$gte: 5}} )
> db.students.update({"home_state" : "WA"}, { $set: { number_of_belts: 1  } })
> db.students.update({}, {$rename:{"number_of_belts":"belts_earned"}}, false, true);
> db.students.updateMany({}, { $unset: {lucky_number: 0} }, false, true)
> db.students.updateMany({}, {$set: {updated_on: Date.now()}}, true, true )
*/
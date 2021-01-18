const express = require("express")
const Pusher = require("pusher")
const PushNotifications = require('@pusher/push-notifications-server');
// const generateVotes = require("./votegenerator");
const cors = require("cors")
const PORT = process.env.PORT || 3001
const mySampleRegions = [
  {regionname: '1', population:2189499, turnoutpercent: 51, totalvotes: 1116644, currentvotes: 0},
  {regionname: '2', population:2189499, turnoutpercent: 51, totalvotes: 1116644, currentvotes: 0},
  {regionname: '3', population:2189499, turnoutpercent: 51, totalvotes: 1116644, currentvotes: 0},
  {regionname: '4', population:2189499, turnoutpercent: 51, totalvotes: 1116644, currentvotes: 0},
  {regionname: '5', population:2189499, turnoutpercent: 51, totalvotes: 1116644, currentvotes: 0},
  {regionname: '6', population:2189499, turnoutpercent: 51, totalvotes: 1116644, currentvotes: 0},
  {regionname: '7', population:2189499, turnoutpercent: 51, totalvotes: 1116644, currentvotes: 0},
]
const sampleData = [
  [ 1, 'Alabama', 52, 4, 19, 10, 52,4, 19, 10, 'inprogress',0 ],
  [ 1, 'Delaware', 15, 6, 10, 12, 67,10,29,22 , 'inprogress', 1 ],
  [ 1, 'Florida', 25, 6, 3, 21, 92,16,32,43, 'inprogress' ,2],
  [ 1, 'Hawaii', 35, 14, 8, 12,127,30,40,55 , 'inprogress',3 ],
  [ 1, 'Idaho', 4, 16, 8, 21,131,46,48,71 , 'inprogress',4 ],
  [ 1, 'Kentucky', 12, 36, 8, 22, 143, 82,56,93, 'completed',5 ]
]
const allRegions = [
  'Alabama',
'Delaware',
'Florida',
'Hawaii',
'Idaho',
'Kentucky',
]
const app = express()
app.use(cors())
const pusher = new Pusher({
    appId: "1124234",
    key: "b691171de5f8ac605664",
    secret: "9b22dfa2b49d99cabeb2",
    cluster: "mt1",
    useTLS: true
  });

console.log(pusher)
var i = 0
setInterval(() => {
  if(i == 5){
    i = 0
    announce()
  }
  pusher.trigger("votes", "vote-event", {
    message: sampleData[1]
}).then(console.log).catch(e=> console.log(e))
  i++
}, 1000*60*20);

let beamsClient = new PushNotifications({
  instanceId: '6e70a6a0-a057-4c9d-b88d-95963f7fe209',
  secretKey: 'A31A51C3FD12980D9F72517FA2FBD9294A7CDC66F7076C6E3FB852F9C00B49C0'
});

function announce(){
  beamsClient.publishToInterests(['hello'], {
    web: {
      notification: {
        title: 'Election result',
        body: 'Election result has been announced and the winner is blue',
      }
    }
  }).then((publishResponse) => {
    console.log('Just published:', publishResponse.publishId);
  }).catch((error) => {
    console.log('Error:', error);
  });
}

app.get("/", function(req, res){
  i++
  res.send({message: sampleData[0]})
})
app.listen(PORT, (PORT)=> console.log("ready"))
const express = require("express")
const Pusher = require("pusher")
const PushNotifications = require('@pusher/push-notifications-server');
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
  [ 1, '1J5FVCE', 52, 4, 19, 10, 52,4, 19, 10, 'inprogress',0 ],
  [ 1, '2J5FVCE', 15, 6, 10, 12, 67,10,29,22 , 'inprogress', 1 ],
  [ 1, '3J5FVCE', 25, 6, 3, 21, 92,16,32,43, 'inprogress' ,2],
  [ 1, '4J5FVCE', 35, 14, 8, 12,127,30,40,55 , 'inprogress',3 ],
  [ 1, '5J5FVCE', 4, 16, 8, 21,131,46,48,71 , 'inprogress',4 ],
  [ 1, '6J5FVCE', 12, 36, 8, 22, 143, 82,56,93, 'completed',5 ]
]
const allRegions = [
  '1J5FVCE',
'2J5FVCE',
'3J5FVCE',
'4J5FVCE',
'5J5FVCE',
'6J5FVCE',
]
const app = express()
app.use((cors()))
const pusher = new Pusher({
    appId: process.env.appId,
    key: process.env.key,
    secret: process.env.secret,
    cluster: process.env.cluster,
    useTLS: true
  });

var i = 0


setInterval(() => {
  if(i == 5){
    i = 0
    announce()
  }
  pusher.trigger("my-channel", "my-event", {
    message: sampleData[i]
}).then(console.log).catch(e=> console.log(e))
  i++
}, 1000 * 60);

let beamsClient = new PushNotifications({
  instanceId: process.env.instanceId,
  secretKey: process.env.secrekey
});

function announce(){
  beamsClient.publishToInterests(['vote-event'], {
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
app.listen(PORT, ()=> console.log("running"))
const express = require("express")
const Pusher = require("pusher-js")
const PushNotifications = require('@pusher/push-notifications-server');
const cors = require("cors")
const PORT = process.env.PORT || 3001


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
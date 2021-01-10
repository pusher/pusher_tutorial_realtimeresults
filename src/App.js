import {useState, useEffect} from "react"
import States from "./userComponents/states/index"
import * as PusherPushNotifications from "@pusher/push-notifications-web"
import Pusher from 'pusher-js';
import Nav from "./userComponents/header/nav/nav";
import Footer from "./userComponents/footer/footer";

function App() {
  const sampleData = [
    [ 1, 'Alabama', 0, 0, 0, 0, 0, 0, 0, 0, 'inprogress' ],
    [ 1, 'Delaware', 0, 0, 0, 0, 0, 0, 0, 0, 'inprogress' ],
    [ 1, 'Florida', 0, 0, 0, 0, 0, 0, 0, 0, 'inprogress' ],
    [ 1, 'Hawaii', 0, 0, 0, 0, 0, 0, 0, 0, 'inprogress' ],
    [ 1, 'Idaho', 0, 0, 0, 0, 0, 0, 0, 0, 'inprogress' ],
    [ 1, 'Kentucky', 0, 0, 0, 0, 0, 0, 0, 0, 'inprogress' ]
  ]
  const [data, updateData] = useState(sampleData)
  const [total, updateTotal] = useState({message: sampleData[0]})
  const [subStatus, updateSubStatus] = useState("subscribe")

  const pusher = new Pusher("b691171de5f8ac605664", {
    cluster: "mt1"//process.env.REACT_APP_CLUSTER
  });
  console.log(pusher.channel("my-channel"))
  // const channel = pusher.subscribe('my-channel');
  
  // channel.bind('client-voteevent', function(dataFromServer) {
  //   updateData(data =>{
  //     // console.log(data.message)
  //     // console.log({message: data.message.splice(Number(dataFromServer.message[11]), 1, dataFromServer.message)}, "kkkkkkkkkkkkk")
  //     // const arr = [...dat
  //     data.splice(Number(dataFromServer.message[11]), 1, dataFromServer.message)
  //     const arr = [...data]
  //     return arr
  //   }
  //   )
   
  //   updateTotal(dataFromServer)
    
    
  // });
  useEffect(async ()=>{
    const res = await fetch("https://cryptic-lake-12063.herokuapp.com/")
    const json = await res.json()
    updateTotal(json)
    updateData(data =>{
      data.splice(Number(json.message[11]), 1, json.message)
      const arr = [...data]
      return arr
    }
    )
  }, [])
  const beamsClient = new PusherPushNotifications.Client({
    instanceId: "6e70a6a0-a057-4c9d-b88d-95963f7fe209",
  })

  beamsClient.start()
  .then(() => beamsClient.getDeviceId())
  .then(deviceId => {
    console.log(deviceId) // Will log something like web-1234-1234-1234-1234
  }).catch(e => console.error('Could not get device id', e));
 
  function sub(){
    if(subStatus === "unsubscribe"){
      beamsClient.start()
      .then(() => beamsClient.removeDeviceInterest('hello'))
      .then(() => {
        // Build something beatiful 🌈
        alert("You will not be notified when voting is completed")
        updateSubStatus("subscribe")
      });
    }
    beamsClient.start()
    .then(() => beamsClient.addDeviceInterest('vote-event'))
    .then(() => {
      // Build something beatiful 🌈
      alert("You will notified when voting is completed")
      updateSubStatus("unsubscribe")
    });
  }

  return (
    <div>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", backgroundColor:"#8731D2"}}><Nav /><button onClick={()=> sub()} style={{height:"30px", margin: 15}}>{subStatus}</button></div>
      <div style={{display:"flex", justifyContent:"space-around"}}><States total={total} data={data} /></div>
      <div><Footer/></div>
    </div>
  );
}

export default App;

import {useState, useEffect} from "react"
import States from "./userComponents/states/index"
import * as PusherPushNotifications from "@pusher/push-notifications-web"
import Pusher from 'pusher-js';
import Nav from "./userComponents/header/nav/nav";
import Footer from "./userComponents/footer/footer";
import icon from "./Blue icon.jpg"
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

  const pusher = new Pusher("b691171de5f8ac605664", {//process.env.REACT_APP_KEY
    cluster: "mt1" //process.env.REACT_APP_CLUSTER
  });
  const channel = pusher.subscribe('votes');
  
  channel.bind('vote-event', function(dataFromServer) {
    updateData(data =>{
      
      data.splice(Number(dataFromServer.message[11]), 1, dataFromServer.message)
      const arr = [...data]
      return arr
    }
    )
   
    updateTotal(dataFromServer)
    
    
  });
  useEffect(async ()=>{
    const res = await fetch("https://cryptic-lake-12063.herokuapp.com/")//https://cryptic-lake-12063.herokuapp.com/
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
    instanceId: "6e70a6a0-a057-4c9d-b88d-95963f7fe209"// process.env.REACT_APP_INSTANCEID,
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
    <div style={{display:" flex", flexDirection: "row", width:"100%"}}>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"center", width: "10%", backgroundColor: "#F2F1F9", paddingTop:"5px"}}>
            <img src={icon} width="38px" height="38px" />
        </div>
      <div style={{width: "90%"}}>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", backgroundColor:"", marginTop:"50px"}}><Nav /><button onClick={()=> sub()} style={{height:"30px", margin: 15, color:"#300D4F", backgroundColor:"", fontFamily:"Maison Neue", borderRadius:"5px"}}>{subStatus}</button></div>
      <hr />
      <div style={{display:"flex", justifyContent:"space-around"}}><States total={total} data={data} /></div>
      <div><Footer/></div>
      </div>
    </div>
  );
}

export default App;

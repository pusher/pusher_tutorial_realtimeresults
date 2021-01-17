import {useState, useEffect} from "react"
import States from "./userComponents/states/index"
import * as PusherPushNotifications from "@pusher/push-notifications-web"
import Pusher from 'pusher-js';
import Nav from "./userComponents/header/nav/nav";
import Footer from "./userComponents/footer/footer";
import icon from "./Blue icon.png"
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

  const pusher = new Pusher(process.env.REACT_APP_KEY, {//
    cluster: process.env.REACT_APP_CLUSTER
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
    instanceId:  process.env.REACT_APP_INSTANCEID,
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
    <div style={{display:" flex", flexDirection: "row"}}>
      <div style={{display:"flex", flexDirection:"row", justifyContent:"center",height:"840px", width: "104px", backgroundColor: "#F2F1F9", paddingTop:"5px"}}>
            <img src={icon} width="30px" height="40px" />
        </div>
      <div style={{marginLeft:"65px"}}>
      <div style={{display:"flex", justifyContent: "space-between", backgroundColor:"", marginTop:"100px"}}><Nav /><button onClick={()=> sub()} style={{height:"30px", color:"#300D4F", backgroundColor:"", fontFamily:"Maison Neue", borderRadius:"5px", marginRight:"10%"}}>{subStatus}</button></div>
      <hr style={{width:"80em", borderColor:"#EEEBFF"}}/>
      <div><States total={total} data={data} /></div>
      <div><Footer/></div>
      </div>
    </div>
  );
}

export default App;

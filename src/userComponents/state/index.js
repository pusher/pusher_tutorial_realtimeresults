import { useState } from "react"

import Modal from "../modal/index"
export default function State(props) {
    console.log(props)
    const [display, setDisplay] = useState('none')  
  return (
      <main style={{ width:"100%", marginBottom:"", marginTop:"15px", borderRadius:"8px", padding:"1%"}}>
        <div style={{display:"flex", flexDirection:"row", justifyContent: "space-between", backgroundColor:"#F2F1F9"}}>
        <div>
        <h4 style={{color: "#300D4F",fontFamily:"Maison Neue", fontWeight:500, fontSize:"20px", letterSpacing: "0.5px"}}><span style={{color: props.color, fontSize:"30px", fontWeight:900}}>|</span> {props.name}</h4>
            <div>
                
            </div>
            <div>
                <p style={{fontFamily:"Maison Neue", color: "#300D4F", fontWeight:700}}>Total votes: {props.total.message[props.index + 6]} </p>
            </div>
        </div>     
        <div>
            <button style={{marginRight: "20px", marginTop: "30px", color: "white", backgroundColor:"#7F7FA3", width:"71px", height: "36px", borderRadius:"4px"}} onClick={()=>setDisplay("")}>More</button>
            {/* <button>bid</button> */}
        </div> 
         </div>
        <Modal index={props.index} display={display} regions={props.data} src={props.src} setDisplay={setDisplay} col={props.color} candidate={props.name} />
      </main>
  )
}

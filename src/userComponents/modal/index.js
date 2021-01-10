import { useState } from "react";
export default function Modal(props){
    // const x = props.status
    const regions = [['regx', [0]], ['regx', [0]]]
    // const [reg, updateReg] = useState(props.regions) // region
    console.log(props.regions)
    return (
        <main style={{position:"fixed", display: props.display, zIndex:2, backgroundColor:"#300D4F", opacity:0.95, color:"white", width:"60%", height: "50%", top:"15%",left:"20%", border:"1px black solid", borderRadius:"5px"}}>
               <p className="" style={{float:"right", color:"white"}} onClick={()=> props.setDisplay("none")}>X</p>
               <table style={{textAlign:"center", width:"100%"}}>
  <thead style={{color: "#2AE9AA", fontSize:"19px"}}>
    <tr>
      <th>Region Name</th>
      <th>Votes</th>
      <th>Status</th>

    </tr>
  </thead>
  <tbody>
    {props.regions.map((region)=>{
        return <tr>
        <td>{region[1]}</td>
        <td>{region[props.index + 2]}</td>
        <td>{region[10]}</td>
      </tr>
    })}
  </tbody> 
</table>
        </main>
    )
}
import Nav from "../header/nav/nav"
export default function Modal(props){
    console.log(props.regions)
    return (
      <div style={{display:"flex", flexDirection:"row", width:"100%"}}>
        <div style={{position:"fixed", display: props.display, zIndex:2, backgroundColor:"white", color:"white", width:"91%", height: "100%", top:"0%",right:"0", borderRadius:"5px"}}>
               <div style={{marginTop:"100px", marginLeft:"20px"}}><Nav /></div>
               <hr style={{borderColor:"#EEEBFF", marginLeft:"20px", width:"80%"}}/>
               <button style={{float:"left", color:"white", backgroundColor:"#7F7FA3", height:"36px", width:"85.31px", borderRadius:"4px",marginLeft:"20px"}} onClick={()=> props.setDisplay("none")}>◁ Back</button>
               <h3 style={{fontWeight: 500,fontSize:"34px", fontFamily:"Maison Neue", color:"#300D4F", marginLeft:"20px", marginTop:"5%"}}><span style={{color: props.col, fontWeight:900, fontSize:"34px"}}>|</span >{props.candidate}</h3>

               <table style={{textAlign:"left", width:"727px", marginLeft:"20px"}}>
  <thead style={{color: "#300D4F", fontSize:"20px", fontFamily:"Maison Neue", fontWeight:500}}>
    <tr style={{backgroundColor: "#F7F5FF"}}>
      <th>Region Name</th>
      <th>Votes</th>
      <th>Status</th>

    </tr>
  </thead>
  <tbody>
    {props.regions.map((region, i)=>{
        return <tr style={{backgroundColor: i%2== 0? "white": "#F7F5FF", color:"#6A52FF", height:"47px", fontFamily:"Maison Neue"}}>
        <td>{region[1]}</td>
        <td>{region[props.index + 2]}</td>
        <td>{region[10]}</td>
      </tr>
    })}
  </tbody> 
</table>
        </div>
</div>
    )
}
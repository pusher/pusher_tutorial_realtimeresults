import Nav from "../header/nav/nav"
export default function Modal(props){
    console.log(props.regions)
    return (
      <div style={{display:"flex", flexDirection:"row", width:"100%"}}>
        <div style={{position:"fixed", transition:"ease-in", display: props.display, zIndex:2, backgroundColor:"white", opacity:0.95, color:"white", width:"90%", height: "100%", top:"0%",right:"0", borderRadius:"5px"}}>
               <div style={{marginTop: "5%", marginLeft:"9%"}}><Nav /></div>
               <hr />
               <button style={{float:"left", color:"white", backgroundColor:"#7F7FA3", height:"36px", width:"85.31px", borderRadius:"4px",marginLeft:"9%"}} onClick={()=> props.setDisplay("none")}>◁ Back</button>
               <h3 style={{fontSize:"34px", color:"#300D4F", marginLeft:"9%", marginTop:"5%"}}><span style={{color: props.col, fontWeight:700, fontSize:"40px"}}>|</span>{props.candidate}</h3>

               <table style={{textAlign:"center", width:"100%"}}>
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
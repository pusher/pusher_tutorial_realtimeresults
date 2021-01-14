import State from "../state/index"
import states from "./states"
export default function States(props) {
    return (
        <main className="" style={{display:"flex", flexWrap:"wrap", justifyContent:"space-around", width:"100%", marginLeft:"0%", padding:"0px"}}>
           {states.map((state, i)=>{
               return <State index={i} key={i} src={state.src} desc={state.desc} name={state.name} total={props.total} data={props.data} color={state.color}/>
           })}
        </main>
    )
  }

//   src, desc, price 
  
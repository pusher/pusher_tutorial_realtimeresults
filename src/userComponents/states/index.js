import State from "../state/index"
import states from "./states"
export default function States(props) {
    return (
        <main className="" style={{display:"flex", flexWrap:"wrap", justifyContent:"space-around", width:"80%"}}>
           {states.map((state, i)=>{
               return <State index={i} key={i} src={state.src} desc={state.desc} name={state.name} total={props.total} data={props.data} />
           })}
        </main>
    )
  }

//   src, desc, price 
  
import State from "../state/index"
import states from "./states"
export default function States(props) {
    return (
        <main className="" style={{width:"539px", marginTop:"70px"}}>
           {states.map((state, i)=>{
               return <State index={i} key={i} src={state.src} desc={state.desc} name={state.name} total={props.total} data={props.data} color={state.color}/>
           })}
        </main>
    )
  }

//   src, desc, price 
  
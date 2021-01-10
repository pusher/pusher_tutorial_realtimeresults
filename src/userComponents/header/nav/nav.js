import navigations from './navlinks'
import logo from "../pusher_logo.png"
export default function Nav() {
  return (
      <main style={{display:"flex"}}>
        <span style={{display:"flex", flexDirection: "row"}} ><img height="100px" width="150px" alt="pusher logo" src={logo} /></span>
        <div className="" style={{display:"flex", flexDirection:"row", }}>
            {navigations.map((navigation)=>{
                return  <p className="">{navigation}</p>
            })}
        </div>       
      </main>
  )
}

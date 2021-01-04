import navigations from './navlinks'
export default function Nav() {
  return (
      <main style={{display:"flex"}}>
        <h1 style={{width:"100%"}}>Pusher Tutorial</h1>
        <div className="" style={{display:"flex", flexDirection:"row", }}>
            {navigations.map((navigation)=>{
                return  <p className="">{navigation}</p>
            })}
        </div>       
      </main>
  )
}

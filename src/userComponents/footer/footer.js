import sampleData from './allregions'
export default function Footer() {
  return (
      <main style={{display:"flex",flexDirection:"column", justifyContent:"space-around", bottom:0}}>
        <h1 style={{width:"100%"}}>Available regions</h1>
        <div className="" style={{display:"flex", flexDirection:"row", }}>
            {sampleData.map((navigation)=>{
                return  <p style={{margin: "2px"}} className="">{navigation},</p>
            })}
        </div>       
      </main>
  )
}

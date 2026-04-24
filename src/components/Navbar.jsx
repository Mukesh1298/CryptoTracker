
function Navbar(){
    return(
        <>
<div className="bg-[#1e3eca] w-full flex items-center justify-between mb-6 mr-0 text-white">
        <div className="flex items-center ">
        <img src="/favicon.webp" alt="logo" className="h-16 w-16 rounded-full mr-6" />
        <h1 className="text-xl font-bold">CryptoTrack</h1>
        </div>
  
      <div className="border-b-2 border-blue-400 pb-1">
          Coins
        </div>
   
        
       
      </div>
      </>
    )
}
export default Navbar;
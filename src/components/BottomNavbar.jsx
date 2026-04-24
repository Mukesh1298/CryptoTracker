
import { Link } from "react-router-dom";
function BottomNavbar(){
    return (
       <> 
    <div className="fixed bottom-0 left-0 right-0 bg-blue-500 p-3 flex justify-around text-sm mt-6">
        <Link to="/">Coins</Link>
        <Link to="/market">Market</Link>
        <Link to="/Charts">Charts</Link>
       
       
      </div>

    </>
    )
}
export default BottomNavbar;
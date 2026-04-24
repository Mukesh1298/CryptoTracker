import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Market from "./pages/Market";
import ChartPage from "./pages/ChartPage";
import Coins from "./pages/Coins";
function App() {


  return (
    <>
     <div className="bg-slate-950 text-white min-h-screen p-4 font-sans">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins/>}/>
        <Route path="/market" element={<Market/>}/>
         <Route path="/charts" element={<ChartPage/>}/>
      </Routes>
      </BrowserRouter>



     
</div>
    </>
  )
}

export default App

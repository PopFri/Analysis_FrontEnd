import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import SelectCol from "./pages/SelectCol"
import SelectFilter from "./pages/SelectFilter"
import FilteringResult from "./pages/FilteringResult"
import MonitoringPage from "./pages/MonitoringPage"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/column/:processId" element={<SelectCol />} />
          <Route path="/condition/:processId" element={<SelectFilter />} />
          <Route path="/result/:processId" element={<FilteringResult />} />
          <Route path="/monitoring" element={<MonitoringPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

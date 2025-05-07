import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import SelectCol from "./pages/SelectCol"
import SelectFilter from "./pages/SelectFilter"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/column" element={<SelectCol />} />
          <Route path="/condition" element={<SelectFilter />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

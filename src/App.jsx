import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import SelectCol from "./pages/SelectCol"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/column" element={<SelectCol />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

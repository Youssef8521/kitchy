import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChefMenuScreen } from './components/ChefMenuScreen'
import { HomeScreen } from './components/HomeScreen'

function App() {
  return (
    <div className="min-h-dvh bg-chrome">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/chef/:chefId" element={<ChefMenuScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

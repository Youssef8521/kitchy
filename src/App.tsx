import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { CartProvider } from './cart/CartContext'
import { BottomNav } from './components/BottomNav'
import { CartScreen } from './components/CartScreen'
import { ChefMenuScreen } from './components/ChefMenuScreen'
import { HomeScreen } from './components/HomeScreen'
import { PlaceholderScreen } from './components/PlaceholderScreen'

function AppLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-chrome">
      {/*
        Fixed viewport height so the home <main> is the scroll container.
        Otherwise the column grows with content and the document scrolls —
        HomeScreen's scroll listener never sees scrollTop change.
      */}
      <div className="mx-auto flex h-dvh min-h-0 w-full max-w-[390px] flex-col overflow-hidden bg-cream shadow-xl ring-1 ring-border-subtle">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route
              path="/search"
              element={<PlaceholderScreen title="Search" />}
            />
            <Route path="/pay" element={<PlaceholderScreen title="Pay" />} />
            <Route path="/more" element={<PlaceholderScreen title="More" />} />
            <Route path="/chef/:chefId" element={<ChefMenuScreen />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App

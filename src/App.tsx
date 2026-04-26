import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { CartProvider } from './cart/CartContext'
import { BottomNav } from './components/BottomNav'
import { CartScreen } from './components/CartScreen'
import { ChefMenuScreen } from './components/ChefMenuScreen'
import { CheckoutScreen } from './components/CheckoutScreen'
import { HomeScreen } from './components/HomeScreen'
import { InitialAccountScreen } from './components/InitialAccountScreen.tsx'
import { MoreScreen } from './components/MoreScreen.tsx'
import { OrderDetailsScreen } from './components/OrderDetailsScreen'
import { PlaceholderScreen } from './components/PlaceholderScreen'
import { StartScreen } from './components/StartScreen.tsx'
import { useProfile } from './profile/ProfileContext'

function RequireProfile({ children }: { children: React.ReactNode }) {
  const { hasProfile } = useProfile()
  if (!hasProfile) return <Navigate to="/" replace />
  return children
}

function AppLayout() {
  const { hasProfile } = useProfile()

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
      {hasProfile ? <BottomNav /> : null}
    </div>
  )
}

function App() {
  const { hasProfile } = useProfile()

  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={hasProfile ? <HomeScreen /> : <StartScreen />} />
            <Route path="/onboarding" element={<InitialAccountScreen />} />

            <Route
              path="/cart"
              element={
                <RequireProfile>
                  <CartScreen />
                </RequireProfile>
              }
            />
            <Route
              path="/search"
              element={
                <RequireProfile>
                  <PlaceholderScreen title="Search" />
                </RequireProfile>
              }
            />
            <Route
              path="/pay"
              element={
                <RequireProfile>
                  <CheckoutScreen />
                </RequireProfile>
              }
            />
            <Route
              path="/more"
              element={
                <RequireProfile>
                  <MoreScreen />
                </RequireProfile>
              }
            />
            <Route path="/chef/:chefId" element={<ChefMenuScreen />} />
            <Route path="/order/:orderId" element={<OrderDetailsScreen />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App

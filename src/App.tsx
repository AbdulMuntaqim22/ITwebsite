import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ContentProvider } from './context/ContentContext'
import { ThemeProvider } from './context/ThemeContext'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Services } from './pages/Services'
import { Plans } from './pages/Plans'
import { Contact } from './pages/Contact'
import { AuthProvider } from './admin/AuthContext'
import { ProtectedRoute } from './admin/ProtectedRoute'
import { AdminLayout } from './admin/AdminLayout'
import { AdminLogin } from './admin/pages/Login'
import { AdminOverview } from './admin/pages/Overview'
import { AdminSubmissions } from './admin/pages/Submissions'
import { AdminServices } from './admin/pages/ServicesAdmin'
import { AdminPlans } from './admin/pages/PlansAdmin'
import { AdminContactSettings } from './admin/pages/ContactSettings'
import { AdminCompanySettings } from './admin/pages/CompanySettings'
import { AdminPortfolio } from './admin/pages/PortfolioAdmin'

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <ContentProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="services" element={<Services />} />
                <Route path="plans" element={<Plans />} />
                <Route path="contact" element={<Contact />} />
              </Route>

              <Route path="/mza/portal" element={<AdminLogin />} />
              <Route path="/mza" element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<AdminOverview />} />
                  <Route path="submissions" element={<AdminSubmissions />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="plans" element={<AdminPlans />} />
                  <Route path="portfolio" element={<AdminPortfolio />} />
                  <Route path="contact" element={<AdminContactSettings />} />
                  <Route path="company" element={<AdminCompanySettings />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
        </ContentProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

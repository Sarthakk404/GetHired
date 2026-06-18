import { BrowserRouter, Routes, Route } from "react-router-dom"
import DashboardLayout from "@/components/layout/DashboardLayout"
import Dashboard from "@/pages/Dashboard"
import JobsTable from "@/pages/JobsTable"
import CreateJob from "@/pages/CreateJob"
import UpdateJob from "@/pages/UpdateJob"
import AnalyticsPage from "@/pages/Analytics"
import Settings from "@/pages/Settings"
import { Toaster } from "@/components/ui/toaster"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/jobs" element={<JobsTable />} />
          <Route path="/create" element={<CreateJob />} />
          <Route path="/edit/:id" element={<UpdateJob />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

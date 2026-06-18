import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Briefcase,
  CheckCircle2,
  CalendarCheck,
  Target,
  Activity,
} from "lucide-react"
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  Legend,
} from "recharts"
import { fetchJobs, fetchAnalytics } from "@/lib/api"
import type { Job, Analytics as AnalyticsType } from "@/types"
import { STATUS_COLORS, STATUS_OPTIONS } from "@/types"
import StatCard from "@/components/shared/StatCard"
import AnimatedCard from "@/components/shared/AnimatedCard"
import { StatsSkeleton, ChartSkeleton } from "@/components/shared/LoadingSkeleton"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const COLORS = ["#7C3AED", "#2563EB", "#06B6D4", "#22C55E", "#F59E0B", "#EF4444"]

export default function AnalyticsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [analytics, setAnalytics] = useState<AnalyticsType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [jobsData, analyticsData] = await Promise.all([
          fetchJobs(),
          fetchAnalytics(),
        ])
        setJobs(jobsData)
        setAnalytics(analyticsData)
      } catch {
        console.error("Failed to load analytics")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const statusData = STATUS_OPTIONS.map((s) => ({
    name: s,
    value: jobs.filter((j) => j.Status === s).length,
    color: STATUS_COLORS[s],
  })).filter((d) => d.value > 0)

  const typeCount: Record<string, number> = {}
  jobs.forEach((j) => {
    typeCount[j.Job_Type] = (typeCount[j.Job_Type] || 0) + 1
  })
  const typeData = Object.entries(typeCount).map(([name, value], i) => ({
    name,
    value,
    color: COLORS[i % COLORS.length],
  }))

  const workModeCount: Record<string, number> = {}
  jobs.forEach((j) => {
    workModeCount[j.Work_Mode] = (workModeCount[j.Work_Mode] || 0) + 1
  })
  const workModeData = Object.entries(workModeCount).map(([name, value], i) => ({
    name,
    value,
    color: COLORS[i % COLORS.length],
  }))

  const monthlyData: Record<string, { Applied: number; Interviewing: number; Accepted: number; Rejected: number }> = {}
  jobs.forEach((j) => {
    const month = j.Application_Date.slice(0, 7)
    if (!monthlyData[month]) {
      monthlyData[month] = { Applied: 0, Interviewing: 0, Accepted: 0, Rejected: 0 }
    }
    if (j.Status === "Applied") monthlyData[month].Applied++
    else if (j.Status === "Interviewing" || j.Status === "Interview Scheduled") monthlyData[month].Interviewing++
    else if (j.Status === "Accepted") monthlyData[month].Accepted++
    else if (j.Status === "Rejected") monthlyData[month].Rejected++
  })
  const monthlyChartData = Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, counts]) => ({
      month: new Date(month + "-01").toLocaleString("default", { month: "short", year: "2-digit" }),
      ...counts,
    }))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-border bg-surface p-3 shadow-lg">
          <p className="text-sm font-medium text-white mb-1">{label}</p>
          {payload.map((entry: any, i: number) => (
            <p key={i} className="text-xs" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="h-8 w-48 bg-surface-hover rounded-lg animate-pulse mb-2" />
          <div className="h-4 w-64 bg-surface-hover rounded-lg animate-pulse" />
        </div>
        <StatsSkeleton />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Track your job search performance with data-driven insights
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Applications"
          value={analytics?.Total_Jobs ?? 0}
          icon={Briefcase}
          color="#7C3AED"
          delay={0}
        />
        <StatCard
          title="Interviews"
          value={analytics?.Interviews ?? 0}
          icon={CalendarCheck}
          color="#2563EB"
          delay={0.1}
        />
        <StatCard
          title="Offers"
          value={analytics?.Offers ?? 0}
          icon={CheckCircle2}
          color="#22C55E"
          delay={0.2}
        />
        <StatCard
          title="Offer Rate"
          value={`${analytics?.Offer_Rate ?? 0}%`}
          icon={Target}
          color="#06B6D4"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedCard delay={0.2}>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-primary" />
            Status Distribution
          </h2>
          {statusData.length === 0 ? (
            <p className="text-sm text-muted-foreground py-12 text-center">
              No data available yet
            </p>
          ) : (
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={280}>
                <RePieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {statusData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </RePieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {statusData.map((d) => (
                  <div key={d.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: d.color }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {d.name}
                    </span>
                    <span className="text-xs font-medium text-white">
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </AnimatedCard>

        <AnimatedCard delay={0.3}>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-secondary" />
            Employment Type
          </h2>
          {typeData.length === 0 ? (
            <p className="text-sm text-muted-foreground py-12 text-center">
              No data available yet
            </p>
          ) : (
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={280}>
                <RePieChart>
                  <Pie
                    data={typeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {typeData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </RePieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {typeData.map((d) => (
                  <div key={d.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: d.color }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {d.name}
                    </span>
                    <span className="text-xs font-medium text-white">
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </AnimatedCard>
      </div>

      <AnimatedCard delay={0.4}>
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-accent" />
          Application Trends
        </h2>
        {monthlyChartData.length === 0 ? (
          <p className="text-sm text-muted-foreground py-12 text-center">
            No data available yet
          </p>
        ) : (
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart data={monthlyChartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#27272A"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="#71717A"
                  tick={{ fill: "#71717A", fontSize: 12 }}
                  axisLine={{ stroke: "#27272A" }}
                />
                <YAxis
                  stroke="#71717A"
                  tick={{ fill: "#71717A", fontSize: 12 }}
                  axisLine={{ stroke: "#27272A" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="Applied"
                  fill="#F59E0B"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={24}
                />
                <Bar
                  dataKey="Interviewing"
                  fill="#2563EB"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={24}
                />
                <Bar
                  dataKey="Accepted"
                  fill="#22C55E"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={24}
                />
                <Bar
                  dataKey="Rejected"
                  fill="#EF4444"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={24}
                />
                <Legend
                  wrapperStyle={{ fontSize: 12, color: "#A1A1AA" }}
                />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        )}
      </AnimatedCard>

      <AnimatedCard delay={0.5}>
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-success" />
          Performance Metrics
        </h2>
        {jobs.length === 0 ? (
          <p className="text-sm text-muted-foreground py-12 text-center">
            No data available yet
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-lg bg-surface-hover/50 p-5">
              <p className="text-sm text-muted-foreground mb-1">Interview Rate</p>
              <p className="text-2xl font-bold text-white">
                {analytics?.Interview_Rate ?? 0}%
              </p>
              <div className="mt-3 h-1.5 rounded-full bg-surface-hover overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(analytics?.Interview_Rate ?? 0, 100)}%`,
                  }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full rounded-full bg-gradient-to-r from-secondary to-accent"
                />
              </div>
            </div>

            <div className="rounded-lg bg-surface-hover/50 p-5">
              <p className="text-sm text-muted-foreground mb-1">Offer Rate</p>
              <p className="text-2xl font-bold text-white">
                {analytics?.Offer_Rate ?? 0}%
              </p>
              <div className="mt-3 h-1.5 rounded-full bg-surface-hover overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(analytics?.Offer_Rate ?? 0, 100)}%`,
                  }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full rounded-full bg-gradient-to-r from-success to-green-400"
                />
              </div>
            </div>

            <div className="rounded-lg bg-surface-hover/50 p-5">
              <p className="text-sm text-muted-foreground mb-1">Success Rate</p>
              <p className="text-2xl font-bold text-white">
                {jobs.length > 0
                  ? Math.round(
                      (jobs.filter((j) => j.Status === "Accepted").length /
                        (jobs.filter((j) => j.Status !== "Applied").length || 1)) *
                        100
                    )
                  : 0}
                %
              </p>
              <div className="mt-3 h-1.5 rounded-full bg-surface-hover overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(
                      jobs.length > 0
                        ? Math.round(
                            (jobs.filter((j) => j.Status === "Accepted").length /
                              (jobs.filter((j) => j.Status !== "Applied").length ||
                                1)) *
                              100
                          )
                        : 0,
                      100
                    )}%`,
                  }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                />
              </div>
            </div>

            <div className="rounded-lg bg-surface-hover/50 p-5">
              <p className="text-sm text-muted-foreground mb-1">Response Rate</p>
              <p className="text-2xl font-bold text-white">
                {jobs.length > 0
                  ? Math.round(
                      ((jobs.length -
                        jobs.filter((j) => j.Status === "Applied").length) /
                        jobs.length) *
                        100
                    )
                  : 0}
                %
              </p>
              <div className="mt-3 h-1.5 rounded-full bg-surface-hover overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(
                      jobs.length > 0
                        ? Math.round(
                            ((jobs.length -
                              jobs.filter((j) => j.Status === "Applied").length) /
                              jobs.length) *
                              100
                          )
                        : 0,
                      100
                    )}%`,
                  }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full rounded-full bg-gradient-to-r from-warning to-orange-400"
                />
              </div>
            </div>
          </div>
        )}
      </AnimatedCard>
    </div>
  )
}

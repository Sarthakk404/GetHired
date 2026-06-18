import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Briefcase,
  CheckCircle2,
  CalendarCheck,
  XCircle,
  TrendingUp,
  Clock,
  Building2,
  MapPin,
  ExternalLink,
} from "lucide-react"
import { fetchJobs, fetchAnalytics } from "@/lib/api"
import type { Job, Analytics } from "@/types"
import StatCard from "@/components/shared/StatCard"
import AnimatedCard from "@/components/shared/AnimatedCard"
import { StatsSkeleton, ChartSkeleton } from "@/components/shared/LoadingSkeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { STATUS_COLORS } from "@/types"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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
        console.error("Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const recentJobs = jobs.slice(0, 5)
  const recentOffers = jobs.filter((j) => j.Status === "Accepted").slice(0, 5)
  const statusCounts = {
    Applied: jobs.filter((j) => j.Status === "Applied").length,
    Interviewing:
      jobs.filter(
        (j) =>
          j.Status === "Interviewing" || j.Status === "Interview Scheduled"
      ).length,
    Rejected: jobs.filter((j) => j.Status === "Rejected").length,
    Accepted: jobs.filter((j) => j.Status === "Accepted").length,
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <SkeletonTitle />
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
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your job search journey
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
          title="Rejected"
          value={statusCounts.Rejected}
          icon={XCircle}
          color="#EF4444"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatedCard delay={0.2}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Status Breakdown</h2>
          </div>
          <div className="space-y-4">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{status}</span>
                  <span className="text-white font-medium">{count}</span>
                </div>
                <div className="h-2 rounded-full bg-surface-hover overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(count / Math.max(jobs.length, 1)) * 100}%`,
                    }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${STATUS_COLORS[status as keyof typeof STATUS_COLORS]}, ${STATUS_COLORS[status as keyof typeof STATUS_COLORS]}88)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.3}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Key Metrics</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-surface-hover/50 p-4">
              <TrendingUp className="w-5 h-5 text-primary mb-2" />
              <p className="text-2xl font-bold text-white">
                {analytics?.Offer_Rate ?? 0}%
              </p>
              <p className="text-xs text-muted-foreground">Offer Rate</p>
            </div>
            <div className="rounded-lg bg-surface-hover/50 p-4">
              <CalendarCheck className="w-5 h-5 text-secondary mb-2" />
              <p className="text-2xl font-bold text-white">
                {analytics?.Interview_Rate ?? 0}%
              </p>
              <p className="text-xs text-muted-foreground">Interview Rate</p>
            </div>
            <div className="rounded-lg bg-surface-hover/50 p-4">
              <Clock className="w-5 h-5 text-accent mb-2" />
              <p className="text-2xl font-bold text-white">
                {jobs.length > 0
                  ? Math.max(
                      1,
                      Math.round(
                        jobs.filter((j) => j.Status !== "Applied").length /
                          Math.max(
                            jobs.filter((j) => j.Status === "Applied").length,
                            1
                          ) *
                          100
                      )
                    )
                  : 0}
                %
              </p>
              <p className="text-xs text-muted-foreground">Response Rate</p>
            </div>
            <div className="rounded-lg bg-surface-hover/50 p-4">
              <XCircle className="w-5 h-5 text-error mb-2" />
              <p className="text-2xl font-bold text-white">
                {jobs.length > 0
                  ? Math.round(
                      (statusCounts.Rejected / jobs.length) * 100
                    )
                  : 0}
                %
              </p>
              <p className="text-xs text-muted-foreground">Rejection Rate</p>
            </div>
          </div>
        </AnimatedCard>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AnimatedCard delay={0.4}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Applications</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/jobs")}
            >
              View All
            </Button>
          </div>
          {recentJobs.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No applications yet. Start by creating your first job entry.
            </p>
          ) : (
            <div className="space-y-2">
              {recentJobs.map((job, i) => (
                <motion.div
                  key={job.Id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-hover/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{job.Position}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{job.Company}</span>
                        <span>·</span>
                        <MapPin className="w-3 h-3" />
                        <span>{job.Company_Location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        job.Status === "Accepted"
                          ? "success"
                          : job.Status === "Rejected"
                          ? "destructive"
                          : job.Status === "Interviewing" ||
                            job.Status === "Interview Scheduled"
                          ? "secondary"
                          : "warning"
                      }
                    >
                      {job.Status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(job.Application_Date)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatedCard>
      </div>

      {recentOffers.length > 0 && (
        <AnimatedCard delay={0.5}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Latest Offers</h2>
            <CheckCircle2 className="w-5 h-5 text-success" />
          </div>
          <div className="space-y-2">
            {recentOffers.map((offer, i) => (
              <motion.div
                key={offer.Id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-success/5 border border-success/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {offer.Position}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {offer.Company}
                    </p>
                  </div>
                </div>
                {offer.Job_URL && (
                  <a
                    href={offer.Job_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </AnimatedCard>
      )}
    </div>
  )
}

function SkeletonTitle() {
  return (
    <div className="space-y-2">
      <div className="h-8 w-48 rounded-lg bg-surface-hover animate-pulse" />
      <div className="h-4 w-72 rounded-lg bg-surface-hover animate-pulse" />
    </div>
  )
}

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: string
  trendUp?: boolean
  color?: string
  delay?: number
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  color = "#7C3AED",
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      whileHover={{ y: -2, scale: 1.01 }}
      className="relative group"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300",
          "hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
            {trend && (
              <p
                className={cn(
                  "text-sm font-medium",
                  trendUp ? "text-success" : "text-error"
                )}
              >
                {trend}
              </p>
            )}
          </div>
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${color}20, ${color}08)`,
              border: `1px solid ${color}30`,
            }}
          >
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] opacity-50"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          }}
        />
      </div>
    </motion.div>
  )
}

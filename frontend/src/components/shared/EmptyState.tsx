import { motion } from "framer-motion"
import { Inbox } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

interface EmptyStateProps {
  title?: string
  description?: string
  actionLabel?: string
  actionPath?: string
}

export default function EmptyState({
  title = "No jobs yet",
  description = "Start tracking your job applications by creating your first entry.",
  actionLabel = "Create Job",
  actionPath = "/create",
}: EmptyStateProps) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6"
      >
        <Inbox className="w-7 h-7 text-primary" />
      </motion.div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground text-center max-w-sm mb-6">
        {description}
      </p>
      <Button onClick={() => navigate(actionPath)}>
        {actionLabel}
      </Button>
    </motion.div>
  )
}

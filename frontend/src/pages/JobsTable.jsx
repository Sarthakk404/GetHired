import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Briefcase,
  Building2,
  MapPin,
  Calendar,
  ExternalLink,
  MoreHorizontal,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"
import { fetchJobs, deleteJob } from "@/lib/api"
import { STATUS_OPTIONS, JOB_TYPE_OPTIONS, WORK_MODE_OPTIONS, STATUS_COLORS } from "@/lib/constants"
import { TableSkeleton } from "@/components/shared/LoadingSkeleton"
import EmptyState from "@/components/shared/EmptyState"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { formatDate } from "@/lib/utils"
import { useNavigate } from "react-router-dom"
import { toast } from "@/hooks/use-toast"

const ITEMS_PER_PAGE = 10

export default function JobsTable() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [workFilter, setWorkFilter] = useState("all")
  const [sortKey, setSortKey] = useState("Application_Date")
  const [sortDir, setSortDir] = useState("desc")
  const [page, setPage] = useState(1)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    loadJobs()
  }, [])

  async function loadJobs() {
    try {
      const data = await fetchJobs()
      setJobs(data)
    } catch {
      toast({ title: "Error loading jobs", variant: "error" })
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deleteJob(deleteTarget.Id)
      setJobs((prev) => prev.filter((j) => j.Id !== deleteTarget.Id))
      toast({ title: "Job deleted", description: `${deleteTarget.Position} at ${deleteTarget.Company} removed`, variant: "success" })
      setDeleteTarget(null)
    } catch {
      toast({ title: "Failed to delete", variant: "error" })
    } finally {
      setDeleting(false)
    }
  }

  const filtered = useMemo(() => {
    let result = [...jobs]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (j) =>
          j.Company.toLowerCase().includes(q) ||
          j.Position.toLowerCase().includes(q) ||
          j.Company_Location.toLowerCase().includes(q)
      )
    }

    if (statusFilter !== "all") {
      result = result.filter((j) => j.Status === statusFilter)
    }
    if (typeFilter !== "all") {
      result = result.filter((j) => j.Job_Type === typeFilter)
    }
    if (workFilter !== "all") {
      result = result.filter((j) => j.Work_Mode === workFilter)
    }

    result.sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      const cmp =
        typeof aVal === "string" ? aVal.localeCompare(bVal) : Number(aVal) - Number(bVal)
      return sortDir === "asc" ? cmp : -cmp
    })

    return result
  }, [jobs, search, statusFilter, typeFilter, workFilter, sortKey, sortDir])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  function toggleSort(key) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  function SortHeader({ label, sortKey: sk }) {
    const active = sortKey === sk
    return (
      <button
        onClick={() => toggleSort(sk)}
        className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-white transition-colors"
      >
        {label}
        <ArrowUpDown
          className={`w-3 h-3 transition-opacity ${active ? "opacity-100 text-primary" : "opacity-30"}`}
        />
      </button>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-32 bg-surface-hover rounded-lg animate-pulse" />
        <TableSkeleton />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-white">Jobs</h1>
        <p className="text-muted-foreground mt-1">
          Manage and track all your job applications
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search companies, positions..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className="pl-9"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Select
              value={statusFilter}
              onValueChange={(v) => {
                setStatusFilter(v)
                setPage(1)
              }}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={typeFilter}
              onValueChange={(v) => {
                setTypeFilter(v)
                setPage(1)
              }}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {JOB_TYPE_OPTIONS.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={workFilter}
              onValueChange={(v) => {
                setWorkFilter(v)
                setPage(1)
              }}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Work Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modes</SelectItem>
                {WORK_MODE_OPTIONS.map((w) => (
                  <SelectItem key={w} value={w}>{w}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={() => navigate("/create")} className="ml-auto">
            <Briefcase className="w-4 h-4 mr-2" />
            Add Job
          </Button>
        </div>
      </motion.div>

      {filtered.length === 0 ? (
        <EmptyState
          title={search || statusFilter !== "all" ? "No matching jobs" : "No jobs yet"}
          description={
            search || statusFilter !== "all"
              ? "Try adjusting your search or filters."
              : undefined
          }
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left">
                      <SortHeader label="Company" sortKey="Company" />
                    </th>
                    <th className="px-4 py-3 text-left">
                      <SortHeader label="Position" sortKey="Position" />
                    </th>
                    <th className="px-4 py-3 text-left hidden md:table-cell">
                      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Location
                      </span>
                    </th>
                    <th className="px-4 py-3 text-left">
                      <SortHeader label="Status" sortKey="Status" />
                    </th>
                    <th className="px-4 py-3 text-left hidden lg:table-cell">
                      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Type
                      </span>
                    </th>
                    <th className="px-4 py-3 text-left hidden lg:table-cell">
                      <SortHeader label="Date" sortKey="Application_Date" />
                    </th>
                    <th className="px-4 py-3 text-right w-12" />
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {paginated.map((job, i) => (
                      <motion.tr
                        key={job.Id}
                        layout
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ delay: i * 0.03, duration: 0.2 }}
                        className="border-b border-border hover:bg-surface-hover/50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <Building2 className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-sm font-medium text-white">
                              {job.Company}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-white">{job.Position}</span>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5" />
                            {job.Company_Location}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            variant={
                              job.Status === "Accepted"
                                ? "success"
                                : job.Status === "Rejected"
                                ? "destructive"
                                : job.Status === "Interviewing" ||
                                  job.Status === "Interview Scheduled"
                                ? "secondary"
                                : job.Status === "Online Assessment"
                                ? "accent"
                                : "warning"
                            }
                            size="sm"
                          >
                            {job.Status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span className="text-sm text-muted-foreground">
                            {job.Job_Type}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(job.Application_Date)}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {job.Job_URL && (
                              <a
                                href={job.Job_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-md text-muted-foreground hover:text-white hover:bg-surface-hover transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button className="p-1.5 rounded-md text-muted-foreground hover:text-white hover:bg-surface-hover transition-colors">
                                  <MoreHorizontal className="w-3.5 h-3.5" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-36">
                                <DropdownMenuItem
                                  onClick={() => navigate(`/edit/${job.Id}`)}
                                >
                                  <Pencil className="w-3.5 h-3.5 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-error focus:text-error"
                                  onClick={() => setDeleteTarget(job)}
                                >
                                  <Trash2 className="w-3.5 h-3.5 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-muted-foreground">
                Showing {(page - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of{" "}
                {filtered.length}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <Button
                      key={p}
                      variant={p === page ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setPage(p)}
                      className="min-w-[32px]"
                    >
                      {p}
                    </Button>
                  )
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      )}

      <Dialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Job</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the application for{" "}
              <strong className="text-white">
                {deleteTarget?.Position}
              </strong>{" "}
              at{" "}
              <strong className="text-white">
                {deleteTarget?.Company}
              </strong>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setDeleteTarget(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

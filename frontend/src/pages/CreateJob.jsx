import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Briefcase,
  Building2,
  MapPin,
  Calendar,
  Globe,
  FileText,
  ArrowLeft,
  Save,
  Loader2,
} from "lucide-react"
import { createJob } from "@/lib/api"
import { STATUS_OPTIONS, JOB_TYPE_OPTIONS, WORK_MODE_OPTIONS } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

const jobSchema = z.object({
  Company: z.string().min(1, "Company is required"),
  Position: z.string().min(1, "Position is required"),
  Company_Location: z.string().min(1, "Location is required"),
  Application_Date: z.string().min(1, "Date is required"),
  Status: z.string().min(1, "Status is required"),
  Job_Type: z.string().min(1, "Employment type is required"),
  Work_Mode: z.string().min(1, "Work mode is required"),
  Job_URL: z.string().url("Must be a valid URL").or(z.literal("")),
  Notes: z.string().optional(),
})

export default function CreateJob() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      Company: "",
      Position: "",
      Company_Location: "",
      Application_Date: new Date().toISOString().split("T")[0],
      Status: "",
      Job_Type: "",
      Work_Mode: "",
      Job_URL: "",
      Notes: "",
    },
  })

  const watchedStatus = watch("Status")
  const watchedType = watch("Job_Type")
  const watchedWork = watch("Work_Mode")

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      await createJob({
        ...data,
        Status: data.Status,
        Job_Type: data.Job_Type,
        Work_Mode: data.Work_Mode,
        Job_URL: data.Job_URL || "",
      })
      toast({
        title: "Job created",
        description: `${data.Position} at ${data.Company} added successfully`,
        variant: "success",
      })
      navigate("/jobs")
    } catch {
      toast({
        title: "Failed to create job",
        description: "Please check your input and try again",
        variant: "error",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-white">Create Job</h1>
        <p className="text-muted-foreground mt-1">
          Add a new job application to track
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>
              Fill in the details about the job application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="Company">
                    <Building2 className="w-3.5 h-3.5 inline mr-1.5" />
                    Company
                  </Label>
                  <Input
                    id="Company"
                    placeholder="e.g. Google"
                    {...register("Company")}
                  />
                  {errors.Company && (
                    <p className="text-xs text-error">{errors.Company.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="Position">
                    <Briefcase className="w-3.5 h-3.5 inline mr-1.5" />
                    Position
                  </Label>
                  <Input
                    id="Position"
                    placeholder="e.g. Software Engineer"
                    {...register("Position")}
                  />
                  {errors.Position && (
                    <p className="text-xs text-error">{errors.Position.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="Company_Location">
                    <MapPin className="w-3.5 h-3.5 inline mr-1.5" />
                    Location
                  </Label>
                  <Input
                    id="Company_Location"
                    placeholder="e.g. San Francisco, CA"
                    {...register("Company_Location")}
                  />
                  {errors.Company_Location && (
                    <p className="text-xs text-error">
                      {errors.Company_Location.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="Application_Date">
                    <Calendar className="w-3.5 h-3.5 inline mr-1.5" />
                    Application Date
                  </Label>
                  <Input
                    id="Application_Date"
                    type="date"
                    {...register("Application_Date")}
                  />
                  {errors.Application_Date && (
                    <p className="text-xs text-error">
                      {errors.Application_Date.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={watchedStatus}
                    onValueChange={(v) => setValue("Status", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.Status && (
                    <p className="text-xs text-error">{errors.Status.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Employment Type</Label>
                  <Select
                    value={watchedType}
                    onValueChange={(v) => setValue("Job_Type", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {JOB_TYPE_OPTIONS.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.Job_Type && (
                    <p className="text-xs text-error">
                      {errors.Job_Type.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Work Mode</Label>
                  <Select
                    value={watchedWork}
                    onValueChange={(v) => setValue("Work_Mode", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      {WORK_MODE_OPTIONS.map((w) => (
                        <SelectItem key={w} value={w}>
                          {w}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.Work_Mode && (
                    <p className="text-xs text-error">
                      {errors.Work_Mode.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="Job_URL">
                  <Globe className="w-3.5 h-3.5 inline mr-1.5" />
                  Job URL
                </Label>
                <Input
                  id="Job_URL"
                  placeholder="https://..."
                  {...register("Job_URL")}
                />
                {errors.Job_URL && (
                  <p className="text-xs text-error">{errors.Job_URL.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="Notes">
                  <FileText className="w-3.5 h-3.5 inline mr-1.5" />
                  Notes
                </Label>
                <textarea
                  id="Notes"
                  rows={4}
                  placeholder="Add any notes about this application..."
                  className="flex w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 resize-none"
                  {...register("Notes")}
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {submitting ? "Saving..." : "Create Job"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate("/jobs")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

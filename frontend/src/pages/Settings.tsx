import { motion } from "framer-motion"
import {
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  Moon,
  Monitor,
  Sun,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"

export default function Settings() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your application preferences
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              <CardTitle>Appearance</CardTitle>
            </div>
            <CardDescription>Customize how the dashboard looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Theme</Label>
                <p className="text-xs text-muted-foreground">
                  Dark mode is the only available theme
                </p>
              </div>
              <div className="flex items-center gap-1 p-1 rounded-lg bg-surface border border-border">
                <button className="p-2 rounded-md bg-primary/20 text-primary">
                  <Moon className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-md text-muted-foreground hover:text-white">
                  <Sun className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-md text-muted-foreground hover:text-white">
                  <Monitor className="w-4 h-4" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-secondary" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>
              Configure your notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Email Notifications",
                desc: "Receive email updates about your applications",
              },
              {
                title: "Application Reminders",
                desc: "Get reminded to follow up on applications",
              },
              {
                title: "Interview Alerts",
                desc: "Get notified when interviews are scheduled",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div>
                  <Label>{item.title}</Label>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-surface-hover border border-border cursor-pointer transition-colors data-[state=checked]:bg-primary">
                  <span className="inline-block h-4 w-4 rounded-full bg-muted-foreground translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-accent" />
              <CardTitle>API Configuration</CardTitle>
            </div>
            <CardDescription>
              Backend API connection settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>API Endpoint</Label>
              <p className="text-xs text-muted-foreground mt-1">
                http://localhost:8000
              </p>
            </div>
            <Separator />
            <div>
              <Label>Status</Label>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="text-sm text-success">Connected</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-warning" />
              <CardTitle>Danger Zone</CardTitle>
            </div>
            <CardDescription>
              Destructive actions that cannot be undone
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-lg border border-error/20 bg-error/5">
              <div>
                <p className="text-sm font-medium text-white">Clear All Data</p>
                <p className="text-xs text-muted-foreground">
                  Permanently delete all job applications
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() =>
                  toast({
                    title: "Feature not available",
                    description: "This action is disabled in the preview",
                    variant: "warning",
                  })
                }
              >
                Clear Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import {
  Moon,
  Sun,
  Bell,
  Lock,
  Trash2,
  Mail,
  Shield,
} from 'lucide-react';

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();

  if (!user) return null;

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
    toast.success(`${checked ? 'Dark' : 'Light'} mode enabled`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account preferences
        </p>
      </div>

      {/* Appearance */}
      <div className="p-6 rounded-xl bg-card border border-border space-y-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          Appearance
        </h2>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Dark Mode</Label>
            <p className="text-sm text-muted-foreground">
              Switch between light and dark themes
            </p>
          </div>
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={handleThemeChange}
          />
        </div>
      </div>

      {/* Notifications */}
      <div className="p-6 rounded-xl bg-card border border-border space-y-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notifications
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive updates about your courses
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Course Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Get reminded to continue learning
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">
                New courses and promotions
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="p-6 rounded-xl bg-card border border-border space-y-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Security
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Change Password</Label>
              <p className="text-sm text-muted-foreground">
                Update your password regularly
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Lock className="w-4 h-4 mr-2" />
              Change
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Update Email</Label>
              <p className="text-sm text-muted-foreground">
                {user.email}
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Mail className="w-4 h-4 mr-2" />
              Update
            </Button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="p-6 rounded-xl bg-destructive/5 border border-destructive/20 space-y-6">
        <h2 className="text-lg font-semibold text-destructive flex items-center gap-2">
          <Trash2 className="w-5 h-5" />
          Danger Zone
        </h2>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-foreground">Delete Account</Label>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all data
            </p>
          </div>
          <Button variant="destructive" size="sm">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}

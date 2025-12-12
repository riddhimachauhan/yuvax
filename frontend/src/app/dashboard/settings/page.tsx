// app/settings/page.tsx
import ManageProfile from "@/components/settings/ManageProfile";
import NotificationSettings from "@/components/settings/NotificationSettings";
import SecurityPrivacy from "@/components/settings/SecurityPrivacy";
import { RefreshCw, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen">
      {}
      <aside className="fixed top-0 left-0 bottom-0 w-64 bg-white">
        {/* <Sidebar /> */}
      </aside>

      {}
      <main className="flex-1 ml-64 bg-white p-6">
        {}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-medium text-gray-800">
            Hi Garlic, Welcome back.
          </h1>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-gray-600">
              <RefreshCw className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" className="text-gray-600 text-sm">
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </Button>
          </div>
        </div>

        {}
        <ManageProfile />
        <NotificationSettings />
        <SecurityPrivacy />
      </main>
    </div>
  );
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Users, Shield, Key } from "lucide-react";

const UserManagement = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">User Access Management</h1>
        <p className="text-slate-100">Role-based access control for admin, finance, unit managers, and leadership</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Super Admin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-red-600">Full access</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Finance Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-blue-600">Financial data</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Unit Managers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-green-600">Unit-specific</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Leadership</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-purple-600">Strategic view</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <Shield className="h-16 w-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Access Control System</h3>
          <p className="text-gray-600">Role-based user management and permissions system coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;

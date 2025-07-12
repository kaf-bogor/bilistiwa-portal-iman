
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users2, Gift, Heart, Banknote } from "lucide-react";

const TeacherWelfare = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Teacher Welfare</h1>
        <p className="text-indigo-100">Monthly support and welfare management for teaching staff</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Active Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-green-600">Full & Part-time</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Monthly Natura</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 9M</div>
            <p className="text-xs text-blue-600">Food & essentials</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Health Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 2.5M</div>
            <p className="text-xs text-purple-600">Medical coverage</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">THR & Bonus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 15M</div>
            <p className="text-xs text-orange-600">Holiday allowance</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <Users2 className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Teacher Welfare Management</h3>
          <p className="text-gray-600">Comprehensive teacher support and welfare tracking system coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherWelfare;

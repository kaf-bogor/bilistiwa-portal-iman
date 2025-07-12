
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, DollarSign, Target, Eye, Download } from "lucide-react";

const ScholarshipManagement = () => {
  const scholarshipStats = [
    { label: "Active Students", value: "127", change: "+5 this month" },
    { label: "Monthly Distribution", value: "Rp 38.1M", change: "127 students" },
    { label: "SPP Subsidy Target", value: "85%", change: "108/127 covered" },
    { label: "Waiting List", value: "24", change: "Applications pending" }
  ];

  const students = [
    {
      name: "Ahmad Fauzi Rahman",
      class: "Grade 4A",
      type: "Full Scholarship",
      amount: "Rp 300,000",
      status: "Active",
      lastPayment: "Dec 2024"
    },
    {
      name: "Siti Aisyah Nur",
      class: "Grade 5B",
      type: "SPP Subsidy",
      amount: "Rp 150,000",
      status: "Active",
      lastPayment: "Dec 2024"
    },
    {
      name: "Muhammad Hakim",
      class: "Grade 3A",
      type: "Full Scholarship",
      amount: "Rp 300,000",
      status: "Active",
      lastPayment: "Dec 2024"
    },
    {
      name: "Fatimah Az-Zahra",
      class: "Grade 6A",
      type: "Partial Support",
      amount: "Rp 200,000",
      status: "Active",
      lastPayment: "Dec 2024"
    },
    {
      name: "Umar bin Khattab",
      class: "Grade 2B",
      type: "SPP Subsidy",
      amount: "Rp 150,000",
      status: "Review",
      lastPayment: "Nov 2024"
    }
  ];

  const distributionProgress = [
    { month: "January 2024", target: 120, achieved: 115, percentage: 96 },
    { month: "February 2024", target: 120, achieved: 118, percentage: 98 },
    { month: "March 2024", target: 125, achieved: 122, percentage: 98 },
    { month: "April 2024", target: 125, achieved: 125, percentage: 100 },
    { month: "May 2024", target: 125, achieved: 123, percentage: 98 },
    { month: "December 2024", target: 130, achieved: 127, percentage: 98 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Scholarship Management</h1>
        <p className="text-blue-100">Student scholarship distribution and SPP subsidy management</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {scholarshipStats.map((stat, index) => (
          <Card key={index} className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <p className="text-xs text-blue-600 font-medium">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Distribution Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-600" />
            Monthly Distribution Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {distributionProgress.map((month, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{month.month}</span>
                  <span className="text-sm text-gray-600">
                    {month.achieved} / {month.target} students
                  </span>
                </div>
                <Progress value={month.percentage} className="h-2" />
                <div className="text-right">
                  <span className={`text-xs font-medium ${
                    month.percentage >= 95 ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {month.percentage}% target achieved
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Student List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Current Scholarship Recipients
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export List
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Add Student
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium text-gray-600">Student Name</th>
                  <th className="text-left p-3 font-medium text-gray-600">Class</th>
                  <th className="text-left p-3 font-medium text-gray-600">Scholarship Type</th>
                  <th className="text-left p-3 font-medium text-gray-600">Monthly Amount</th>
                  <th className="text-left p-3 font-medium text-gray-600">Status</th>
                  <th className="text-left p-3 font-medium text-gray-600">Last Payment</th>
                  <th className="text-left p-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="font-medium">{student.name}</div>
                    </td>
                    <td className="p-3 text-gray-600">{student.class}</td>
                    <td className="p-3">
                      <Badge 
                        variant="outline"
                        className={
                          student.type === 'Full Scholarship' ? 'bg-green-100 text-green-800 border-green-300' :
                          student.type === 'SPP Subsidy' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                          'bg-orange-100 text-orange-800 border-orange-300'
                        }
                      >
                        {student.type}
                      </Badge>
                    </td>
                    <td className="p-3 font-medium text-green-600">{student.amount}</td>
                    <td className="p-3">
                      <Badge 
                        variant={student.status === 'Active' ? 'default' : 'secondary'}
                        className={
                          student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {student.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-gray-600">{student.lastPayment}</td>
                    <td className="p-3">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Process Monthly Distribution</h3>
            <p className="text-sm text-gray-600 mb-4">Distribute scholarship payments for active students</p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Process Now</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Review Applications</h3>
            <p className="text-sm text-gray-600 mb-4">24 new scholarship applications pending review</p>
            <Button variant="outline" className="w-full">Review Applications</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Target className="h-12 w-12 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Generate Reports</h3>
            <p className="text-sm text-gray-600 mb-4">Monthly and annual scholarship distribution reports</p>
            <Button variant="outline" className="w-full">Generate Reports</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScholarshipManagement;

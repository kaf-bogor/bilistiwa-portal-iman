
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Users, 
  Building2, 
  Heart,
  DollarSign,
  GraduationCap,
  Store,
  Calendar
} from "lucide-react";

const Dashboard = () => {
  const statsCards = [
    {
      title: "Total Donations This Month",
      value: "Rp 45,750,000",
      change: "+12.5%",
      icon: Heart,
      color: "text-green-600"
    },
    {
      title: "Active Students (Scholarship)",
      value: "127",
      change: "+3 new",
      icon: GraduationCap,
      color: "text-blue-600"
    },
    {
      title: "Waqf Assets Value",
      value: "Rp 2.4B",
      change: "Updated",
      icon: Building2,
      color: "text-amber-600"
    },
    {
      title: "Productive Units Revenue",
      value: "Rp 8,950,000",
      change: "+8.3%",
      icon: Store,
      color: "text-purple-600"
    }
  ];

  const units = [
    { name: "BAF Kitchen", income: 3200000, target: 4000000, percentage: 80 },
    { name: "CNT Water Depot", income: 2800000, target: 3000000, percentage: 93 },
    { name: "Bazaar Unit", income: 1950000, target: 2500000, percentage: 78 },
    { name: "Catering Services", income: 1000000, target: 1500000, percentage: 67 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-green-100">Bilistiwa Bogor - Kuttab Al Fatih Internal Portal</p>
        <div className="mt-4 text-center">
          <div className="text-amber-200 text-lg">اللَّهُمَّ بَارِكْ لَنَا</div>
          <p className="text-green-200 text-sm">May Allah bless our efforts</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <p className="text-xs text-green-600 font-medium">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Unit Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Unit Performance This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {units.map((unit, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{unit.name}</span>
                    <span className="text-sm text-gray-600">
                      Rp {unit.income.toLocaleString()} / Rp {unit.target.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={unit.percentage} className="h-2" />
                  <div className="text-right">
                    <span className="text-xs text-green-600 font-medium">
                      {unit.percentage}% of target
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="border-l-2 border-green-500 pl-3">
                <p className="text-sm font-medium">New donation received</p>
                <p className="text-xs text-gray-600">Rp 2,500,000 - Ta'awun Fund</p>
                <p className="text-xs text-green-600">2 hours ago</p>
              </div>
              <div className="border-l-2 border-blue-500 pl-3">
                <p className="text-sm font-medium">Scholarship disbursed</p>
                <p className="text-xs text-gray-600">15 students - Monthly allowance</p>
                <p className="text-xs text-green-600">5 hours ago</p>
              </div>
              <div className="border-l-2 border-amber-500 pl-3">
                <p className="text-sm font-medium">Teacher support sent</p>
                <p className="text-xs text-gray-600">Monthly natura distribution</p>
                <p className="text-xs text-green-600">1 day ago</p>
              </div>
              <div className="border-l-2 border-purple-500 pl-3">
                <p className="text-sm font-medium">Waqf documentation updated</p>
                <p className="text-xs text-gray-600">Land certificate verified</p>
                <p className="text-xs text-green-600">2 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center">
              <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-green-800">Record Donation</span>
            </button>
            <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center">
              <GraduationCap className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-blue-800">Add Student</span>
            </button>
            <button className="p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors text-center">
              <Building2 className="h-6 w-6 text-amber-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-amber-800">Update Assets</span>
            </button>
            <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-center">
              <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-purple-800">Manage Users</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

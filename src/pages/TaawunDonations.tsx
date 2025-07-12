
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, TrendingUp, Users, DollarSign } from "lucide-react";

const TaawunDonations = () => {
  const donationStats = [
    { label: "Total This Month", value: "Rp 45.7M", change: "+12.5% vs last month" },
    { label: "Active Donors", value: "248", change: "+15 new donors" },
    { label: "Monthly Target", value: "78%", change: "Rp 45.7M / Rp 58M" },
    { label: "Usage Rate", value: "92%", change: "Rp 42.1M distributed" }
  ];

  const monthlyProgress = [
    { month: "Aug 2024", target: 50000000, achieved: 48500000, percentage: 97 },
    { month: "Sep 2024", target: 55000000, achieved: 52300000, percentage: 95 },
    { month: "Oct 2024", target: 55000000, achieved: 53100000, percentage: 97 },
    { month: "Nov 2024", target: 58000000, achieved: 56200000, percentage: 97 },
    { month: "Dec 2024", target: 58000000, achieved: 45750000, percentage: 78 }
  ];

  const usageBreakdown = [
    { category: "Student Scholarships", amount: 18500000, percentage: 44 },
    { category: "Teacher Support", amount: 12300000, percentage: 29 },
    { category: "Infrastructure", amount: 6200000, percentage: 15 },
    { category: "Operations", amount: 3800000, percentage: 9 },
    { category: "Emergency Fund", amount: 1300000, percentage: 3 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Ta'awun Donations</h1>
        <p className="text-rose-100">Community support and mutual aid fund management</p>
        <div className="mt-4 text-center">
          <div className="text-pink-200 text-lg">وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَى</div>
          <p className="text-rose-200 text-sm">And cooperate in righteousness and piety</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {donationStats.map((stat, index) => (
          <Card key={index} className="border-l-4 border-l-rose-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <p className="text-xs text-rose-600 font-medium">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly Progress and Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Monthly Fundraising Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyProgress.map((month, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{month.month}</span>
                    <span className="text-sm text-gray-600">
                      Rp {(month.achieved / 1000000).toFixed(1)}M / Rp {(month.target / 1000000)}M
                    </span>
                  </div>
                  <Progress value={month.percentage} className="h-2" />
                  <div className="text-right">
                    <span className={`text-xs font-medium ${
                      month.percentage >= 95 ? 'text-green-600' : month.percentage >= 80 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {month.percentage}% of target
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              Fund Usage Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {usageBreakdown.map((usage, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{usage.category}</span>
                    <span className="text-sm text-gray-600">
                      Rp {(usage.amount / 1000000).toFixed(1)}M ({usage.percentage}%)
                    </span>
                  </div>
                  <Progress value={usage.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Donations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-rose-600" />
            Recent Donations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-l-green-500 pl-4 py-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Anonymous Donor</p>
                  <p className="text-sm text-gray-600">Monthly recurring donation</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">Rp 2,500,000</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-l-blue-500 pl-4 py-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">H. Abdullah Rahman</p>
                  <p className="text-sm text-gray-600">Education support fund</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">Rp 1,500,000</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-l-purple-500 pl-4 py-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Komunitas Muslimah Bogor</p>
                  <p className="text-sm text-gray-600">Collective donation</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-purple-600">Rp 3,200,000</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-l-orange-500 pl-4 py-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">CV Barokah Sejahtera</p>
                  <p className="text-sm text-gray-600">Corporate social responsibility</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-orange-600">Rp 5,000,000</p>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-rose-50 to-pink-50">
          <CardContent className="p-6 text-center">
            <Heart className="h-12 w-12 text-rose-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Record New Donation</h3>
            <p className="text-sm text-gray-600">Add new donation entry to the system</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Donor Management</h3>
            <p className="text-sm text-gray-600">Manage donor database and communications</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Generate Reports</h3>
            <p className="text-sm text-gray-600">Monthly and annual donation reports</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaawunDonations;

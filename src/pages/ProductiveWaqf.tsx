
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, TrendingUp, Utensils, Droplets } from "lucide-react";

const ProductiveWaqf = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Productive Waqf Units</h1>
        <p className="text-purple-100">Business performance dashboards for income-generating units</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5 text-orange-600" />
              BAF Kitchen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Rp 3.2M</div>
            <p className="text-sm text-gray-600">Monthly Revenue</p>
            <p className="text-xs text-green-600 mt-1">+15% vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-600" />
              CNT Water Depot
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Rp 2.8M</div>
            <p className="text-sm text-gray-600">Monthly Revenue</p>
            <p className="text-xs text-green-600 mt-1">+8% vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5 text-purple-600" />
              Bazaar Unit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Rp 1.9M</div>
            <p className="text-sm text-gray-600">Monthly Revenue</p>
            <p className="text-xs text-orange-600 mt-1">-5% vs last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <TrendingUp className="h-16 w-16 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Business Performance Dashboard</h3>
          <p className="text-gray-600">Detailed analytics and reports for each productive waqf unit coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductiveWaqf;

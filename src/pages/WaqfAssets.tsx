
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, FileText, TrendingUp } from "lucide-react";

const WaqfAssets = () => {
  const landAssets = [
    {
      name: "Main School Land",
      location: "Jl. Raya Bogor KM 45",
      area: "2,500 m²",
      status: "Certified",
      value: "Rp 1.2B",
      certificate: "SHM No. 123/2020"
    },
    {
      name: "Expansion Plot A",
      location: "Adjacent to main building",
      area: "1,200 m²",
      status: "In Process",
      value: "Rp 800M",
      certificate: "Processing"
    },
    {
      name: "Productive Land",
      location: "Behind school compound",
      area: "800 m²",
      status: "Productive",
      value: "Rp 400M",
      certificate: "SHM No. 456/2021"
    }
  ];

  const constructionProjects = [
    {
      name: "New Classroom Block",
      progress: 75,
      budget: "Rp 850M",
      spent: "Rp 637M",
      completion: "March 2024",
      contractor: "CV Berkah Mandiri"
    },
    {
      name: "Multipurpose Hall",
      progress: 45,
      budget: "Rp 650M",
      spent: "Rp 292M",
      completion: "June 2024",
      contractor: "PT Amanah Konstruksi"
    },
    {
      name: "Teacher Housing",
      progress: 20,
      budget: "Rp 400M",
      spent: "Rp 80M",
      completion: "September 2024",
      contractor: "CV Barokah Sejahtera"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Waqf & Assets Management</h1>
        <p className="text-amber-100">Land ownership, construction progress, and asset documentation</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Land Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">4,500 m²</div>
            <p className="text-xs text-amber-600 font-medium">3 certified plots</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Asset Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">Rp 2.4B</div>
            <p className="text-xs text-green-600 font-medium">Current market value</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">3</div>
            <p className="text-xs text-blue-600 font-medium">Under construction</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">85%</div>
            <p className="text-xs text-purple-600 font-medium">Complete</p>
          </CardContent>
        </Card>
      </div>

      {/* Land Assets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-amber-600" />
            Land Assets Inventory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {landAssets.map((land, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{land.name}</h3>
                    <p className="text-gray-600 text-sm flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {land.location}
                    </p>
                  </div>
                  <Badge 
                    variant={land.status === 'Certified' ? 'default' : land.status === 'Productive' ? 'secondary' : 'outline'}
                    className={
                      land.status === 'Certified' ? 'bg-green-100 text-green-800' :
                      land.status === 'Productive' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }
                  >
                    {land.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Area:</span>
                    <p className="font-medium">{land.area}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Estimated Value:</span>
                    <p className="font-medium text-green-600">{land.value}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Certificate:</span>
                    <p className="font-medium">{land.certificate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Construction Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            Construction Projects Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {constructionProjects.map((project, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{project.name}</h3>
                    <p className="text-gray-600 text-sm">Contractor: {project.contractor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Target Completion</p>
                    <p className="font-medium">{project.completion}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm font-bold text-blue-600">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Total Budget:</span>
                    <p className="font-medium text-lg">{project.budget}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Amount Spent:</span>
                    <p className="font-medium text-lg text-orange-600">{project.spent}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Documentation Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600" />
            Documentation Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Required Documents</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Land Certificates</span>
                  <Badge className="bg-green-100 text-green-800">Complete</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Building Permits</span>
                  <Badge className="bg-green-100 text-green-800">Complete</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Environmental Impact</span>
                  <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Fire Safety Certificates</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Waqf Documentation</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Waqf Deeds</span>
                  <Badge className="bg-green-100 text-green-800">Complete</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Nazhir Appointments</span>
                  <Badge className="bg-green-100 text-green-800">Complete</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">BWI Registration</span>
                  <Badge className="bg-green-100 text-green-800">Complete</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Annual Reports</span>
                  <Badge className="bg-blue-100 text-blue-800">Updated</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaqfAssets;

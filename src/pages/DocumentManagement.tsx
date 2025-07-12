
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Upload, Folder } from "lucide-react";

const DocumentManagement = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Document Management</h1>
        <p className="text-gray-100">SOPs, contracts, templates, and institutional documents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Folder className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold">SOPs</h3>
            <p className="text-sm text-gray-600">24 documents</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <FileText className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold">Contracts</h3>
            <p className="text-sm text-gray-600">12 documents</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Download className="h-12 w-12 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold">Templates</h3>
            <p className="text-sm text-gray-600">8 templates</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Upload className="h-12 w-12 text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold">Upload New</h3>
            <p className="text-sm text-gray-600">Add document</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-12 text-center">
          <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Document Management System</h3>
          <p className="text-gray-600">Centralized document storage and management system coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentManagement;

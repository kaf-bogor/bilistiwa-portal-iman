
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Building2, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WaqfAsset {
  id: string;
  name: string;
  type: "Land" | "Building" | "Equipment";
  location: string;
  value: number;
  status: "Active" | "Under Development" | "Completed";
  description: string;
  dateAcquired: string;
}

const WaqfAssets = () => {
  const { toast } = useToast();
  const [assets, setAssets] = useState<WaqfAsset[]>([
    {
      id: "1",
      name: "Main Campus Land",
      type: "Land",
      location: "Bogor, West Java",
      value: 2500000000,
      status: "Active",
      description: "Primary campus land for Kuttab Al Fatih",
      dateAcquired: "2020-01-15"
    },
    {
      id: "2", 
      name: "School Building Phase 1",
      type: "Building",
      location: "Bogor, West Java",
      value: 1800000000,
      status: "Completed",
      description: "First phase of school construction",
      dateAcquired: "2021-06-10"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<WaqfAsset | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    type: "Land" | "Building" | "Equipment";
    location: string;
    value: string;
    status: "Active" | "Under Development" | "Completed";
    description: string;
    dateAcquired: string;
  }>({
    name: "",
    type: "Land",
    location: "",
    value: "",
    status: "Active",
    description: "",
    dateAcquired: ""
  });

  const resetForm = () => {
    setFormData({
      name: "",
      type: "Land",
      location: "",
      value: "",
      status: "Active",
      description: "",
      dateAcquired: ""
    });
    setEditingAsset(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAsset) {
      setAssets(assets.map(asset => 
        asset.id === editingAsset.id 
          ? { ...asset, ...formData, value: Number(formData.value) }
          : asset
      ));
      toast({ title: "Asset updated successfully" });
    } else {
      const newAsset: WaqfAsset = {
        id: Date.now().toString(),
        ...formData,
        value: Number(formData.value)
      };
      setAssets([...assets, newAsset]);
      toast({ title: "Asset created successfully" });
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (asset: WaqfAsset) => {
    setEditingAsset(asset);
    setFormData({
      name: asset.name,
      type: asset.type,
      location: asset.location,
      value: asset.value.toString(),
      status: asset.status,
      description: asset.description,
      dateAcquired: asset.dateAcquired
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setAssets(assets.filter(asset => asset.id !== id));
    toast({ title: "Asset deleted successfully" });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Waqf & Assets Management</h1>
        <p className="text-green-100">Manage waqf properties, land ownership, and asset documentation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assets.length}</div>
            <p className="text-xs text-green-600">Properties & Equipment</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(assets.reduce((sum, asset) => sum + asset.value, 0))}
            </div>
            <p className="text-xs text-blue-600">Asset valuation</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assets.filter(a => a.status === "Under Development").length}
            </div>
            <p className="text-xs text-purple-600">In development</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Waqf Assets
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Asset
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingAsset ? "Edit Asset" : "Add New Asset"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Asset Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as "Land" | "Building" | "Equipment"})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="Land">Land</option>
                    <option value="Building">Building</option>
                    <option value="Equipment">Equipment</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="value">Value (IDR)</Label>
                  <Input
                    id="value"
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({...formData, value: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as "Active" | "Under Development" | "Completed"})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Under Development">Under Development</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="dateAcquired">Date Acquired</Label>
                  <Input
                    id="dateAcquired"
                    type="date"
                    value={formData.dateAcquired}
                    onChange={(e) => setFormData({...formData, dateAcquired: e.target.value})}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingAsset ? "Update" : "Create"} Asset
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">{asset.name}</TableCell>
                  <TableCell>{asset.type}</TableCell>
                  <TableCell>{asset.location}</TableCell>
                  <TableCell>{formatCurrency(asset.value)}</TableCell>
                  <TableCell>
                    <Badge variant={
                      asset.status === "Active" ? "default" :
                      asset.status === "Completed" ? "secondary" : "outline"
                    }>
                      {asset.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(asset)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(asset.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaqfAssets;

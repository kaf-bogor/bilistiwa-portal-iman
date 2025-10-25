import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Building2, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { waqfAssetsService } from "@/lib/firebaseService";
import { Timestamp } from "firebase/firestore";

interface WaqfAsset {
  id?: string;
  name: string;
  type: "Tanah" | "Bangunan" | "Peralatan";
  location: string;
  value: number;
  status: "Aktif" | "Dalam Pengembangan" | "Selesai";
  description: string;
  dateAcquired: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const WaqfAssets = () => {
  const { toast } = useToast();
  const [assets, setAssets] = useState<WaqfAsset[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch assets from Firestore on component mount
  useEffect(() => {
    const unsubscribe = waqfAssetsService.onSnapshot((documents) => {
      setAssets(documents as WaqfAsset[]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<WaqfAsset | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    type: "Tanah" | "Bangunan" | "Peralatan";
    location: string;
    value: string;
    status: "Aktif" | "Dalam Pengembangan" | "Selesai";
    description: string;
    dateAcquired: string;
  }>({
    name: "",
    type: "Tanah",
    location: "",
    value: "",
    status: "Aktif",
    description: "",
    dateAcquired: ""
  });

  const resetForm = () => {
    setFormData({
      name: "",
      type: "Tanah",
      location: "",
      value: "",
      status: "Aktif",
      description: "",
      dateAcquired: ""
    });
    setEditingAsset(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingAsset && editingAsset.id) {
        await waqfAssetsService.update(editingAsset.id, {
          name: formData.name,
          type: formData.type,
          location: formData.location,
          value: Number(formData.value),
          status: formData.status,
          description: formData.description,
          dateAcquired: formData.dateAcquired
        });
        toast({ title: "Aset berhasil diperbarui" });
      } else {
        await waqfAssetsService.create({
          name: formData.name,
          type: formData.type,
          location: formData.location,
          value: Number(formData.value),
          status: formData.status,
          description: formData.description,
          dateAcquired: formData.dateAcquired
        });
        toast({ title: "Aset berhasil dibuat" });
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan aset",
        variant: "destructive"
      });
    }
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

  const handleDelete = async (id: string) => {
    try {
      await waqfAssetsService.delete(id);
      toast({ title: "Aset berhasil dihapus" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus aset",
        variant: "destructive"
      });
    }
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
        <h1 className="text-2xl font-bold mb-2">Manajemen Aset & Wakaf</h1>
        <p className="text-green-100">Kelola properti wakaf, kepemilikan tanah, dan dokumentasi aset</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Aset</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assets.length}</div>
            <p className="text-xs text-green-600">Properti & Peralatan</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Nilai</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(assets.reduce((sum, asset) => sum + asset.value, 0))}
            </div>
            <p className="text-xs text-blue-600">Valuasi aset</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Proyek Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assets.filter(a => a.status === "Dalam Pengembangan").length}
            </div>
            <p className="text-xs text-purple-600">Dalam pengembangan</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Aset Wakaf
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Aset
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingAsset ? "Edit Aset" : "Tambah Aset Baru"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama Aset</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Jenis</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as "Tanah" | "Bangunan" | "Peralatan"})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="Tanah">Tanah</option>
                    <option value="Bangunan">Bangunan</option>
                    <option value="Peralatan">Peralatan</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="location">Lokasi</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="value">Nilai (IDR)</Label>
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
                    onChange={(e) => setFormData({...formData, status: e.target.value as "Aktif" | "Dalam Pengembangan" | "Selesai"})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Dalam Pengembangan">Dalam Pengembangan</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="description">Deskripsi</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="dateAcquired">Tanggal Diperoleh</Label>
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
                    {editingAsset ? "Perbarui" : "Buat"} Aset
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Batal
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
                <TableHead>Nama</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Nilai</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Memuat data...
                  </TableCell>
                </TableRow>
              ) : assets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Belum ada data aset
                  </TableCell>
                </TableRow>
              ) : (
                assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">{asset.name}</TableCell>
                  <TableCell>{asset.type}</TableCell>
                  <TableCell>{asset.location}</TableCell>
                  <TableCell>{formatCurrency(asset.value)}</TableCell>
                  <TableCell>
                    <Badge variant={
                      asset.status === "Aktif" ? "default" :
                      asset.status === "Selesai" ? "secondary" : "outline"
                    }>
                      {asset.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(asset)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => asset.id && handleDelete(asset.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaqfAssets;

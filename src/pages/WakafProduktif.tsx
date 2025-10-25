import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Store, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { productiveWaqfService } from "@/lib/firebaseService";
import { Timestamp } from "firebase/firestore";

interface ProductiveWaqfUnit {
  id?: string;
  unitName: string;
  unitType: "Retail Store" | "Food Court" | "Rental Property" | "Agriculture" | "Manufacturing" | "Services";
  location: string;
  manager: string;
  monthlyRevenue: number;
  monthlyExpenses: number;
  status: "Active" | "Under Development" | "Maintenance" | "Closed";
  establishedDate: string;
  description: string;
  targetRevenue: number;
  employees: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const ProductiveWaqf = () => {
  const { toast } = useToast();
  const [units, setUnits] = useState<ProductiveWaqfUnit[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch units from Firestore on component mount
  useEffect(() => {
    const unsubscribe = productiveWaqfService.onSnapshot((documents) => {
      setUnits(documents as ProductiveWaqfUnit[]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState<ProductiveWaqfUnit | null>(null);
  const [formData, setFormData] = useState<{
    unitName: string;
    unitType: "Retail Store" | "Food Court" | "Rental Property" | "Agriculture" | "Manufacturing" | "Services";
    location: string;
    manager: string;
    monthlyRevenue: string;
    monthlyExpenses: string;
    status: "Active" | "Under Development" | "Maintenance" | "Closed";
    establishedDate: string;
    description: string;
    targetRevenue: string;
    employees: string;
  }>({
    unitName: "",
    unitType: "Retail Store",
    location: "",
    manager: "",
    monthlyRevenue: "",
    monthlyExpenses: "",
    status: "Under Development",
    establishedDate: "",
    description: "",
    targetRevenue: "",
    employees: ""
  });

  const resetForm = () => {
    setFormData({
      unitName: "",
      unitType: "Retail Store",
      location: "",
      manager: "",
      monthlyRevenue: "",
      monthlyExpenses: "",
      status: "Under Development",
      establishedDate: "",
      description: "",
      targetRevenue: "",
      employees: ""
    });
    setEditingUnit(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingUnit && editingUnit.id) {
        await productiveWaqfService.update(editingUnit.id, {
          unitName: formData.unitName,
          unitType: formData.unitType,
          location: formData.location,
          manager: formData.manager,
          monthlyRevenue: Number(formData.monthlyRevenue),
          monthlyExpenses: Number(formData.monthlyExpenses),
          targetRevenue: Number(formData.targetRevenue),
          employees: Number(formData.employees),
          status: formData.status,
          establishedDate: formData.establishedDate,
          description: formData.description
        });
        toast({ title: "Unit wakaf produktif berhasil diperbarui" });
      } else {
        await productiveWaqfService.create({
          unitName: formData.unitName,
          unitType: formData.unitType,
          location: formData.location,
          manager: formData.manager,
          monthlyRevenue: Number(formData.monthlyRevenue),
          monthlyExpenses: Number(formData.monthlyExpenses),
          targetRevenue: Number(formData.targetRevenue),
          employees: Number(formData.employees),
          status: formData.status,
          establishedDate: formData.establishedDate,
          description: formData.description
        });
        toast({ title: "Unit wakaf produktif berhasil dibuat" });
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan unit",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (unit: ProductiveWaqfUnit) => {
    setEditingUnit(unit);
    setFormData({
      unitName: unit.unitName,
      unitType: unit.unitType,
      location: unit.location,
      manager: unit.manager,
      monthlyRevenue: unit.monthlyRevenue.toString(),
      monthlyExpenses: unit.monthlyExpenses.toString(),
      status: unit.status,
      establishedDate: unit.establishedDate,
      description: unit.description,
      targetRevenue: unit.targetRevenue.toString(),
      employees: unit.employees.toString()
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await productiveWaqfService.delete(id);
      toast({ title: "Unit wakaf produktif berhasil dihapus" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus unit",
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "Under Development": return "outline";
      case "Maintenance": return "secondary";
      case "Closed": return "destructive";
      default: return "outline";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Retail Store": return "default";
      case "Food Court": return "secondary";
      case "Rental Property": return "outline";
      case "Agriculture": return "default";
      case "Manufacturing": return "secondary";
      case "Services": return "outline";
      default: return "outline";
    }
  };

  const calculateNetProfit = (revenue: number, expenses: number) => {
    return revenue - expenses;
  };

  const totalRevenue = units.reduce((sum, unit) => sum + unit.monthlyRevenue, 0);
  const totalExpenses = units.reduce((sum, unit) => sum + unit.monthlyExpenses, 0);
  const totalNetProfit = totalRevenue - totalExpenses;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Unit Wakaf Produktif</h1>
        <p className="text-purple-100">Kelola unit bisnis wakaf penghasil pendapatan dan usaha</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Unit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{units.length}</div>
            <p className="text-xs text-purple-600">Unit bisnis</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Pendapatan Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-green-600">Total pemasukan</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Pengeluaran Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalExpenses)}</div>
            <p className="text-xs text-red-600">Total biaya</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Laba Bersih</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalNetProfit)}</div>
            <p className="text-xs text-blue-600">Keuntungan bulanan</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            Unit Bisnis
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Unit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingUnit ? "Edit Unit Wakaf Produktif" : "Tambah Unit Wakaf Produktif Baru"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="unitName">Nama Unit</Label>
                  <Input
                    id="unitName"
                    value={formData.unitName}
                    onChange={(e) => setFormData({...formData, unitName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="unitType">Jenis Unit</Label>
                  <select
                    id="unitType"
                    value={formData.unitType}
                    onChange={(e) => setFormData({...formData, unitType: e.target.value as "Retail Store" | "Food Court" | "Rental Property" | "Agriculture" | "Manufacturing" | "Services"})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="Retail Store">Toko Ritel</option>
                    <option value="Food Court">Food Court</option>
                    <option value="Rental Property">Properti Sewa</option>
                    <option value="Agriculture">Pertanian</option>
                    <option value="Manufacturing">Manufaktur</option>
                    <option value="Services">Jasa</option>
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
                  <Label htmlFor="manager">Manajer</Label>
                  <Input
                    id="manager"
                    value={formData.manager}
                    onChange={(e) => setFormData({...formData, manager: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="monthlyRevenue">Pendapatan Bulanan (IDR)</Label>
                  <Input
                    id="monthlyRevenue"
                    type="number"
                    value={formData.monthlyRevenue}
                    onChange={(e) => setFormData({...formData, monthlyRevenue: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="monthlyExpenses">Pengeluaran Bulanan (IDR)</Label>
                  <Input
                    id="monthlyExpenses"
                    type="number"
                    value={formData.monthlyExpenses}
                    onChange={(e) => setFormData({...formData, monthlyExpenses: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="targetRevenue">Target Pendapatan (IDR)</Label>
                  <Input
                    id="targetRevenue"
                    type="number"
                    value={formData.targetRevenue}
                    onChange={(e) => setFormData({...formData, targetRevenue: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="employees">Jumlah Karyawan</Label>
                  <Input
                    id="employees"
                    type="number"
                    value={formData.employees}
                    onChange={(e) => setFormData({...formData, employees: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as "Active" | "Under Development" | "Maintenance" | "Closed"})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="Under Development">Dalam Pengembangan</option>
                    <option value="Active">Aktif</option>
                    <option value="Maintenance">Pemeliharaan</option>
                    <option value="Closed">Tutup</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="establishedDate">Tanggal Didirikan</Label>
                  <Input
                    id="establishedDate"
                    type="date"
                    value={formData.establishedDate}
                    onChange={(e) => setFormData({...formData, establishedDate: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Deskripsi</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    rows={3}
                    placeholder="Deskripsikan unit bisnis"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingUnit ? "Perbarui" : "Buat"} Unit
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
                <TableHead>Nama Unit</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Manajer</TableHead>
                <TableHead>Pendapatan</TableHead>
                <TableHead>Keuntungan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    Memuat data...
                  </TableCell>
                </TableRow>
              ) : units.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    Belum ada data unit
                  </TableCell>
                </TableRow>
              ) : (
                units.map((unit) => (
                <TableRow key={unit.id}>
                  <TableCell className="font-medium">{unit.unitName}</TableCell>
                  <TableCell>
                    <Badge variant={getTypeColor(unit.unitType)}>
                      {unit.unitType}
                    </Badge>
                  </TableCell>
                  <TableCell>{unit.manager}</TableCell>
                  <TableCell>{formatCurrency(unit.monthlyRevenue)}</TableCell>
                  <TableCell className={calculateNetProfit(unit.monthlyRevenue, unit.monthlyExpenses) >= 0 ? "text-green-600" : "text-red-600"}>
                    {formatCurrency(calculateNetProfit(unit.monthlyRevenue, unit.monthlyExpenses))}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(unit.status)}>
                      {unit.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(unit)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => unit.id && handleDelete(unit.id)}>
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

export default ProductiveWaqf;

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Heart, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  amount: number;
  category: "Emergency Aid" | "Medical Support" | "Education" | "Food Distribution" | "General";
  status: "Pending" | "Confirmed" | "Distributed" | "Completed";
  donationDate: string;
  purpose: string;
  isAnonymous: boolean;
  paymentMethod: "Bank Transfer" | "Cash" | "Online Payment" | "Check";
  notes: string;
}

const TaawunDonations = () => {
  const { toast } = useToast();
  const [donations, setDonations] = useState<Donation[]>([
    {
      id: "1",
      donorName: "Hamba Allah",
      donorEmail: "anonymous@example.com",
      donorPhone: "-",
      amount: 1000000,
      category: "Emergency Aid",
      status: "Completed",
      donationDate: "2024-01-15",
      purpose: "Help for flood victims in Bogor",
      isAnonymous: true,
      paymentMethod: "Bank Transfer",
      notes: "May Allah accept this donation"
    },
    {
      id: "2",
      donorName: "Ahmad Wijaya",
      donorEmail: "ahmad.wijaya@email.com",
      donorPhone: "081234567890",
      amount: 500000,
      category: "Medical Support",
      status: "Confirmed",
      donationDate: "2024-02-01",
      purpose: "Medical treatment for underprivileged children",
      isAnonymous: false,
      paymentMethod: "Online Payment",
      notes: "Regular monthly donation"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDonation, setEditingDonation] = useState<Donation | null>(null);
  const [formData, setFormData] = useState<{
    donorName: string;
    donorEmail: string;
    donorPhone: string;
    amount: string;
    category: "Emergency Aid" | "Medical Support" | "Education" | "Food Distribution" | "General";
    status: "Pending" | "Confirmed" | "Distributed" | "Completed";
    donationDate: string;
    purpose: string;
    isAnonymous: boolean;
    paymentMethod: "Bank Transfer" | "Cash" | "Online Payment" | "Check";
    notes: string;
  }>({
    donorName: "",
    donorEmail: "",
    donorPhone: "",
    amount: "",
    category: "General",
    status: "Pending",
    donationDate: "",
    purpose: "",
    isAnonymous: false,
    paymentMethod: "Bank Transfer",
    notes: ""
  });

  const resetForm = () => {
    setFormData({
      donorName: "",
      donorEmail: "",
      donorPhone: "",
      amount: "",
      category: "General",
      status: "Pending",
      donationDate: "",
      purpose: "",
      isAnonymous: false,
      paymentMethod: "Bank Transfer",
      notes: ""
    });
    setEditingDonation(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingDonation) {
      setDonations(donations.map(donation => 
        donation.id === editingDonation.id 
          ? { ...donation, ...formData, amount: Number(formData.amount) }
          : donation
      ));
      toast({ title: "Donasi berhasil diperbarui" });
    } else {
      const newDonation: Donation = {
        id: Date.now().toString(),
        ...formData,
        amount: Number(formData.amount)
      };
      setDonations([...donations, newDonation]);
      toast({ title: "Donasi berhasil dicatat" });
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (donation: Donation) => {
    setEditingDonation(donation);
    setFormData({
      donorName: donation.donorName,
      donorEmail: donation.donorEmail,
      donorPhone: donation.donorPhone,
      amount: donation.amount.toString(),
      category: donation.category,
      status: donation.status,
      donationDate: donation.donationDate,
      purpose: donation.purpose,
      isAnonymous: donation.isAnonymous,
      paymentMethod: donation.paymentMethod,
      notes: donation.notes
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDonations(donations.filter(donation => donation.id !== id));
    toast({ title: "Catatan donasi berhasil dihapus" });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "outline";
      case "Confirmed": return "default";
      case "Distributed": return "secondary";
      case "Completed": return "default";
      default: return "outline";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Emergency Aid": return "destructive";
      case "Medical Support": return "default";
      case "Education": return "secondary";
      case "Food Distribution": return "outline";
      case "General": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-islamic-accent to-islamic-primary rounded-xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-islamic-secondary rounded-full flex items-center justify-center">
            <Heart className="h-6 w-6 text-islamic-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Donasi Ta'awun</h1>
            <p className="text-islamic-secondary/80 text-sm">Manajemen donasi gotong royong dan dukungan masyarakat</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-islamic-accent bg-surface-primary shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-text-secondary">Total Donasi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">{donations.length}</div>
            <p className="text-xs text-islamic-accent">Donasi tercatat</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-status-success bg-surface-primary shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-text-secondary">Total Jumlah</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">
              {formatCurrency(donations.reduce((sum, d) => sum + d.amount, 0))}
            </div>
            <p className="text-xs text-status-success">Total terkumpul</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-status-info bg-surface-primary shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-text-secondary">Selesai</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">
              {donations.filter(d => d.status === "Completed").length}
            </div>
            <p className="text-xs text-status-info">Bantuan tersalurkan</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-islamic-secondary bg-surface-primary shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-text-secondary">Anonim</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">
              {donations.filter(d => d.isAnonymous).length}
            </div>
            <p className="text-xs" style={{color: '#D4AF37'}}>Donatur anonim</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-surface-primary shadow-lg border-0">
        <CardHeader className="flex flex-row items-center justify-between bg-surface-secondary rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-text-primary">
            <Heart className="h-5 w-5 text-islamic-accent" />
            Catatan Donasi
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-islamic-accent hover:bg-islamic-primary text-white">
                <Plus className="h-4 w-4 mr-2" />
                Catat Donasi
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingDonation ? "Edit Donasi" : "Catat Donasi Baru"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="donorName">Nama Donatur</Label>
                  <Input
                    id="donorName"
                    value={formData.donorName}
                    onChange={(e) => setFormData({...formData, donorName: e.target.value})}
                    placeholder="Masukkan 'Hamba Allah' untuk anonim"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="donorEmail">Email</Label>
                  <Input
                    id="donorEmail"
                    type="email"
                    value={formData.donorEmail}
                    onChange={(e) => setFormData({...formData, donorEmail: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="donorPhone">Nomor Telepon</Label>
                  <Input
                    id="donorPhone"
                    value={formData.donorPhone}
                    onChange={(e) => setFormData({...formData, donorPhone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Jumlah Donasi (IDR)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Kategori</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as "Emergency Aid" | "Medical Support" | "Education" | "Food Distribution" | "General"})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="General">Umum</option>
                    <option value="Emergency Aid">Bantuan Darurat</option>
                    <option value="Medical Support">Dukungan Medis</option>
                    <option value="Education">Pendidikan</option>
                    <option value="Food Distribution">Distribusi Makanan</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as "Pending" | "Confirmed" | "Distributed" | "Completed"})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="Pending">Menunggu</option>
                    <option value="Confirmed">Dikonfirmasi</option>
                    <option value="Distributed">Disalurkan</option>
                    <option value="Completed">Selesai</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="donationDate">Tanggal Donasi</Label>
                  <Input
                    id="donationDate"
                    type="date"
                    value={formData.donationDate}
                    onChange={(e) => setFormData({...formData, donationDate: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="purpose">Tujuan</Label>
                  <textarea
                    id="purpose"
                    value={formData.purpose}
                    onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    rows={2}
                    placeholder="Untuk apa donasi ini?"
                  />
                </div>
                <div>
                  <Label htmlFor="paymentMethod">Metode Pembayaran</Label>
                  <select
                    id="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value as "Bank Transfer" | "Cash" | "Online Payment" | "Check"})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="Bank Transfer">Transfer Bank</option>
                    <option value="Cash">Tunai</option>
                    <option value="Online Payment">Pembayaran Online</option>
                    <option value="Check">Cek</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isAnonymous"
                    checked={formData.isAnonymous}
                    onChange={(e) => setFormData({...formData, isAnonymous: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="isAnonymous">Donasi Anonim</Label>
                </div>
                <div>
                  <Label htmlFor="notes">Catatan</Label>
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    rows={2}
                    placeholder="Catatan atau pesan tambahan"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1 bg-islamic-accent hover:bg-islamic-primary text-white">
                    {editingDonation ? "Perbarui" : "Catat"} Donasi
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="border-text-tertiary text-text-secondary hover:bg-surface-tertiary">
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
                <TableHead>Donatur</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Pembayaran</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell className="font-medium">
                    {donation.isAnonymous ? "Hamba Allah" : donation.donorName}
                  </TableCell>
                  <TableCell>{formatCurrency(donation.amount)}</TableCell>
                  <TableCell>
                    <Badge variant={getCategoryColor(donation.category)}>
                      {donation.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(donation.status)}>
                      {donation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(donation.donationDate).toLocaleDateString('id-ID')}</TableCell>
                  <TableCell>{donation.paymentMethod}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(donation)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(donation.id)}>
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

export default TaawunDonations;

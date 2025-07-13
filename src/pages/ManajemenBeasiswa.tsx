import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Scholarship {
  id: string;
  studentName: string;
  program: "Elementary" | "Middle School" | "High School" | "University";
  amount: number;
  status: "Active" | "Pending" | "Completed" | "Suspended";
  startDate: string;
  endDate: string;
  sponsor: string;
  gpa: number;
  description: string;
}

const ScholarshipManagement = () => {
  const { toast } = useToast();
  const [scholarships, setScholarships] = useState<Scholarship[]>([
    {
      id: "1",
      studentName: "Ahmad Fauzi",
      program: "University",
      amount: 5000000,
      status: "Active",
      startDate: "2024-01-15",
      endDate: "2024-12-15",
      sponsor: "Yayasan Bilistiwa",
      gpa: 3.8,
      description: "Computer Science student at IPB University"
    },
    {
      id: "2",
      studentName: "Siti Nurhaliza",
      program: "High School",
      amount: 2500000,
      status: "Active",
      startDate: "2024-02-01",
      endDate: "2025-01-31",
      sponsor: "Individual Donor",
      gpa: 3.9,
      description: "Outstanding student in Islamic studies"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState<Scholarship | null>(null);
  const [formData, setFormData] = useState<{
    studentName: string;
    program: "Elementary" | "Middle School" | "High School" | "University";
    amount: string;
    status: "Active" | "Pending" | "Completed" | "Suspended";
    startDate: string;
    endDate: string;
    sponsor: string;
    gpa: string;
    description: string;
  }>({
    studentName: "",
    program: "Elementary",
    amount: "",
    status: "Pending",
    startDate: "",
    endDate: "",
    sponsor: "",
    gpa: "",
    description: ""
  });

  const resetForm = () => {
    setFormData({
      studentName: "",
      program: "Elementary",
      amount: "",
      status: "Pending",
      startDate: "",
      endDate: "",
      sponsor: "",
      gpa: "",
      description: ""
    });
    setEditingScholarship(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingScholarship) {
      setScholarships(scholarships.map(scholarship => 
        scholarship.id === editingScholarship.id 
          ? { ...scholarship, ...formData, amount: Number(formData.amount), gpa: Number(formData.gpa) }
          : scholarship
      ));
      toast({ title: "Beasiswa berhasil diperbarui" });
    } else {
      const newScholarship: Scholarship = {
        id: Date.now().toString(),
        ...formData,
        amount: Number(formData.amount),
        gpa: Number(formData.gpa)
      };
      setScholarships([...scholarships, newScholarship]);
      toast({ title: "Beasiswa berhasil dibuat" });
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (scholarship: Scholarship) => {
    setEditingScholarship(scholarship);
    setFormData({
      studentName: scholarship.studentName,
      program: scholarship.program,
      amount: scholarship.amount.toString(),
      status: scholarship.status,
      startDate: scholarship.startDate,
      endDate: scholarship.endDate,
      sponsor: scholarship.sponsor,
      gpa: scholarship.gpa.toString(),
      description: scholarship.description
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setScholarships(scholarships.filter(scholarship => scholarship.id !== id));
    toast({ title: "Beasiswa berhasil dihapus" });
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
      case "Pending": return "outline";
      case "Completed": return "secondary";
      case "Suspended": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-islamic-primary to-islamic-dark rounded-xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-islamic-secondary rounded-full flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-islamic-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Manajemen Beasiswa</h1>
            <p className="text-islamic-secondary/80 text-sm">Kelola beasiswa siswa, pendanaan, dan program dukungan akademik</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-status-info bg-surface-primary shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-text-secondary">Total Beasiswa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">{scholarships.length}</div>
            <p className="text-xs text-status-info">Program aktif</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-status-success bg-surface-primary shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-text-secondary">Siswa Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">
              {scholarships.filter(s => s.status === "Active").length}
            </div>
            <p className="text-xs text-status-success">Sedang didanai</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-islamic-secondary bg-surface-primary shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-text-secondary">Total Pendanaan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">
              {formatCurrency(scholarships.reduce((sum, s) => sum + s.amount, 0))}
            </div>
            <p className="text-xs" style={{color: '#D4AF37'}}>Anggaran tahunan</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-status-warning bg-surface-primary shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-text-secondary">Rata-rata IPK</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">
              {scholarships.length > 0 ? (scholarships.reduce((sum, s) => sum + s.gpa, 0) / scholarships.length).toFixed(2) : "0.00"}
            </div>
            <p className="text-xs text-status-warning">Prestasi akademik</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-surface-primary shadow-lg border-0">
        <CardHeader className="flex flex-row items-center justify-between bg-surface-secondary rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-text-primary">
            <GraduationCap className="h-5 w-5 text-islamic-primary" />
            Penerima Beasiswa
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-islamic-primary hover:bg-islamic-dark text-white">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Beasiswa
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingScholarship ? "Edit Beasiswa" : "Tambah Beasiswa Baru"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="studentName">Nama Siswa</Label>
                  <Input
                    id="studentName"
                    value={formData.studentName}
                    onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="program">Tingkat Program</Label>
                  <select
                    id="program"
                    value={formData.program}
                    onChange={(e) => setFormData({...formData, program: e.target.value as "Elementary" | "Middle School" | "High School" | "University"})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="Elementary">SD</option>
                    <option value="Middle School">SMP</option>
                    <option value="High School">SMA</option>
                    <option value="University">Universitas</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="amount">Jumlah Beasiswa (IDR)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as "Active" | "Pending" | "Completed" | "Suspended"})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="Pending">Menunggu</option>
                    <option value="Active">Aktif</option>
                    <option value="Completed">Selesai</option>
                    <option value="Suspended">Ditangguhkan</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="startDate">Tanggal Mulai</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">Tanggal Berakhir</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="sponsor">Sponsor</Label>
                  <Input
                    id="sponsor"
                    value={formData.sponsor}
                    onChange={(e) => setFormData({...formData, sponsor: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="gpa">IPK</Label>
                  <Input
                    id="gpa"
                    type="number"
                    step="0.01"
                    min="0"
                    max="4"
                    value={formData.gpa}
                    onChange={(e) => setFormData({...formData, gpa: e.target.value})}
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
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1 bg-islamic-primary hover:bg-islamic-dark text-white">
                    {editingScholarship ? "Perbarui" : "Buat"} Beasiswa
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
                <TableHead>Nama Siswa</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>IPK</TableHead>
                <TableHead>Sponsor</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scholarships.map((scholarship) => (
                <TableRow key={scholarship.id}>
                  <TableCell className="font-medium">{scholarship.studentName}</TableCell>
                  <TableCell>{scholarship.program}</TableCell>
                  <TableCell>{formatCurrency(scholarship.amount)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(scholarship.status)}>
                      {scholarship.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{scholarship.gpa}</TableCell>
                  <TableCell>{scholarship.sponsor}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(scholarship)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(scholarship.id)}>
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

export default ScholarshipManagement;

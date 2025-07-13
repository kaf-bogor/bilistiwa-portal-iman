import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users2, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TeacherWelfare {
  id: string;
  teacherName: string;
  employeeId: string;
  position: "Head Teacher" | "Senior Teacher" | "Junior Teacher" | "Assistant Teacher" | "Substitute Teacher";
  department: "Islamic Studies" | "Arabic Language" | "General Studies" | "Administration" | "Support Staff";
  baseSalary: number;
  allowances: number;
  benefits: string[];
  status: "Active" | "On Leave" | "Probation" | "Terminated";
  joinDate: string;
  phoneNumber: string;
  email: string;
  address: string;
  emergencyContact: string;
  notes: string;
}

const TeacherWelfare = () => {
  const { toast } = useToast();
  const [teachers, setTeachers] = useState<TeacherWelfare[]>([
    {
      id: "1",
      teacherName: "Ustadz Ahmad Hidayat",
      employeeId: "EMP001",
      position: "Head Teacher",
      department: "Islamic Studies",
      baseSalary: 8000000,
      allowances: 2000000,
      benefits: ["Health Insurance", "Transportation", "Meal Allowance"],
      status: "Active",
      joinDate: "2022-01-15",
      phoneNumber: "081234567890",
      email: "ahmad.hidayat@kuttab.edu",
      address: "Jl. Raya Bogor No. 123, Bogor",
      emergencyContact: "Siti Hidayat - 081987654321",
      notes: "Excellent performance in Islamic studies curriculum"
    },
    {
      id: "2",
      teacherName: "Ustadzah Fatimah Zahra",
      employeeId: "EMP002",
      position: "Senior Teacher",
      department: "Arabic Language",
      baseSalary: 6500000,
      allowances: 1500000,
      benefits: ["Health Insurance", "Transportation"],
      status: "Active",
      joinDate: "2022-06-01",
      phoneNumber: "081345678901",
      email: "fatimah.zahra@kuttab.edu",
      address: "Jl. Pajajaran No. 456, Bogor",
      emergencyContact: "Muhammad Zahra - 081876543210",
      notes: "Specialized in Arabic language and literature"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<TeacherWelfare | null>(null);
  const [formData, setFormData] = useState<{
    teacherName: string;
    employeeId: string;
    position: "Head Teacher" | "Senior Teacher" | "Junior Teacher" | "Assistant Teacher" | "Substitute Teacher";
    department: "Islamic Studies" | "Arabic Language" | "General Studies" | "Administration" | "Support Staff";
    baseSalary: string;
    allowances: string;
    benefits: string;
    status: "Active" | "On Leave" | "Probation" | "Terminated";
    joinDate: string;
    phoneNumber: string;
    email: string;
    address: string;
    emergencyContact: string;
    notes: string;
  }>({
    teacherName: "",
    employeeId: "",
    position: "Junior Teacher",
    department: "Islamic Studies",
    baseSalary: "",
    allowances: "",
    benefits: "",
    status: "Active",
    joinDate: "",
    phoneNumber: "",
    email: "",
    address: "",
    emergencyContact: "",
    notes: ""
  });

  const resetForm = () => {
    setFormData({
      teacherName: "",
      employeeId: "",
      position: "Junior Teacher",
      department: "Islamic Studies",
      baseSalary: "",
      allowances: "",
      benefits: "",
      status: "Active",
      joinDate: "",
      phoneNumber: "",
      email: "",
      address: "",
      emergencyContact: "",
      notes: ""
    });
    setEditingTeacher(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const benefitsArray = formData.benefits.split(',').map(b => b.trim()).filter(b => b);
    
    if (editingTeacher) {
      setTeachers(teachers.map(teacher => 
        teacher.id === editingTeacher.id 
          ? { 
              ...teacher, 
              ...formData, 
              baseSalary: Number(formData.baseSalary),
              allowances: Number(formData.allowances),
              benefits: benefitsArray
            }
          : teacher
      ));
      toast({ title: "Data kesejahteraan guru berhasil diperbarui" });
    } else {
      const newTeacher: TeacherWelfare = {
        id: Date.now().toString(),
        ...formData,
        baseSalary: Number(formData.baseSalary),
        allowances: Number(formData.allowances),
        benefits: benefitsArray
      };
      setTeachers([...teachers, newTeacher]);
      toast({ title: "Data kesejahteraan guru berhasil dibuat" });
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (teacher: TeacherWelfare) => {
    setEditingTeacher(teacher);
    setFormData({
      teacherName: teacher.teacherName,
      employeeId: teacher.employeeId,
      position: teacher.position,
      department: teacher.department,
      baseSalary: teacher.baseSalary.toString(),
      allowances: teacher.allowances.toString(),
      benefits: teacher.benefits.join(', '),
      status: teacher.status,
      joinDate: teacher.joinDate,
      phoneNumber: teacher.phoneNumber,
      email: teacher.email,
      address: teacher.address,
      emergencyContact: teacher.emergencyContact,
      notes: teacher.notes
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setTeachers(teachers.filter(teacher => teacher.id !== id));
    toast({ title: "Data kesejahteraan guru berhasil dihapus" });
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
      case "On Leave": return "secondary";
      case "Probation": return "outline";
      case "Terminated": return "destructive";
      default: return "outline";
    }
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case "Head Teacher": return "default";
      case "Senior Teacher": return "secondary";
      case "Junior Teacher": return "outline";
      case "Assistant Teacher": return "outline";
      case "Substitute Teacher": return "secondary";
      default: return "outline";
    }
  };

  const totalSalaryBudget = teachers.reduce((sum, teacher) => sum + teacher.baseSalary + teacher.allowances, 0);
  const activeTeachers = teachers.filter(t => t.status === "Active").length;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Manajemen Kesejahteraan Guru</h1>
        <p className="text-teal-100">Kelola gaji guru, tunjangan, dan program kesejahteraan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-teal-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Guru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachers.length}</div>
            <p className="text-xs text-teal-600">Anggota staf</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Guru Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeTeachers}</div>
            <p className="text-xs text-green-600">Sedang bekerja</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Anggaran Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalSalaryBudget)}</div>
            <p className="text-xs text-blue-600">Gaji & tunjangan</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Rata-rata Gaji</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teachers.length > 0 ? formatCurrency(totalSalaryBudget / teachers.length) : formatCurrency(0)}
            </div>
            <p className="text-xs text-purple-600">Per guru</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users2 className="h-5 w-5" />
            Data Guru
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Guru
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingTeacher ? "Edit Data Guru" : "Tambah Guru Baru"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="teacherName">Nama Guru</Label>
                  <Input
                    id="teacherName"
                    value={formData.teacherName}
                    onChange={(e) => setFormData({...formData, teacherName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="employeeId">ID Karyawan</Label>
                  <Input
                    id="employeeId"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="position">Jabatan</Label>
                  <select
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value as "Head Teacher" | "Senior Teacher" | "Junior Teacher" | "Assistant Teacher" | "Substitute Teacher"})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="Junior Teacher">Guru Yunior</option>
                    <option value="Assistant Teacher">Asisten Guru</option>
                    <option value="Senior Teacher">Guru Senior</option>
                    <option value="Head Teacher">Kepala Guru</option>
                    <option value="Substitute Teacher">Guru Pengganti</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="department">Departemen</Label>
                  <select
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value as "Islamic Studies" | "Arabic Language" | "General Studies" | "Administration" | "Support Staff"})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="Islamic Studies">Studi Islam</option>
                    <option value="Arabic Language">Bahasa Arab</option>
                    <option value="General Studies">Studi Umum</option>
                    <option value="Administration">Administrasi</option>
                    <option value="Support Staff">Staf Pendukung</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="baseSalary">Gaji Pokok (IDR)</Label>
                  <Input
                    id="baseSalary"
                    type="number"
                    value={formData.baseSalary}
                    onChange={(e) => setFormData({...formData, baseSalary: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="allowances">Tunjangan (IDR)</Label>
                  <Input
                    id="allowances"
                    type="number"
                    value={formData.allowances}
                    onChange={(e) => setFormData({...formData, allowances: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="benefits">Fasilitas (pisahkan dengan koma)</Label>
                  <Input
                    id="benefits"
                    value={formData.benefits}
                    onChange={(e) => setFormData({...formData, benefits: e.target.value})}
                    placeholder="Asuransi Kesehatan, Transportasi, Tunjangan Makan"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as "Active" | "On Leave" | "Probation" | "Terminated"})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="Active">Aktif</option>
                    <option value="On Leave">Cuti</option>
                    <option value="Probation">Masa Percobaan</option>
                    <option value="Terminated">Diberhentikan</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="joinDate">Tanggal Bergabung</Label>
                  <Input
                    id="joinDate"
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Nomor Telepon</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Alamat</Label>
                  <textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyContact">Kontak Darurat</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                    placeholder="Nama - Nomor Telepon"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Catatan</Label>
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    rows={2}
                    placeholder="Catatan tambahan tentang guru"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingTeacher ? "Perbarui" : "Tambah"} Guru
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
                <TableHead>Jabatan</TableHead>
                <TableHead>Departemen</TableHead>
                <TableHead>Total Gaji</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{teacher.teacherName}</TableCell>
                  <TableCell>
                    <Badge variant={getPositionColor(teacher.position)}>
                      {teacher.position}
                    </Badge>
                  </TableCell>
                  <TableCell>{teacher.department}</TableCell>
                  <TableCell>{formatCurrency(teacher.baseSalary + teacher.allowances)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(teacher.status)}>
                      {teacher.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(teacher)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(teacher.id)}>
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

export default TeacherWelfare;

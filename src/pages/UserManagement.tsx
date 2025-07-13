import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Settings, Plus, Edit, Trash2, Eye, Shield, Users, Key, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFirebaseCollection } from "@/hooks/useFirebase";
import { usersService } from "@/lib/firebaseService";

interface User {
  id?: string;
  username: string;
  fullName: string;
  email: string;
  role: "Super Admin" | "Finance Team" | "Unit Manager" | "Leadership" | "Teacher" | "Staff";
  department: "Administration" | "Finance" | "Academic" | "Operations" | "IT" | "Management";
  status: "Active" | "Inactive" | "Suspended" | "Pending";
  lastLogin: string;
  phoneNumber: string;
  position: string;
  notes: string;
  permissions: string[];
}

const UserManagement = () => {
  const { toast } = useToast();
  const { 
    documents: firebaseUsers, 
    loading, 
    error, 
    createDocument, 
    updateDocument, 
    deleteDocument 
  } = useFirebaseCollection(usersService, {
    orderByField: 'fullName',
    orderDirection: 'asc'
  });

  // Type the Firebase documents as User objects
  const users = firebaseUsers as unknown as User[];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<{
    username: string;
    fullName: string;
    email: string;
    role: "Super Admin" | "Finance Team" | "Unit Manager" | "Leadership" | "Teacher" | "Staff";
    department: "Administration" | "Finance" | "Academic" | "Operations" | "IT" | "Management";
    status: "Active" | "Inactive" | "Suspended" | "Pending";
    permissions: string;
    phoneNumber: string;
    position: string;
    notes: string;
  }>({
    username: "",
    fullName: "",
    email: "",
    role: "Staff",
    department: "Administration",
    status: "Pending",
    permissions: "",
    phoneNumber: "",
    position: "",
    notes: ""
  });

  const resetForm = () => {
    setFormData({
      username: "",
      fullName: "",
      email: "",
      role: "Staff",
      department: "Administration",
      status: "Pending",
      permissions: "",
      phoneNumber: "",
      position: "",
      notes: ""
    });
    setEditingUser(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const permissionsArray = formData.permissions.split(',').map(p => p.trim()).filter(p => p);
      
      const userData = {
        ...formData,
        permissions: permissionsArray,
        lastLogin: editingUser?.lastLogin || "-"
      };

      if (editingUser) {
        await updateDocument(editingUser.id!, userData);
        toast({ title: "Pengguna berhasil diperbarui" });
      } else {
        await createDocument(userData);
        toast({ title: "Pengguna berhasil dibuat" });
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({ 
        title: "Error", 
        description: "Gagal menyimpan pengguna", 
        variant: "destructive" 
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      department: user.department,
      status: user.status,
      permissions: user.permissions.join(', '),
      phoneNumber: user.phoneNumber,
      position: user.position,
      notes: user.notes
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      try {
        await deleteDocument(id);
        toast({ title: "Pengguna berhasil dihapus" });
      } catch (error) {
        toast({ 
          title: "Error", 
          description: "Gagal menghapus pengguna", 
          variant: "destructive" 
        });
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "Inactive": return "secondary";
      case "Suspended": return "destructive";
      case "Pending": return "outline";
      default: return "outline";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Super Admin": return "destructive";
      case "Finance Team": return "default";
      case "Unit Manager": return "secondary";
      case "Leadership": return "default";
      case "Teacher": return "outline";
      case "Staff": return "secondary";
      default: return "outline";
    }
  };

  const formatDate = (dateString: string) => {
    if (dateString === "-") return "-";
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Calculate statistics
  const activeUsers = users.filter(u => u.status === "Active").length;
  const pendingUsers = users.filter(u => u.status === "Pending").length;
  const suspendedUsers = users.filter(u => u.status === "Suspended").length;

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error loading users: {error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Manajemen Akses Pengguna</h1>
        <p className="text-slate-100">Kontrol akses berbasis peran untuk admin, keuangan, manajer unit, dan pimpinan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-slate-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Pengguna</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : users.length}
            </div>
            <p className="text-xs text-slate-600">Pengguna sistem</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Pengguna Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : activeUsers}
            </div>
            <p className="text-xs text-green-600">Sedang aktif</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Menunggu Persetujuan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : pendingUsers}
            </div>
            <p className="text-xs text-yellow-600">Menunggu persetujuan</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Ditangguhkan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : suspendedUsers}
            </div>
            <p className="text-xs text-red-600">Akses ditangguhkan</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Pengguna Sistem
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Pengguna
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingUser ? "Edit Pengguna" : "Tambah Pengguna Baru"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="username">Nama Pengguna</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="fullName">Nama Lengkap</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
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
                  <Label htmlFor="phoneNumber">Nomor Telepon</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="position">Jabatan</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="role">Peran</Label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value as "Super Admin" | "Finance Team" | "Unit Manager" | "Leadership" | "Teacher" | "Staff"})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="Staff">Staf</option>
                    <option value="Teacher">Guru</option>
                    <option value="Unit Manager">Manajer Unit</option>
                    <option value="Finance Team">Tim Keuangan</option>
                    <option value="Leadership">Pimpinan</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="department">Departemen</Label>
                  <select
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value as "Administration" | "Finance" | "Academic" | "Operations" | "IT" | "Management"})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="Administration">Administrasi</option>
                    <option value="Academic">Akademik</option>
                    <option value="Finance">Keuangan</option>
                    <option value="Operations">Operasional</option>
                    <option value="IT">IT</option>
                    <option value="Management">Manajemen</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as "Active" | "Inactive" | "Suspended" | "Pending"})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="Pending">Menunggu</option>
                    <option value="Active">Aktif</option>
                    <option value="Inactive">Tidak Aktif</option>
                    <option value="Suspended">Ditangguhkan</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="permissions">Izin (pisahkan dengan koma)</Label>
                  <Input
                    id="permissions"
                    value={formData.permissions}
                    onChange={(e) => setFormData({...formData, permissions: e.target.value})}
                    placeholder="Manajemen Pengguna, Data Keuangan, Laporan"
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
                    placeholder="Catatan tambahan tentang pengguna"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1" disabled={submitting}>
                    {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {editingUser ? "Perbarui" : "Buat"} Pengguna
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
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading users...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pengguna</TableHead>
                  <TableHead>Peran</TableHead>
                  <TableHead>Departemen</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Login Terakhir</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{user.fullName}</div>
                        <div className="text-xs text-gray-500">@{user.username} • {user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(user.lastLogin)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Key className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(user.id!)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Role Permissions Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Ikhtisar Izin Peran
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-red-600 mb-2">Super Admin</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Akses sistem penuh</li>
                <li>• Manajemen pengguna</li>
                <li>• Konfigurasi sistem</li>
                <li>• Akses semua data</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-blue-600 mb-2">Tim Keuangan</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Akses data keuangan</li>
                <li>• Manajemen donasi</li>
                <li>• Catatan beasiswa</li>
                <li>• Pelaporan keuangan</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-green-600 mb-2">Manajer Unit</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Akses khusus unit</li>
                <li>• Manajemen wakaf produktif</li>
                <li>• Manajemen aset</li>
                <li>• Laporan operasional</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-purple-600 mb-2">Pimpinan</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Ikhtisar strategis</li>
                <li>• Laporan eksekutif</li>
                <li>• Metrik kinerja</li>
                <li>• Data dukungan keputusan</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-orange-600 mb-2">Guru</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Catatan akademik</li>
                <li>• Informasi siswa</li>
                <li>• Sumber daya pendidikan</li>
                <li>• Manajemen kelas</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-gray-600 mb-2">Staf</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Akses sistem dasar</li>
                <li>• Data khusus departemen</li>
                <li>• Pelaporan terbatas</li>
                <li>• Manajemen profil</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;

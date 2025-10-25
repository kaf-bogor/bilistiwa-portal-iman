import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Menu, Plus, Edit, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { menuItemsService } from "@/lib/firebaseService";
import { Timestamp } from "firebase/firestore";
import { Switch } from "@/components/ui/switch";

interface MenuItem {
  id?: string;
  title: string;
  url: string;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const MenuManagement = () => {
  const { toast } = useToast();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    icon: "",
    order: "",
    isActive: true
  });

  useEffect(() => {
    const unsubscribe = menuItemsService.onSnapshot((documents) => {
      const sortedItems = (documents as MenuItem[]).sort((a, b) => a.order - b.order);
      setMenuItems(sortedItems);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      url: "",
      icon: "",
      order: "",
      isActive: true
    });
    setEditingItem(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const itemData = {
        title: formData.title,
        url: formData.url,
        icon: formData.icon,
        order: Number(formData.order),
        isActive: formData.isActive
      };

      if (editingItem && editingItem.id) {
        await menuItemsService.update(editingItem.id, itemData);
        toast({ title: "Item menu berhasil diperbarui" });
      } else {
        await menuItemsService.create(itemData);
        toast({ title: "Item menu berhasil dibuat" });
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan item menu",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      url: item.url,
      icon: item.icon,
      order: item.order.toString(),
      isActive: item.isActive
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus item menu ini?")) return;

    try {
      await menuItemsService.delete(id);
      toast({ title: "Item menu berhasil dihapus" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus item menu",
        variant: "destructive"
      });
    }
  };

  const handleToggleActive = async (item: MenuItem) => {
    if (!item.id) return;

    try {
      await menuItemsService.update(item.id, { isActive: !item.isActive });
      toast({
        title: item.isActive ? "Item menu dinonaktifkan" : "Item menu diaktifkan"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengubah status item menu",
        variant: "destructive"
      });
    }
  };

  const handleMoveUp = async (item: MenuItem, index: number) => {
    if (index === 0 || !item.id) return;

    const prevItem = menuItems[index - 1];
    if (!prevItem.id) return;

    try {
      await menuItemsService.update(item.id, { order: prevItem.order });
      await menuItemsService.update(prevItem.id, { order: item.order });
      toast({ title: "Urutan berhasil diubah" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengubah urutan",
        variant: "destructive"
      });
    }
  };

  const handleMoveDown = async (item: MenuItem, index: number) => {
    if (index === menuItems.length - 1 || !item.id) return;

    const nextItem = menuItems[index + 1];
    if (!nextItem.id) return;

    try {
      await menuItemsService.update(item.id, { order: nextItem.order });
      await menuItemsService.update(nextItem.id, { order: item.order });
      toast({ title: "Urutan berhasil diubah" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengubah urutan",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Manajemen Menu Sidebar</h1>
        <p className="text-purple-100">Kelola item menu navigasi sidebar aplikasi</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Menu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{menuItems.length}</div>
            <p className="text-xs text-purple-600">Item menu</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Menu Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {menuItems.filter(item => item.isActive).length}
            </div>
            <p className="text-xs text-green-600">Tampil di sidebar</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-gray-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Menu Nonaktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {menuItems.filter(item => !item.isActive).length}
            </div>
            <p className="text-xs text-gray-600">Tidak tampil</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Menu className="h-5 w-5" />
            Item Menu
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Menu
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? "Edit Item Menu" : "Tambah Item Menu Baru"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Judul Menu</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Dashboard"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    value={formData.url}
                    onChange={(e) => setFormData({...formData, url: e.target.value})}
                    placeholder="/dashboard"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="icon">Nama Icon (Lucide)</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({...formData, icon: e.target.value})}
                    placeholder="LayoutDashboard"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Lihat icon di: lucide.dev/icons
                  </p>
                </div>
                <div>
                  <Label htmlFor="order">Urutan</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: e.target.value})}
                    placeholder="1"
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
                  />
                  <Label htmlFor="isActive">Aktif</Label>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingItem ? "Perbarui" : "Buat"} Menu
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
                <TableHead className="w-[50px]">Urutan</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Icon</TableHead>
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
              ) : menuItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Belum ada item menu
                  </TableCell>
                </TableRow>
              ) : (
                menuItems.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMoveUp(item, index)}
                          disabled={index === 0}
                        >
                          <ArrowUp className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMoveDown(item, index)}
                          disabled={index === menuItems.length - 1}
                        >
                          <ArrowDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell className="text-sm text-gray-600">{item.url}</TableCell>
                    <TableCell className="text-sm">{item.icon}</TableCell>
                    <TableCell>
                      <Badge variant={item.isActive ? "default" : "secondary"}>
                        {item.isActive ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleActive(item)}
                          title={item.isActive ? "Nonaktifkan" : "Aktifkan"}
                        >
                          <Switch checked={item.isActive} className="pointer-events-none" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => item.id && handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuManagement;

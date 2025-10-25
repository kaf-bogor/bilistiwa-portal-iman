import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Edit, Trash2, Eye, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { eventsService } from "@/lib/firebaseService";
import { Timestamp } from "firebase/firestore";

interface Event {
  id?: string;
  eventName: string;
  eventType: "Academic" | "Religious" | "Community" | "Administrative" | "Fundraising" | "Cultural";
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  organizer: string;
  maxParticipants: number;
  currentParticipants: number;
  status: "Planned" | "Ongoing" | "Completed" | "Cancelled" | "Postponed";
  priority: "Low" | "Medium" | "High" | "Critical";
  budget: number;
  actualCost: number;
  requirements: string[];
  notes: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const EventsCalendar = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from Firestore on component mount
  useEffect(() => {
    const unsubscribe = eventsService.onSnapshot((docs) => {
      setEvents(docs as Event[]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<{
    eventName: string;
    eventType: "Academic" | "Religious" | "Community" | "Administrative" | "Fundraising" | "Cultural";
    description: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    location: string;
    organizer: string;
    maxParticipants: string;
    currentParticipants: string;
    status: "Planned" | "Ongoing" | "Completed" | "Cancelled" | "Postponed";
    priority: "Low" | "Medium" | "High" | "Critical";
    budget: string;
    actualCost: string;
    requirements: string;
    notes: string;
  }>({
    eventName: "",
    eventType: "Community",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    location: "",
    organizer: "",
    maxParticipants: "",
    currentParticipants: "0",
    status: "Planned",
    priority: "Medium",
    budget: "",
    actualCost: "0",
    requirements: "",
    notes: ""
  });

  const resetForm = () => {
    setFormData({
      eventName: "",
      eventType: "Community",
      description: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      location: "",
      organizer: "",
      maxParticipants: "",
      currentParticipants: "0",
      status: "Planned",
      priority: "Medium",
      budget: "",
      actualCost: "0",
      requirements: "",
      notes: ""
    });
    setEditingEvent(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const requirementsArray = formData.requirements.split(',').map(r => r.trim()).filter(r => r);

      if (editingEvent && editingEvent.id) {
        await eventsService.update(editingEvent.id, {
          eventName: formData.eventName,
          eventType: formData.eventType,
          description: formData.description,
          startDate: formData.startDate,
          endDate: formData.endDate,
          startTime: formData.startTime,
          endTime: formData.endTime,
          location: formData.location,
          organizer: formData.organizer,
          maxParticipants: Number(formData.maxParticipants),
          currentParticipants: Number(formData.currentParticipants),
          status: formData.status,
          priority: formData.priority,
          budget: Number(formData.budget),
          actualCost: Number(formData.actualCost),
          requirements: requirementsArray,
          notes: formData.notes
        });
        toast({ title: "Acara berhasil diperbarui" });
      } else {
        await eventsService.create({
          eventName: formData.eventName,
          eventType: formData.eventType,
          description: formData.description,
          startDate: formData.startDate,
          endDate: formData.endDate,
          startTime: formData.startTime,
          endTime: formData.endTime,
          location: formData.location,
          organizer: formData.organizer,
          maxParticipants: Number(formData.maxParticipants),
          currentParticipants: Number(formData.currentParticipants),
          status: formData.status,
          priority: formData.priority,
          budget: Number(formData.budget),
          actualCost: Number(formData.actualCost),
          requirements: requirementsArray,
          notes: formData.notes
        });
        toast({ title: "Acara berhasil dibuat" });
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan acara",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      eventName: event.eventName,
      eventType: event.eventType,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location,
      organizer: event.organizer,
      maxParticipants: event.maxParticipants.toString(),
      currentParticipants: event.currentParticipants.toString(),
      status: event.status,
      priority: event.priority,
      budget: event.budget.toString(),
      actualCost: event.actualCost.toString(),
      requirements: event.requirements.join(', '),
      notes: event.notes
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await eventsService.delete(id);
      toast({ title: "Acara berhasil dihapus" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus acara",
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
      case "Planned": return "outline";
      case "Ongoing": return "default";
      case "Completed": return "secondary";
      case "Cancelled": return "destructive";
      case "Postponed": return "outline";
      default: return "outline";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Low": return "secondary";
      case "Medium": return "outline";
      case "High": return "default";
      case "Critical": return "destructive";
      default: return "outline";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Academic": return "default";
      case "Religious": return "secondary";
      case "Community": return "outline";
      case "Administrative": return "outline";
      case "Fundraising": return "default";
      case "Cultural": return "secondary";
      default: return "outline";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const upcomingEvents = events.filter(e => new Date(e.startDate) >= new Date() && e.status !== "Cancelled").length;
  const totalBudget = events.reduce((sum, e) => sum + e.budget, 0);
  const totalParticipants = events.reduce((sum, e) => sum + e.currentParticipants, 0);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Acara & Kalender</h1>
        <p className="text-orange-100">Kelola acara institusi, kegiatan, dan program komunitas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Acara</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
            <p className="text-xs text-orange-600">Semua acara</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Acara Mendatang</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents}</div>
            <p className="text-xs text-green-600">Terjadwal ke depan</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Anggaran</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalBudget)}</div>
            <p className="text-xs text-blue-600">Anggaran acara</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Peserta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalParticipants}</div>
            <p className="text-xs text-purple-600">Total terdaftar</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Jadwal Acara
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Acara
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingEvent ? "Edit Acara" : "Buat Acara Baru"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="eventName">Nama Acara</Label>
                  <Input
                    id="eventName"
                    value={formData.eventName}
                    onChange={(e) => setFormData({...formData, eventName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="eventType">Jenis Acara</Label>
                  <select
                    id="eventType"
                    value={formData.eventType}
                    onChange={(e) => setFormData({...formData, eventType: e.target.value as "Academic" | "Religious" | "Community" | "Administrative" | "Fundraising" | "Cultural"})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="Community">Komunitas</option>
                    <option value="Academic">Akademik</option>
                    <option value="Religious">Keagamaan</option>
                    <option value="Administrative">Administratif</option>
                    <option value="Fundraising">Penggalangan Dana</option>
                    <option value="Cultural">Budaya</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="description">Deskripsi</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    rows={2}
                    placeholder="Deskripsi singkat acara"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
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
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="startTime">Waktu Mulai</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime">Waktu Berakhir</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                      required
                    />
                  </div>
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
                  <Label htmlFor="organizer">Penyelenggara</Label>
                  <Input
                    id="organizer"
                    value={formData.organizer}
                    onChange={(e) => setFormData({...formData, organizer: e.target.value})}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="maxParticipants">Maks Peserta</Label>
                    <Input
                      id="maxParticipants"
                      type="number"
                      value={formData.maxParticipants}
                      onChange={(e) => setFormData({...formData, maxParticipants: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentParticipants">Peserta Saat Ini</Label>
                    <Input
                      id="currentParticipants"
                      type="number"
                      value={formData.currentParticipants}
                      onChange={(e) => setFormData({...formData, currentParticipants: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value as "Planned" | "Ongoing" | "Completed" | "Cancelled" | "Postponed"})}
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="Planned">Direncanakan</option>
                      <option value="Ongoing">Berlangsung</option>
                      <option value="Completed">Selesai</option>
                      <option value="Postponed">Ditunda</option>
                      <option value="Cancelled">Dibatalkan</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Prioritas</Label>
                    <select
                      id="priority"
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value as "Low" | "Medium" | "High" | "Critical"})}
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="Medium">Sedang</option>
                      <option value="Low">Rendah</option>
                      <option value="High">Tinggi</option>
                      <option value="Critical">Kritis</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="budget">Anggaran (IDR)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="actualCost">Biaya Aktual (IDR)</Label>
                    <Input
                      id="actualCost"
                      type="number"
                      value={formData.actualCost}
                      onChange={(e) => setFormData({...formData, actualCost: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="requirements">Kebutuhan (pisahkan dengan koma)</Label>
                  <Input
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                    placeholder="Sound System, Proyektor, Penyegaran"
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
                    placeholder="Catatan tambahan tentang acara"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingEvent ? "Perbarui" : "Buat"} Acara
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
                <TableHead>Nama Acara</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Tanggal & Waktu</TableHead>
                <TableHead>Peserta</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prioritas</TableHead>
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
              ) : events.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    Belum ada data acara
                  </TableCell>
                </TableRow>
              ) : (
                events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{event.eventName}</div>
                      <div className="text-xs text-gray-500">{event.location}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getTypeColor(event.eventType)}>
                      {event.eventType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{formatDate(event.startDate)}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {event.startTime} - {event.endTime}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {event.currentParticipants}/{event.maxParticipants}
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                        <div
                          className="bg-blue-600 h-1 rounded-full"
                          style={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(event.status)}>
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityColor(event.priority)}>
                      {event.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(event)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => event.id && handleDelete(event.id)}>
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

export default EventsCalendar;

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Edit, Trash2, Eye, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: string;
  documentName: string;
  documentType: "Legal" | "Financial" | "Academic" | "Administrative" | "Policy" | "Report";
  category: "Waqf Documents" | "Financial Reports" | "Academic Records" | "Legal Contracts" | "Policies" | "Certificates";
  description: string;
  uploadDate: string;
  lastModified: string;
  fileSize: string;
  fileFormat: "PDF" | "DOC" | "DOCX" | "XLS" | "XLSX" | "JPG" | "PNG" | "Other";
  uploadedBy: string;
  status: "Active" | "Archived" | "Under Review" | "Expired";
  accessLevel: "Public" | "Internal" | "Confidential" | "Restricted";
  tags: string[];
  version: string;
  notes: string;
}

const DocumentManagement = () => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      documentName: "Waqf Land Certificate - Main Campus",
      documentType: "Legal",
      category: "Waqf Documents",
      description: "Official land certificate for the main campus waqf property",
      uploadDate: "2024-01-15",
      lastModified: "2024-01-15",
      fileSize: "2.5 MB",
      fileFormat: "PDF",
      uploadedBy: "Ahmad Suharto",
      status: "Active",
      accessLevel: "Confidential",
      tags: ["waqf", "legal", "property", "certificate"],
      version: "1.0",
      notes: "Original certificate from BPN (National Land Agency)"
    },
    {
      id: "2",
      documentName: "Monthly Financial Report - December 2023",
      documentType: "Financial",
      category: "Financial Reports",
      description: "Comprehensive financial report for December 2023",
      uploadDate: "2024-01-05",
      lastModified: "2024-01-10",
      fileSize: "1.8 MB",
      fileFormat: "PDF",
      uploadedBy: "Siti Aminah",
      status: "Active",
      accessLevel: "Internal",
      tags: ["financial", "report", "monthly", "december"],
      version: "2.0",
      notes: "Revised version with additional expense breakdown"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [formData, setFormData] = useState<{
    documentName: string;
    documentType: "Legal" | "Financial" | "Academic" | "Administrative" | "Policy" | "Report";
    category: "Waqf Documents" | "Financial Reports" | "Academic Records" | "Legal Contracts" | "Policies" | "Certificates";
    description: string;
    uploadDate: string;
    lastModified: string;
    fileSize: string;
    fileFormat: "PDF" | "DOC" | "DOCX" | "XLS" | "XLSX" | "JPG" | "PNG" | "Other";
    uploadedBy: string;
    status: "Active" | "Archived" | "Under Review" | "Expired";
    accessLevel: "Public" | "Internal" | "Confidential" | "Restricted";
    tags: string;
    version: string;
    notes: string;
  }>({
    documentName: "",
    documentType: "Administrative",
    category: "Policies",
    description: "",
    uploadDate: "",
    lastModified: "",
    fileSize: "",
    fileFormat: "PDF",
    uploadedBy: "",
    status: "Active",
    accessLevel: "Internal",
    tags: "",
    version: "1.0",
    notes: ""
  });

  const resetForm = () => {
    setFormData({
      documentName: "",
      documentType: "Administrative",
      category: "Policies",
      description: "",
      uploadDate: "",
      lastModified: "",
      fileSize: "",
      fileFormat: "PDF",
      uploadedBy: "",
      status: "Active",
      accessLevel: "Internal",
      tags: "",
      version: "1.0",
      notes: ""
    });
    setEditingDocument(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);
    
    if (editingDocument) {
      setDocuments(documents.map(document => 
        document.id === editingDocument.id 
          ? { 
              ...document, 
              ...formData, 
              tags: tagsArray,
              lastModified: new Date().toISOString().split('T')[0]
            }
          : document
      ));
      toast({ title: "Dokumen berhasil diperbarui" });
    } else {
      const newDocument: Document = {
        id: Date.now().toString(),
        ...formData,
        tags: tagsArray,
        lastModified: formData.uploadDate
      };
      setDocuments([...documents, newDocument]);
      toast({ title: "Dokumen berhasil ditambahkan" });
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (document: Document) => {
    setEditingDocument(document);
    setFormData({
      documentName: document.documentName,
      documentType: document.documentType,
      category: document.category,
      description: document.description,
      uploadDate: document.uploadDate,
      lastModified: document.lastModified,
      fileSize: document.fileSize,
      fileFormat: document.fileFormat,
      uploadedBy: document.uploadedBy,
      status: document.status,
      accessLevel: document.accessLevel,
      tags: document.tags.join(', '),
      version: document.version,
      notes: document.notes
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(document => document.id !== id));
    toast({ title: "Dokumen berhasil dihapus" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "Archived": return "secondary";
      case "Under Review": return "outline";
      case "Expired": return "destructive";
      default: return "outline";
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case "Public": return "secondary";
      case "Internal": return "default";
      case "Confidential": return "destructive";
      case "Restricted": return "outline";
      default: return "outline";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Legal": return "destructive";
      case "Financial": return "default";
      case "Academic": return "secondary";
      case "Administrative": return "outline";
      case "Policy": return "default";
      case "Report": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Manajemen Dokumen</h1>
        <p className="text-indigo-100">Atur dan kelola dokumen institusi, sertifikat, dan catatan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-indigo-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Dokumen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
            <p className="text-xs text-indigo-600">File dikelola</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Dokumen Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documents.filter(d => d.status === "Active").length}
            </div>
            <p className="text-xs text-green-600">Sedang aktif</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Rahasia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documents.filter(d => d.accessLevel === "Confidential").length}
            </div>
            <p className="text-xs text-red-600">Akses terbatas</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Dalam Tinjauan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documents.filter(d => d.status === "Under Review").length}
            </div>
            <p className="text-xs text-purple-600">Menunggu tinjauan</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Perpustakaan Dokumen
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Dokumen
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingDocument ? "Edit Dokumen" : "Tambah Dokumen Baru"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="documentName">Nama Dokumen</Label>
                  <Input
                    id="documentName"
                    value={formData.documentName}
                    onChange={(e) => setFormData({...formData, documentName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="documentType">Jenis Dokumen</Label>
                  <select
                    id="documentType"
                    value={formData.documentType}
                    onChange={(e) => setFormData({...formData, documentType: e.target.value as "Legal" | "Financial" | "Academic" | "Administrative" | "Policy" | "Report"})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="Administrative">Administratif</option>
                    <option value="Legal">Hukum</option>
                    <option value="Financial">Keuangan</option>
                    <option value="Academic">Akademik</option>
                    <option value="Policy">Kebijakan</option>
                    <option value="Report">Laporan</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="category">Kategori</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as "Waqf Documents" | "Financial Reports" | "Academic Records" | "Legal Contracts" | "Policies" | "Certificates"})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="Policies">Kebijakan</option>
                    <option value="Waqf Documents">Dokumen Wakaf</option>
                    <option value="Financial Reports">Laporan Keuangan</option>
                    <option value="Academic Records">Catatan Akademik</option>
                    <option value="Legal Contracts">Kontrak Hukum</option>
                    <option value="Certificates">Sertifikat</option>
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
                    placeholder="Deskripsi singkat dokumen"
                  />
                </div>
                <div>
                  <Label htmlFor="uploadDate">Tanggal Upload</Label>
                  <Input
                    id="uploadDate"
                    type="date"
                    value={formData.uploadDate}
                    onChange={(e) => setFormData({...formData, uploadDate: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="fileSize">Ukuran File</Label>
                  <Input
                    id="fileSize"
                    value={formData.fileSize}
                    onChange={(e) => setFormData({...formData, fileSize: e.target.value})}
                    placeholder="e.g., 2.5 MB"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="fileFormat">Format File</Label>
                  <select
                    id="fileFormat"
                    value={formData.fileFormat}
                    onChange={(e) => setFormData({...formData, fileFormat: e.target.value as "PDF" | "DOC" | "DOCX" | "XLS" | "XLSX" | "JPG" | "PNG" | "Other"})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="PDF">PDF</option>
                    <option value="DOC">DOC</option>
                    <option value="DOCX">DOCX</option>
                    <option value="XLS">XLS</option>
                    <option value="XLSX">XLSX</option>
                    <option value="JPG">JPG</option>
                    <option value="PNG">PNG</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="uploadedBy">Diupload Oleh</Label>
                  <Input
                    id="uploadedBy"
                    value={formData.uploadedBy}
                    onChange={(e) => setFormData({...formData, uploadedBy: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as "Active" | "Archived" | "Under Review" | "Expired"})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="Active">Aktif</option>
                    <option value="Under Review">Dalam Tinjauan</option>
                    <option value="Archived">Diarsipkan</option>
                    <option value="Expired">Kedaluwarsa</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="accessLevel">Tingkat Akses</Label>
                  <select
                    id="accessLevel"
                    value={formData.accessLevel}
                    onChange={(e) => setFormData({...formData, accessLevel: e.target.value as "Public" | "Internal" | "Confidential" | "Restricted"})}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="Internal">Internal</option>
                    <option value="Public">Publik</option>
                    <option value="Confidential">Rahasia</option>
                    <option value="Restricted">Terbatas</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="version">Versi</Label>
                  <Input
                    id="version"
                    value={formData.version}
                    onChange={(e) => setFormData({...formData, version: e.target.value})}
                    placeholder="e.g., 1.0, 2.1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tag (pisahkan dengan koma)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    placeholder="waqf, legal, certificate, property"
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
                    placeholder="Catatan tambahan tentang dokumen"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingDocument ? "Perbarui" : "Tambah"} Dokumen
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
                <TableHead>Nama Dokumen</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Ukuran</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Akses</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((document) => (
                <TableRow key={document.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{document.documentName}</div>
                      <div className="text-xs text-gray-500">v{document.version} • {document.fileFormat}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getTypeColor(document.documentType)}>
                      {document.documentType}
                    </Badge>
                  </TableCell>
                  <TableCell>{document.category}</TableCell>
                  <TableCell>{document.fileSize}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(document.status)}>
                      {document.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getAccessLevelColor(document.accessLevel)}>
                      {document.accessLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(document)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(document.id)}>
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

export default DocumentManagement;

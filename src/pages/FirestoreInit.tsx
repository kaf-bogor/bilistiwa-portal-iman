import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Database, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { initializeFirestore, checkFirestoreCollections } from "@/lib/initializeFirestore";
import { useToast } from "@/hooks/use-toast";

const FirestoreInit = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [checkResults, setCheckResults] = useState<string[]>([]);

  const handleInitialize = async () => {
    setLoading(true);
    setResults([]);

    try {
      const initResults = await initializeFirestore();
      setResults(initResults);

      const successCount = initResults.filter(r => r.status === 'success').length;
      const skippedCount = initResults.filter(r => r.status === 'skipped').length;

      toast({
        title: "Inisialisasi Selesai",
        description: `${successCount} koleksi dibuat, ${skippedCount} koleksi sudah ada`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal menginisialisasi Firestore",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = async () => {
    setChecking(true);
    setCheckResults([]);

    try {
      // Capture console.log output
      const logs: string[] = [];
      const originalLog = console.log;
      console.log = (...args) => {
        logs.push(args.join(' '));
        originalLog(...args);
      };

      await checkFirestoreCollections();

      console.log = originalLog;
      setCheckResults(logs);

      toast({
        title: "Pengecekan Selesai",
        description: "Lihat hasil di bawah",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Gagal memeriksa koleksi",
        variant: "destructive"
      });
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Inisialisasi Firestore</h1>
        <p className="text-blue-100">Buat koleksi dan data awal untuk Firebase Firestore</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Perhatian</AlertTitle>
        <AlertDescription>
          Halaman ini digunakan untuk menginisialisasi koleksi Firebase Firestore dengan data sampel.
          Proses ini hanya perlu dilakukan sekali saat pertama kali setup aplikasi.
          Jika koleksi sudah ada, data tidak akan ditimpa.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Inisialisasi Database
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Klik tombol di bawah untuk membuat koleksi berikut dengan data sampel:
            </p>
            <ul className="text-sm space-y-1 list-disc list-inside text-gray-700">
              <li>menuItems (Menu Sidebar)</li>
              <li>waqfAssets (Aset Wakaf)</li>
              <li>scholarships (Beasiswa)</li>
              <li>taawunDonations (Donasi Ta'awun)</li>
              <li>productiveWaqf (Wakaf Produktif)</li>
              <li>teacherWelfare (Kesejahteraan Guru)</li>
              <li>documents (Dokumen)</li>
              <li>events (Acara & Kalender)</li>
              <li>users (Pengguna)</li>
            </ul>
            <Button
              onClick={handleInitialize}
              disabled={loading}
              className="w-full"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Menginisialisasi..." : "Inisialisasi Sekarang"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Cek Status Koleksi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Periksa status koleksi yang ada di Firestore dan jumlah dokumen di setiap koleksi.
            </p>
            <Button
              onClick={handleCheck}
              disabled={checking}
              variant="outline"
              className="w-full"
            >
              {checking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {checking ? "Memeriksa..." : "Periksa Koleksi"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Hasil Inisialisasi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    result.status === 'success'
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {result.status === 'success' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-gray-600" />
                    )}
                    <span className="font-medium">{result.collection}</span>
                  </div>
                  <div className="text-sm">
                    {result.status === 'success' ? (
                      <span className="text-green-700">
                        Dibuat ({result.count} dokumen)
                      </span>
                    ) : (
                      <span className="text-gray-700">
                        Sudah ada ({result.count} dokumen)
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {checkResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Status Koleksi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm space-y-1">
              {checkResults.map((log, index) => (
                <div key={index}>{log}</div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Panduan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-700">
          <div>
            <strong>1. Pertama kali setup:</strong>
            <p>Klik "Inisialisasi Sekarang" untuk membuat semua koleksi dengan data sampel.</p>
          </div>
          <div>
            <strong>2. Cek status:</strong>
            <p>Gunakan "Periksa Koleksi" untuk melihat koleksi mana yang sudah ada dan jumlah dokumentnya.</p>
          </div>
          <div>
            <strong>3. Data tidak akan ditimpa:</strong>
            <p>Jika koleksi sudah memiliki data, proses inisialisasi akan melewatinya (skip).</p>
          </div>
          <div>
            <strong>4. Setelah inisialisasi:</strong>
            <p>Anda dapat mengelola data melalui halaman-halaman yang tersedia di sidebar.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FirestoreInit;

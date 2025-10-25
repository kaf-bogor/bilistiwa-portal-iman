import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogIn, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      toast.success('Login berhasil! Selamat datang kembali.');
      navigate('/admin');
    } catch (err: any) {
      console.error('Login error:', err);
      let errorMessage = 'Terjadi kesalahan saat login. Silakan coba lagi.';

      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        errorMessage = 'Email atau password salah. Silakan coba lagi.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Format email tidak valid.';
      } else if (err.code === 'auth/user-disabled') {
        errorMessage = 'Akun ini telah dinonaktifkan. Hubungi administrator.';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Terlalu banyak percobaan login. Silakan coba lagi nanti.';
      } else if (err.code === 'auth/invalid-credential') {
        errorMessage = 'Email atau password salah. Silakan coba lagi.';
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 p-4">
      <div className="w-full max-w-md">
        {/* Header with Islamic Greeting */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="text-3xl font-bold text-green-700 mb-2">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <p className="text-sm text-gray-600">Bismillahirrahmanirrahim</p>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Portal Admin</h1>
          <p className="text-gray-600">Bilistiwa Bogor - Kuttab Al Fatih</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg border-t-4 border-t-green-600">
          <CardHeader>
            <CardTitle className="text-xl text-center">Masuk ke Dashboard</CardTitle>
            <CardDescription className="text-center">
              Masukkan email dan password untuk mengakses portal admin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Masuk
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Lupa password?{' '}
                <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                  Hubungi Administrator
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            اللَّهُمَّ بَارِكْ لَنَا
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Semoga Allah memberkahi usaha kita
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

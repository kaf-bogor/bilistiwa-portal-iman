import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Heart,
  GraduationCap,
  Building2,
  Users,
  Store,
  BookOpen,
  HandHeart,
  Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const programs = [
    {
      title: 'Donasi Ta\'awun',
      description: 'Program donasi untuk mendukung operasional dan pengembangan lembaga pendidikan Islam.',
      icon: Heart,
      color: 'bg-green-100 text-green-700',
    },
    {
      title: 'Beasiswa Pendidikan',
      description: 'Memberikan kesempatan pendidikan berkualitas bagi siswa yang membutuhkan.',
      icon: GraduationCap,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      title: 'Wakaf Produktif',
      description: 'Mengelola aset wakaf untuk menghasilkan manfaat berkelanjutan bagi umat.',
      icon: Store,
      color: 'bg-purple-100 text-purple-700',
    },
    {
      title: 'Aset Wakaf',
      description: 'Transparansi pengelolaan dan dokumentasi aset wakaf lembaga.',
      icon: Building2,
      color: 'bg-amber-100 text-amber-700',
    },
    {
      title: 'Kesejahteraan Guru',
      description: 'Program dukungan kesejahteraan untuk para pendidik dan tenaga kependidikan.',
      icon: Users,
      color: 'bg-rose-100 text-rose-700',
    },
    {
      title: 'Manajemen Dokumen',
      description: 'Sistem dokumentasi dan arsip digital untuk transparansi pengelolaan.',
      icon: BookOpen,
      color: 'bg-indigo-100 text-indigo-700',
    },
  ];

  const values = [
    {
      title: 'Amanah',
      description: 'Menjaga kepercayaan dalam pengelolaan dana dan program',
      icon: HandHeart,
    },
    {
      title: 'Transparansi',
      description: 'Keterbukaan informasi dalam setiap aktivitas organisasi',
      icon: BookOpen,
    },
    {
      title: 'Profesional',
      description: 'Mengelola program dengan standar terbaik dan akuntabel',
      icon: Award,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-green-700">Bilistiwa Bogor</h1>
              <span className="ml-2 text-sm text-gray-600">Kuttab Al Fatih</span>
            </div>
            <Button
              onClick={() => navigate('/login')}
              variant="outline"
              className="border-green-600 text-green-700 hover:bg-green-50"
            >
              Login Admin
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-4">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Bilistiwa Bogor
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-green-100">
              Portal Internal Kuttab Al Fatih
            </p>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-green-50 mb-8">
              Mengelola program pendidikan, donasi, dan wakaf dengan amanah untuk masa depan pendidikan Islam yang lebih baik
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/login')}
                className="bg-white text-green-700 hover:bg-green-50 font-semibold"
              >
                Portal Admin
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Program Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Berbagai program untuk mendukung pendidikan Islam dan kesejahteraan umat
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-t-4 border-t-green-500">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${program.color} flex items-center justify-center mb-4`}>
                  <program.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{program.title}</CardTitle>
                <CardDescription className="text-base">
                  {program.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Nilai-Nilai Kami
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Prinsip yang menjadi landasan dalam setiap kegiatan kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-green-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Mari Berkontribusi untuk Pendidikan Islam
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Bersama kita membangun masa depan pendidikan Islam yang lebih baik
          </p>
          <div className="text-2xl font-arabic mb-2">
            اللَّهُمَّ بَارِكْ لَنَا
          </div>
          <p className="text-green-100">
            Semoga Allah memberkahi usaha kita
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 Bilistiwa Bogor - Kuttab Al Fatih. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">404</h1>
        <p className="mb-4 text-xl text-gray-600">Oops! Halaman tidak ditemukan</p>
        <Link 
          href="/" 
          className="text-red-800 underline hover:text-red-900"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
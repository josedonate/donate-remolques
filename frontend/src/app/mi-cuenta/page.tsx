'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function MiCuentaPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Mi cuenta</h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-gray-500">Nombre</h2>
          <p className="text-lg text-gray-800">{user.firstName}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-500">Apellidos</h2>
          <p className="text-lg text-gray-800">{user.lastName}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-500">Email</h2>
          <p className="text-lg text-gray-800">{user.email}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-500">Roles</h2>
          <p className="text-lg text-gray-800">{user.roles.join(', ')}</p>
        </div>
        <button
          onClick={logout}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

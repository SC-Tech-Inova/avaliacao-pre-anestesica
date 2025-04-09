import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { getPatients, Patient } from '../api/patients';
import { useRouter } from 'next/router';

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    // Redireciona para login se o token não for encontrado
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchPatients = async () => {
      try {
        setLoading(true);
        const data = await getPatients();

        // Filtra pacientes que possuem avaliações associadas
        const evaluatedPatients = Array.isArray(data)
          ? data.filter((patient: Patient) => patient.evaluation_status !== undefined)
          : [];

        setPatients(evaluatedPatients);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar pacientes.');
        console.error('Erro ao buscar pacientes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Limpa informações do usuário
    router.push('/login'); // Redireciona para a página de login
  };

  const handleNewEvaluation = () => {
    router.push('/preAnestheticEvaluation'); // Navega para criar nova avaliação
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Pacientes com Avaliação Pré-Anestésica</h1>
        <div className="space-x-2">
          <Button
            onClick={handleNewEvaluation}
            className="bg-blue-500 text-white text-sm px-3 py-2 rounded hover:bg-blue-600"
          >
            Nova Avaliação
          </Button>
          <Button
            onClick={handleLogout}
            className="bg-gray-500 text-white text-sm px-3 py-2 rounded hover:bg-gray-600"
          >
            Sair
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Pacientes Avaliados</CardTitle>
        </CardHeader>
        <CardContent>
          {patients.length === 0 ? (
            <p className="text-center text-gray-500">Nenhum paciente com avaliação encontrada.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Paciente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Idade / Sexo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Prontuário
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Cirurgia
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {patients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {patient.age} anos / {patient.gender}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{patient.medical_record}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{patient.surgery_type || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                            patient.evaluation_status === 'PENDING'
                              ? 'bg-yellow-500 text-white'
                              : patient.evaluation_status === 'APPROVED'
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                          }`}
                        >
                          {patient.evaluation_status === 'PENDING'
                            ? 'Pendente'
                            : patient.evaluation_status === 'APPROVED'
                            ? 'Apto'
                            : 'Não Apto'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          onClick={() => router.push(`/evaluation/${patient.id}`)}
                          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded"
                        >
                          Ver Avaliação
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientList;
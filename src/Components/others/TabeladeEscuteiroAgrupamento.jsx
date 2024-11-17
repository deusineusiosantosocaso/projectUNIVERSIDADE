import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ScoutsTable = () => {
  const scoutsData = [
    { id: 1, nome: 'João Silva', foto: '/api/placeholder/100/100', categoria: 'Lobito', idade: 8 },
    { id: 2, nome: 'Maria Santos', foto: '/api/placeholder/100/100', categoria: 'Explorador', idade: 12 },
    { id: 3, nome: 'Pedro Costa', foto: '/api/placeholder/100/100', categoria: 'Pioneiro', idade: 16 },
    { id: 4, nome: 'Ana Ferreira', foto: '/api/placeholder/100/100', categoria: 'Lobito', idade: 9 },
    { id: 5, nome: 'Miguel Oliveira', foto: '/api/placeholder/100/100', categoria: 'Explorador', idade: 13 },
    { id: 6, nome: 'Sofia Martins', foto: '/api/placeholder/100/100', categoria: 'Pioneiro', idade: 17 },
    { id: 7, nome: 'Tiago Rodrigues', foto: '/api/placeholder/100/100', categoria: 'Lobito', idade: 7 },
    { id: 8, nome: 'Beatriz Lima', foto: '/api/placeholder/100/100', categoria: 'Explorador', idade: 14 },
    { id: 9, nome: 'Lucas Pereira', foto: '/api/placeholder/100/100', categoria: 'Pioneiro', idade: 15 },
    { id: 10, nome: 'Carolina Sousa', foto: '/api/placeholder/100/100', categoria: 'Lobito', idade: 8 },
    { id: 11, nome: 'Daniel Alves', foto: '/api/placeholder/100/100', categoria: 'Explorador', idade: 13 },
    { id: 12, nome: 'Mariana Costa', foto: '/api/placeholder/100/100', categoria: 'Pioneiro', idade: 16 }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(scoutsData.length / itemsPerPage);

  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return scoutsData.slice(startIndex, endIndex);
  };

  return (
    <div className="w-full p-6 bg-white mt-10 rounded-lg shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">
                Foto
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">
                Nome
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">
                Categoria
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">
                Idade
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {getCurrentItems().map((scout) => (
              <tr 
                key={scout.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <img 
                    src={scout.foto} 
                    alt={scout.nome}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {scout.nome}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${scout.categoria === 'Lobito' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${scout.categoria === 'Explorador' ? 'bg-green-100 text-green-800' : ''}
                    ${scout.categoria === 'Pioneiro' ? 'bg-blue-100 text-blue-800' : ''}
                  `}>
                    {scout.categoria}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {scout.idade} anos
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6 border-t pt-4">
        <span className="text-sm text-gray-700">
          Mostrando <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span> a{' '}
          <span className="font-medium">
            {Math.min(currentPage * itemsPerPage, scoutsData.length)}
          </span> de{' '}
          <span className="font-medium">{scoutsData.length}</span> escuteiros
        </span>

        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
              ${currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }
            `}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Anterior
          </button>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
              ${currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }
            `}
          >
            Próximo
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoutsTable;
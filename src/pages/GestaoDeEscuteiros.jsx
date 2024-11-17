import React, { useState } from 'react';
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Filter,
    Download,
    MoreVertical,
    Phone,
    Mail,
    EyeIcon
} from 'lucide-react';
import Cards from '../Components/cards/Cards';
import { useCategories, useGroupings, useScout } from '../hooks/useScoutData';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from 'primereact/skeleton';

const ScoutsManagement = () => {
    const navigate = useNavigate();
    const { scout, loading: loadingScout } = useScout();
    const { categories, loading: loadingCategories } = useCategories();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Helper function to get category name by ID
    const getCategoryName = (categoryId) => {
        const foundCategory = categories?.find(cat => cat.id === categoryId);
        return foundCategory ? foundCategory.name : 'N/A';
    };

    // Filtragem dos dados
    const filteredData = scout?.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || item.categoryId === selectedCategory;
        return matchesSearch && matchesCategory;
    }) || [];

    // Paginação
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const getCurrentItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredData.slice(startIndex, endIndex);
    };

    const handleViewScout = (scoutId) => {
        navigate(`/escuteiro/visualizar/${scoutId}`);
    };

    if (loadingCategories || loadingScout || !categories || !scout) {
        return (
            <div className="card">
                <div className="flex flex-column gap-3">
                    <Skeleton height="2rem" className="mb-2" />
                    <Skeleton height="12rem" />
                    <Skeleton height="8rem" />
                    <Skeleton height="8rem" />
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Cards
                    nome="Escuteiros Ativos"
                    numero={scout?.length || 0}
                    porcent={10}
                    icon="pi pi-users"
                    cor="#4CAF50"
                    corIcon="#FFFFFF"
                />
                <Cards
                    nome="Escuteros Inativos"
                    numero={200}
                    porcent={5}
                    icon="pi pi-user-minus"
                    cor="#FF9800"
                    corIcon="#FFFFFF"
                />
                <Cards
                    nome="Atividades"
                    numero={45}
                    porcent={2}
                    icon="pi pi-calendar"
                    cor="#2196F3"
                    corIcon="#FFFFFF"
                />
                <Cards
                    nome="Dirigentes"
                    numero={120}
                    porcent={3}
                    icon="pi pi-users"
                    cor="#9C27B0"
                    corIcon="#FFFFFF"
                />
            </div>

            <div className="w-full bg-white mt-10 rounded-lg p-6 space-y-6">
                {/* Header com título e botão de adicionar */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Gestão de Escuteiros</h1>
                    <a href="/escuteiro/adicionar">
                        <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                            <Plus className="w-5 h-5 mr-2" />
                            Novo Escuteiro
                        </button>
                    </a>
                </div>

                {/* Barra de ferramentas */}
                <div className="flex flex-wrap gap-4 bg-white p-4 rounded-lg shadow">
                    {/* Busca */}
                    <div className="flex-1 min-w-[280px]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Buscar por nome..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Filtro de categoria */}
                    <div className="relative min-w-[200px]">
                        <select
                            className="w-full py-2 pl-4 pr-10 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">Todas as categorias</option>
                            {categories?.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>

                    {/* Botão de exportar */}
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                        <Download className="w-5 h-5 mr-2" />
                        Exportar
                    </button>
                </div>

                {/* Tabela */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                        Escuteiro
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                        Contato
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                        Categoria
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                        Informações
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                        Ações
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {getCurrentItems().map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img
                                                    src={item.photographyFile || '/placeholder-avatar.png'}
                                                    alt={item.name}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                    <div className="text-sm text-gray-500">BI: {item.bi}</div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col space-y-1">
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Phone className="w-4 h-4 mr-2" />
                                                    {item.phone}
                                                </div>
                                                {item.optionalPhone && (
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <Phone className="w-4 h-4 mr-2" />
                                                        {item.optionalPhone}
                                                    </div>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {getCategoryName(item.categoryId)}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                Município: {item.municipality}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Paróquia: {item.parish}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Nasc.: {new Date(item.dateOfBirth).toLocaleDateString()}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex items-center justify-center space-x-2">
                                                <button
                                                    onClick={() => handleViewScout(item.id)}
                                                    className="p-1 hover:bg-gray-100 rounded-full"
                                                    title="Visualizar"
                                                >
                                                    <EyeIcon className="w-5 h-5 text-gray-600" />
                                                </button>
                                                <button className="p-1 hover:bg-gray-100 rounded-full" title="Editar">
                                                    <Pencil className="w-5 h-5 text-gray-600" />
                                                </button>
                                                <button className="p-1 hover:bg-gray-100 rounded-full" title="Remover">
                                                    <Trash2 className="w-5 h-5 text-red-600" />
                                                </button>
                                                <button className="p-1 hover:bg-gray-100 rounded-full" title="Mais opções">
                                                    <MoreVertical className="w-5 h-5 text-gray-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Paginação */}
                    <div className="bg-white px-6 py-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Mostrando{' '}
                                <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span>
                                {' '}a{' '}
                                <span className="font-medium">
                                    {Math.min(currentPage * itemsPerPage, filteredData.length)}
                                </span>
                                {' '}de{' '}
                                <span className="font-medium">{filteredData.length}</span>
                                {' '}resultados
                            </div>

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
                </div>
            </div>
        </div>
    );
};

export default ScoutsManagement;
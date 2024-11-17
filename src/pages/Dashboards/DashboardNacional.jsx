import React from 'react';

const DashboardNacional = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Nacional</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Total de Agrupamentos</h2>
          <p className="text-3xl font-bold text-primary">150</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Total de Escuteiros</h2>
          <p className="text-3xl font-bold text-primary">15,000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Eventos Ativos</h2>
          <p className="text-3xl font-bold text-primary">25</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardNacional;
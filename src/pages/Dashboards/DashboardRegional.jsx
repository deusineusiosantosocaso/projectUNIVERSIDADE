import React from 'react';

const DashboardRegional = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Regional</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Agrupamentos na Região</h2>
          <p className="text-3xl font-bold text-primary">45</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Escuteiros Ativos</h2>
          <p className="text-3xl font-bold text-primary">5,000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Atividades Regionais</h2>
          <p className="text-3xl font-bold text-primary">12</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardRegional;
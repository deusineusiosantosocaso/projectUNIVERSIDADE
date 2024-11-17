import React from 'react';
import Cards from '../../Components/cards/Cards';
import ScoutsTable from '../../Components/others/TabeladeEscuteiroAgrupamento';

const DashboardAgrupamento = () => {
  return (
    <div className="p-6">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Exemplo de cards com informações relevantes para a AEA */}
        <Cards
          nome="Escuteiros Ativos"
          numero={3500}
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


      <div>
        <ScoutsTable />
      </div>
    </div>
  );
};

export default DashboardAgrupamento;
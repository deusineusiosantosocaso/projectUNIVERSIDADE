import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'primereact/card';
import 'primeicons/primeicons.css';

const Cards = ({ nome, numero = 0, porcent = 0, icon, cor, corIcon }) => {
  const percentNegative = () => porcent < 0;

  const formatPercentage = () => {
    const sign = porcent > 0 ? '+' : ''; // Adiciona o sinal de + apenas para números positivos
    return `${sign}${porcent}%`; // Exibe a porcentagem com o sinal adequado
  };

  return (
    <div className="cards w-full rounded-md p-4 border-solid border-2 bg-white border-[#f0f0f0] shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-normal">{nome}</h2>
        <div style={{ backgroundColor: cor }} className="w-[50px] h-[50px] rounded-md flex justify-center items-center">
          <i style={{ color: corIcon }} className={`pi text-xl ${icon}`}></i>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h2 className="number text-xl font-semibold">{numero}</h2>
          <div className="flex gap-1 items-center text-lg">
            <span
              className="text-base"
              style={{ color: percentNegative() ? 'red' : 'green' }}
            >
              {formatPercentage()}
              <i className={`pi text-xs ${percentNegative() ? 'pi-arrow-down-left text-[13px]' : 'pi-arrow-up-right text-[13px]'}`}></i>
            </span>
            <span className="text-gray-500 text-sm">Crescimento no último mês</span>
          </div>
        </div>
      </div>
    </div>
  );
};

Cards.propTypes = {
  nome: PropTypes.string,
  numero: PropTypes.number,
  porcent: PropTypes.number,
  icon: PropTypes.string,
  cor: PropTypes.string,
  corIcon: PropTypes.string
};

export default Cards;

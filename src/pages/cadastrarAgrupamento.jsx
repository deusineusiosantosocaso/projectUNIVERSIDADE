import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';

import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import axios from 'axios';
import CustomInput from '../Components/others/Inputs';
import api from '../services/api';
import { Card } from 'primereact/card';
import Cards from '../Components/cards/Cards';
import { Skeleton } from 'primereact/skeleton';

const API_URL = 'https://cgs3m2jh-7276.uks1.devtunnels.ms/api/Grouping';

const GroupingRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    parish: '',
    location: '',
    creed: '',
    phone: '',
    email: '',
    foundingDate: null,
    regionalAdministrationId: 'd2acc571-457b-4cf4-a034-2d4342715b9a'
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const toast = React.useRef(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      number: '',
      parish: '',
      location: '',
      creed: '',
      phone: '',
      email: '',
      foundingDate: null,
      regionalAdministrationId: ''
    });
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const requiredFields = ['name', 'number', 'parish', 'location', 'creed', 'phone', 'email', 'foundingDate', 'regionalAdministrationId'];
    const isValid = requiredFields.every(field => formData[field]);
  
    if (isValid) {
      setLoading(true);
      try {
        const formattedData = {
          ...formData,
          foundingDate: formData.foundingDate instanceof Date 
            ? formData.foundingDate.toISOString().split('T')[0]
            : formData.foundingDate
        };

        console.log(formattedData)

        const response = await api.post('/Grouping', formattedData);
       
        toast.current.show({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Agrupamento cadastrado com sucesso!',
          life: 3000
        });
        
        resetForm();
      } catch (error) {
        console.error('Erro ao cadastrar agrupamento:', error);
        
        let errorMessage = 'Erro ao cadastrar agrupamento.';
        if (error.response) {
          errorMessage = error.response.data?.message || errorMessage;
        }
        
        toast.current.show({
          severity: 'error',
          summary: 'Erro',
          detail: errorMessage,
          life: 5000
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast.current.show({
        severity: 'error',
        summary: 'Erro',
        detail: 'Por favor, preencha todos os campos obrigatórios.',
        life: 3000
      });
    }
  };

  return (
    <div className="card p-6">
      <Toast ref={toast} />

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
    
      <Card className="mb-4 mt-10">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">Cadastrar Agrupamento</h1>
            <p className="text-gray-600">Preencha todos os campos obrigatórios (*)</p>
          </div>
     
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="col-12 md:col-8">
              <CustomInput
                label="Nome do Agrupamento"
                value={formData.name}
                onChange={(value) => handleInputChange('name', value)}
                required
                icon="pi pi-users"
                className={classNames({ 'p-invalid': submitted && !formData.name })}
                disabled={loading}
              />
            </div>

            <div className="col-12 md:col-4">
              <CustomInput
                label="Número"
                value={formData.number}
                onChange={(value) => handleInputChange('number', value)}
                required
                icon="pi pi-hashtag"
                className={classNames({ 'p-invalid': submitted && !formData.number })}
                disabled={loading}
              />
            </div>

            <div className="col-12 md:col-6">
              <CustomInput
                label="Paróquia"
                value={formData.parish}
                onChange={(value) => handleInputChange('parish', value)}
                required
                icon="pi pi-home"
                className={classNames({ 'p-invalid': submitted && !formData.parish })}
                disabled={loading}
              />
            </div>

            <div className="col-12 md:col-6">
              <CustomInput
                label="Localização"
                value={formData.location}
                onChange={(value) => handleInputChange('location', value)}
                required
                icon="pi pi-map-marker"
                className={classNames({ 'p-invalid': submitted && !formData.location })}
                disabled={loading}
              />
            </div>

            <div className="col-12 md:col-6">
              <CustomInput
                label="Credo"
                value={formData.creed}
                onChange={(value) => handleInputChange('creed', value)}
                required
                icon="pi pi-heart"
                className={classNames({ 'p-invalid': submitted && !formData.creed })}
                disabled={loading}
              />
            </div>

            <div className="col-12 md:col-6">
              <CustomInput
                type="phone"
                label="Telefone"
                value={formData.phone}
                onChange={(value) => handleInputChange('phone', value)}
                required
                icon="pi pi-phone"
                className={classNames({ 'p-invalid': submitted && !formData.phone })}
                disabled={loading}
              />
            </div>

            <div className="col-12 md:col-6">
              <CustomInput
                type="email"
                label="Email"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                required
                icon="pi pi-envelope"
                className={classNames({ 'p-invalid': submitted && !formData.email })}
                disabled={loading}
              />
            </div>

            <div className="col-12 md:col-6">
              <CustomInput
                type="date"
                label="Data de Fundação"
                value={formData.foundingDate}
                onChange={(value) => handleInputChange('foundingDate', value)}
                required
                icon="pi pi-calendar"
                className={classNames({ 'p-invalid': submitted && !formData.foundingDate })}
                disabled={loading}
              />
            </div>

            <div className="col-12">
              <CustomInput
                label="ID da Administração Regional"
                value={formData.regionalAdministrationId}
                onChange={(value) => handleInputChange('regionalAdministrationId', value)}
                required
                icon="pi pi-building"
                className={classNames({ 'p-invalid': submitted && !formData.regionalAdministrationId })}
                disabled={loading}
              />
            </div>
            <br />

            <div className="col-12 flex gap-2 justify-content-end">
              {/* <Button
                label="Limpar"
                icon="pi pi-refresh"
                type="button"
                severity="secondary"
                onClick={resetForm}
                disabled={loading}
              /> */}
              
               <button
                label="Cadastrar"
                type="submit"
                severity="success"
                loading={loading}
                className=' w-[150px] h-[50px] bg-[#6a28a4] hover:bg-[#6a28a4c0] transition-all rounded text-[#fff]'
            >Cadastrar</button>
            </div>
          </div>
          
        </form>
        </Card>
    </div>
    
  );
};

export default GroupingRegistrationForm;
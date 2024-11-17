import React, { useRef, useState } from 'react';
import { Steps } from 'primereact/steps';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import api from '../services/api';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import CustomInput from '../Components/others/Inputs';
import Cards from '../Components/cards/Cards';
import { Toast } from 'primereact/toast';
import { 
  useGenders, 
  useCivilStatus, 
  useCategories, 
  useProvinces, 
  useGroupings, 
  useCourse
} from '../hooks/useScoutData';
import axios from 'axios';
import { Skeleton } from 'primereact/skeleton';



const InscreverEscuteiro = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading , setLoading] = useState(false);
  const [formData, setFormData] = useState({
    groupingId: '97dd70b1-fdbb-46ab-aa95-2908166f8a7f',
    name: '',
    parish: '',
    dateOfBirth: null,
    genderId: '',
    civilStatusId: '',
    bi: '',
    birthplace: 'NACIONAL',
    provinceId: '',
    categoryId: '',
    courses: [],
    region: '',
    municipality: '',
    neighborhood: '',
    phone: '',
    optionalPhone: '',
    educationalQualifications: [], // Removida a duplicação
    fatherName: '',
    motherName: '',
    fatherContact: '',
    motherContact: '',
    religion: '',
    sacraments: [],
    takeMedicine: '', // Inicializado como string
    haveAllergy: '', // Inicializado como string
    medicationRestriction: '', // Inicializado como string
    healthPlan: '', // Inicializado como string
    emergencyName: '',
    kinshipEmergency: '',
    emergencyContact: '',
    photographyFile: null,
    identityCardFile: null,
    othersDocumentFile: null
});

  const toast = useRef(null);
  const { genders, loading: loadingGenders } = useGenders();
  const { civilStatus, loading: loadingCivilStatus } = useCivilStatus();
  const { categories, loading: loadingCategories } = useCategories();
  const { provinces, loading: loadingProvinces } = useProvinces();
  const { groupings, loading: loadingGroupings } = useGroupings();
  const { course, loading: loadingCourses } = useCourse();


  const genderOptions = genders.map(gender => ({
    label: gender.name,
    value: gender.id
  }));

  const civilStatusOptions = civilStatus.map(status => ({
    label: status.name,
    value: status.id
  }));

  const categoryOptions = categories.map(category => ({
    label: category.name,
    value: category.id
  }));

  const coursesOptions = course.map(courses => ({
    label: courses.name,
    value: courses.id
  }));

  const provinceOptions = provinces.map(province => ({
    label: province.name,
    value: province.id
  }));

  const groupingOptions = groupings.map(grouping => ({
    label: grouping.name,
    value: grouping.id
  }));

  const steps = [
    {
      label: 'Identificação',
      icon: 'pi pi-user'
    },
    {
      label: 'Morada',
      icon: 'pi pi-home'
    },
    {
      label: 'Filiação',
      icon: 'pi pi-users'
    },
    {
      label: 'Religião',
      icon: 'pi pi-heart'
    },
    {
      label: 'Saúde',
      icon: 'pi pi-plus-circle'
    },
    {
      label: 'Emergência',
      icon: 'pi pi-phone'
    },
    {
      label: 'Anexos',
      icon: 'pi pi-file'
    }
  ];

  const calculateCategory = (birthDate) => {
    if (!birthDate) return '';

    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    if (age >= 22) return 'Dirigentes';
    if (age >= 18) return 'Caminheiros';
    if (age >= 14) return 'Seniors';
    if (age >= 11) return 'Junior';
    if (age >= 6) return 'Lobitos';
    return '';
  };

  if (!groupings || !provinces || !categories || !civilStatus || !genders ) {
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

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };

      // Se o campo alterado for data de nascimento, calcula a categoria
      if (field === 'dataNascimento') {
        const category = calculateCategory(value);
        newData.categoryId = category;
        // Limpa os cursos se não for dirigente
        if (category !== 'Dirigentes') {
          newData.cursos = [];
        }
      }

      return newData;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const formDataToSend = new FormData();
  
      const formattedData = {
        ...formData,
        dateOfBirth: formData.dateOfBirth instanceof Date
          ? formData.dateOfBirth.toISOString().split('T')[0]
          : formData.dateOfBirth
      };
  
      Object.keys(formattedData).forEach((key) => {
        if (formattedData[key] !== null && formattedData[key] !== undefined) {
          if (Array.isArray(formattedData[key])) {
            formDataToSend.append(key, JSON.stringify(formattedData[key]));
          } else {
            formDataToSend.append(key, formattedData[key]);
          }
        }
      });
      console.log(formattedData)
  
      const response = await api.post(`/Scout`, formattedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLoading(true)

      if (response.status === 200) {
        setLoading(false)
      }
  
      toast.current.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Escuteiro cadastrado com sucesso!',
      });
    } catch (error) {
      setLoading(false)
      console.error('Erro ao cadastrar escuteiro:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Erro',
        detail: 'Erro ao cadastrar escuteiro. Por favor, tente novamente.',
      });
    }
  };
  


  const handleFileUpload = (field, file) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const fileUploadStep = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CustomInput
        type="file"
        label="Fotografia"
        onChange={(file) => handleFileUpload('photographyFile', file)}
        accept="image/*"
      />
      <CustomInput
        type="file"
        label="Bilhete de Identidade"
        onChange={(file) => handleFileUpload('identityCardFile', file)}
        accept=".pdf,.jpg,.jpeg,.png"
      />
      <CustomInput
        type="file"
        label="Outros Documentos"
        onChange={(file) => handleFileUpload('othersDocumentFile', file)}
        accept=".pdf,.jpg,.jpeg,.png"
      />
    </div>
  );

  const renderStepContent = (index) => {
    const stepContents = {
      0: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <CustomInput
            type="text"
            label="Código de Agrupamento"
            disabled  
            onChange={(value) => handleInputChange('groupingId', value)}
            required
          />
          <CustomInput
            type="text"
            label="Nome Completo"
            value={formData.name}
            onChange={(value) => handleInputChange('name', value)}
            required
          />
          <CustomInput
            type="text"
            label="Paróquia"
            value={formData.parish}
            onChange={(value) => handleInputChange('parish', value)}
          />
          <CustomInput
            type="date"
            label="Data de Nascimento"
            value={formData.dateOfBirth}
            onChange={(value) => handleInputChange('dateOfBirth', value)}
            required
          />
          <CustomInput
            type="select"
            label="Sexo"
            value={formData.genderId}
            options={genderOptions}
            onChange={(value) => handleInputChange('genderId', value)}
            loading={loadingGenders}
            required
          />
           <CustomInput
            type="select"
            label="Estado Civil"
            value={formData.civilStatusId}
            options={civilStatusOptions}
            onChange={(value) => handleInputChange('civilStatusId', value)}
            loading={loadingCivilStatus}
          />
          <CustomInput
            type="text"
            label="Número do BI"
            value={formData.bi}
            onChange={(value) => handleInputChange('bi', value)}
          />
          <CustomInput
            type="select"
            label="Naturalidade"
            value={formData.birthplace}
            options={[
              { label: 'Nacional', value: 'NACIONAL' },
              { label: 'Estrangeiro', value: 'ESTRANGEIRO' }
            ]}
            onChange={(value) => handleInputChange('birthplace', value)}
          />
          <CustomInput
            type="select"
            label="Província"
            value={formData.provinceId}
            options={provinceOptions}
            onChange={(value) => handleInputChange('provinceId', value)}
            loading={loadingProvinces}
          />
           <CustomInput
            type="select"
            label="Categoria"
            value={formData.categoryId}
            options={categoryOptions}
            onChange={(value) => handleInputChange('categoryId', value)}
            loading={loadingCategories}
            required
          />
          {/* {formData.courses === 'Dirigente' && ( */}
            <CustomInput
              type="multiselect"
              label="Cursos"
              value={formData.courses}
              options={[
                { label: 'CAF', value: 'CAF' },
                { label: 'CAL', value: 'CAL' },
                { label: 'CAP I', value: 'CAP I' },
                { label: 'CAP II', value: 'CAP II' },
                { label: 'CAP III', value: 'CAP III' },
                { label: 'CAP IV', value: 'CAP IV' },
                { label: 'CAR', value: 'CAR' },
                { label: 'CDF', value: 'CDF' },
                { label: 'CI', value: 'CI' },
                { label: 'CIP', value: 'CIP' },
              ]}
              onChange={(value) => handleInputChange('courses', value)}
              loading={loadingCourses}
            />
          {/* )} */}
        </div>

      ),
      1: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <CustomInput
            type="text"
            label="Região"
            value={formData.region}
            onChange={(value) => handleInputChange('region', value)}
          />
          <CustomInput
            type="text"
            label="Município"
            value={formData.municipality}
            onChange={(value) => handleInputChange('municipality', value)}
          />
          <CustomInput
            type="text"
            label="Bairro"
            value={formData.neighborhood}
            onChange={(value) => handleInputChange('neighborhood', value)}
          />
          <CustomInput
            type="phone"
            label="Telefone"
            value={formData.phone}
            onChange={(value) => handleInputChange('phone', value)}
            required
          />
          <CustomInput
            type="phone"
            label="Telefone Opcional"
            value={formData.optionalPhone}
            onChange={(value) => handleInputChange('optionalPhone', value)}
          />
          <CustomInput
            type="multiselect"
            label="Habilitação Literária"
            options={[
              { label: 'Primária', value: 'Primária' },
              { label: 'Secundário', value: 'Secundário' },
              { label: 'Ensino Médio', value: 'Ensino Médio' },
              { label: 'Licenciado', value: 'Licenciado' },
              { label: 'Mestre', value: 'Mestrado' },
              { label: 'Doutorado', value: 'Doutorado' }
            ]}
            value={formData.educationalQualifications}
            onChange={(value) => handleInputChange('educationalQualifications', value)}
          />
        </div>
      ),
      2: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <CustomInput
            type="text"
            label="Nome do Pai"
            value={formData.fatherName}
            onChange={(value) => handleInputChange('fatherName', value)}
          />
          <CustomInput
            type="text"
            label="Nome da Mãe"
            value={formData.motherName}
            onChange={(value) => handleInputChange('motherName', value)}
          />
          <CustomInput
            type="phone"
            label="Contacto do Pai"
            value={formData.fatherContact}
            onChange={(value) => handleInputChange('fatherContact', value)}
          />
          <CustomInput
            type="phone"
            label="Contacto da Mãe"
            value={formData.motherContact}
            onChange={(value) => handleInputChange('motherContact', value)}
          />
        </div>
      ),
      3: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <CustomInput
            type="text"
            label="Religião"
            value={formData.religion}
            onChange={(value) => handleInputChange('religion', value)}
          />
          <CustomInput
            type="multiselect"
            label="Sacramentos"
            value={formData.sacraments}
            options={[
              { label: 'Batismo', value: 'BATISMO' },
              { label: 'Primeira Comunhão', value: 'PRIMEIRA_COMUNHAO' },
              { label: 'Crisma', value: 'CRISMA' },
              { label: 'Matrimônio', value: 'MATRIMONIO' }
            ]}
            onChange={(value) => handleInputChange('sacraments', value)}
          />
        </div>
      ),
      4: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <CustomInput
            type="select"
            label="Toma Remédio?"
            placeholder="Toma Remédio?"
            value={formData.takeMedicine}
            options={[
              { label: 'Sim', value: 'Sim' },
              { label: 'Não', value: 'Nao' }
            ]}
            onChange={(value) => handleInputChange('takeMedicine', value)}
          />
          <CustomInput
            type="select"
            label="Tem Alergia?"
            placeholder="Tem Alergia?"
            value={formData.haveAllergy}
            options={[
              { label: 'Sim', value: 'Sim' },
              { label: 'Não', value: 'Nao' }
            ]}
            onChange={(value) => handleInputChange('haveAllergy', value)}
          />
          <CustomInput
            type="select"
            label="Restrição a Medicamentos?"
            placeholder="Restrição a Medicamentos?"
            value={formData.medicationRestriction}
            options={[
              { label: 'Sim', value: 'Sim' },
              { label: 'Não', value: 'Nao' }
            ]}
            onChange={(value) => handleInputChange('medicationRestriction', value)}
          />
          <CustomInput
            type="select"
            label="Plano de Saúde?"
            placeholder="Plano de Saúde?"
            value={formData.healthPlan}
            options={[
              { label: 'Sim', value: 'Sim' },
              { label: 'Não', value: 'Nao' }
            ]}
            onChange={(value) => handleInputChange('healthPlan', value)}
          />
        </div>
      ),
      5: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <CustomInput
            type="text"
            label="Nome para Emergência"
            value={formData.emergencyName}
            onChange={(value) => handleInputChange('emergencyName', value)}
            required
          />
          <CustomInput
            type="text"
            label="Parentesco"
            value={formData.kinshipEmergency}
            onChange={(value) => handleInputChange('kinshipEmergency', value)}
            required
          />
          <CustomInput
            type="phone"
            label="Contacto de Emergência"
            value={formData.emergencyContact}
            onChange={(value) => handleInputChange('emergencyContact', value)}
            required
          />
        </div>
      ),
      6: fileUploadStep
      
    };

    return stepContents[index] || <p>Conteúdo em desenvolvimento...</p>;
  };
  const isLastStep = activeIndex === steps.length - 1;

  return (
    <div className='p-6'>
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

      <div className="w'full mt-10 ">
        <Card className="mb-4">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">Inscrição de Escuteiro</h1>
            <p className="text-gray-600">Preencha todos os campos obrigatórios (*)</p>
          </div>

          <Steps
            model={steps}
            activeIndex={activeIndex}
            onSelect={(e) => setActiveIndex(e.index)}
            className="mb-6"
          />

          <div className="step-content p-4">
            {renderStepContent(activeIndex)}
          </div>

          <div className="flex justify-start gap-7 mt-4">
            <Button
              label="Anterior"
              icon="pi pi-arrow-left"
              className="w-[150px] p-6 h-[50px] bg-[#6a28a4] hover:bg-[#6a28a4c0] transition-all rounded text-[#fff]"
              onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
              disabled={activeIndex === 0}
            />
            <Button
              label={isLastStep ? "Cadastrar" : "Próximo"}
              icon={isLastStep ? "" : "pi pi-arrow-right"}
              className={isLastStep ? " w-[150px] h-[50px] bg-[#4CAF50] hover:bg-[#4CAF50c0] transition-all rounded text-[#fff]" : " w-[150px] p-6 h-[50px] bg-[#6a28a4] hover:bg-[#6a28a4c0] transition-all rounded text-[#fff]"}
              iconPos={isLastStep ? "left" : "right"}
              loading={loading}
              onClick={() => {
                if (!isLastStep) {
                  setActiveIndex((prev) => Math.min(prev + 1, steps.length - 1));
                } else {
                  // Handle form submission
                  handleSubmit(event);
                  setLoading(true)
              
                }
              }}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InscreverEscuteiro;
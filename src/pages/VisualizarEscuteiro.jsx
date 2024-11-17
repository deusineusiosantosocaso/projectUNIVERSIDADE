import React from 'react';
import { useParams } from 'react-router-dom';
import { useCategories, useCivilStatus, useGender, useGroupings, useProvinces, useScout } from '../hooks/useScoutData';
import { Card } from 'primereact/card';
import { TabView, TabPanel } from 'primereact/tabview';
import { Chip } from 'primereact/chip';
import { Avatar } from 'primereact/avatar';
import { Tag } from 'primereact/tag';
import { Skeleton } from 'primereact/skeleton';
import { Divider } from 'primereact/divider';

const ScoutDetailsView = () => {
    const { id } = useParams();
    const { scout } = useScout();
    const { categories } = useCategories();
    const { provinces } = useProvinces();
    const { civilStatus } = useCivilStatus();
    const { gender } = useGender();
    const { groupings } = useGroupings();

    const scoutDetails = scout?.find(s => s.id === id);
    const category = categories?.find(c => c.id === scoutDetails?.categoryId);
    const province = provinces?.find(p => p.id === scoutDetails?.provinceId);
    const scoutGender = gender?.find(g => g.id === scoutDetails?.genderId);
    const scoutCivilStatus = civilStatus?.find(c => c.id === scoutDetails?.civilStatusId);
    const grouping = groupings?.find(g => g.id === scoutDetails?.groupingId);

    const InfoField = ({ label, value, icon }) => (
        <div className="field mb-3">
            <label className="block text-sm text-500 mb-1">{label}</label>
            <div className="flex align-items-center">
                {icon && <i className={`${icon} mr-2 text-primary`} />}
                <span className="text-900 font-medium">{value || 'N/A'}</span>
            </div>
        </div>
    );

    const ChipList = ({ items, label }) => (
        <div className="mb-3">
            <label className="block text-sm text-500 mb-2">{label}</label>
            <div className="flex flex-wrap gap-2">
                {items?.map((item, idx) => (
                    <Chip key={idx} label={item} className="bg-primary-100" />
                ))}
            </div>
        </div>
    );

    if (!scoutDetails) {
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

    const header = (
        <div className="flex align-items-center gap-3 mb-3 p-4">
            <Avatar
                image={scoutDetails.photographyFile || 'https://via.placeholder.com/150'}
                size="xlarge"
                shape="circle"
                className="shadow-2"
            />
            <div>
                <h1 className="text-3xl font-bold text-900 m-0">{scoutDetails.name}</h1>
                <div className="flex gap-2 mt-2">
                    <Tag value={category?.name} severity="info" />
                    <Tag value={grouping?.name} severity="success" />
                    <Tag value={scoutGender?.name} severity="warning" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-4">
            <Card header={header} className="shadow-2">
                <TabView className="mt-4">

                    <TabPanel header="Identificação" leftIcon="pi pi-user mr-2">
                        <Divider />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <InfoField label="Nome Completo" value={scoutDetails.name} icon="pi pi-user" />
                            <InfoField label="BI" value={scoutDetails.bi} icon="pi pi-id-card" />
                            <InfoField
                                label="Data de Nascimento"
                                value={new Date(scoutDetails.dateOfBirth).toLocaleDateString()}
                                icon="pi pi-calendar"
                            />

                            <InfoField label="Local de Nascimento" value={scoutDetails.birthplace} icon="pi pi-map-marker" />
                            <InfoField label="Telefone" value={scoutDetails.phone} icon="pi pi-phone" />
                            <InfoField label="Telefone Alternativo" value={scoutDetails.optionalPhone} icon="pi pi-phone" />
                        </div>

                    </TabPanel>

                    <TabPanel header="Morada" leftIcon="pi pi-home mr-2">
                        <Divider />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <InfoField label="Paróquia" value={scoutDetails.parish} icon="pi pi-building" />
                            <InfoField label="Município" value={scoutDetails.municipality} icon="pi pi-map" />
                            <InfoField label="Bairro" value={scoutDetails.neighborhood} icon="pi pi-map-marker" />
                            <InfoField label="Província" value={province?.name} icon="pi pi-globe" />
                        </div>
                    </TabPanel>

                    <TabPanel header="Educação" leftIcon="pi pi-book mr-2">
                        <Divider />
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

                            <ChipList
                                items={scoutDetails.educationalQualifications}
                                label="Qualificações Educacionais"
                            />
                            <ChipList
                                items={scoutDetails.courses}
                                label="Cursos"
                            />
                        </div>
                    </TabPanel>

                    <TabPanel header="Filiação" leftIcon="pi pi-users mr-2">
                        <Divider />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <InfoField label="Nome do Pai" value={scoutDetails.fatherName} icon="pi pi-user" />
                            <InfoField label="Contato do Pai" value={scoutDetails.fatherContact} icon="pi pi-phone" />

                            <InfoField label="Nome da Mãe" value={scoutDetails.motherName} icon="pi pi-user" />
                            <InfoField label="Contato da Mãe" value={scoutDetails.motherContact} icon="pi pi-phone" />
                        </div>
                    </TabPanel>

                    <TabPanel header="Religião" leftIcon="pi pi-heart mr-2">
                        <Divider />
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

                            <InfoField label="Religião" value={scoutDetails.religion} icon="pi pi-heart-fill" />

                            <ChipList
                                items={scoutDetails.sacraments}
                                label="Sacramentos"
                            />
                        </div>
                    </TabPanel>

                    <TabPanel header="Saúde" leftIcon="pi pi-heart-fill mr-2">
                        <Divider />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <InfoField label="Toma Medicamentos" value={scoutDetails.takeMedicine} icon="pi pi-plus-circle" />
                            <InfoField label="Possui Alergias" value={scoutDetails.haveAllergy} icon="pi pi-exclamation-circle" />
                            <InfoField label="Restrição Medicamentosa" value={scoutDetails.medicationRestriction} icon="pi pi-ban" />
                            <InfoField label="Plano de Saúde" value={scoutDetails.healthPlan} icon="pi pi-heart" />
                        </div>
                    </TabPanel>

                    <TabPanel header="Emergência" leftIcon="pi pi-exclamation-triangle mr-2">
                        <Divider />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <InfoField label="Nome" value={scoutDetails.emergencyName} icon="pi pi-user" />
                            <InfoField label="Parentesco" value={scoutDetails.kinshipEmergency} icon="pi pi-users" />
                            <InfoField label="Contato" value={scoutDetails.emergencyContact} icon="pi pi-phone" />
                        </div>
                    </TabPanel>

                    <TabPanel header="Anexos" leftIcon="pi pi-file mr-2">
                        <Divider />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <InfoField
                                label="Fotografia"
                                value={scoutDetails.photographyFile ? "Anexo disponível" : "N/A"}
                                icon="pi pi-image"
                            />
                            <InfoField
                                label="Bilhete de Identidade"
                                value={scoutDetails.identityCardFile ? "Anexo disponível" : "N/A"}
                                icon="pi pi-id-card"
                            />
                            <InfoField
                                label="Outros Documentos"
                                value={scoutDetails.othersDocumentFile ? "Anexo disponível" : "N/A"}
                                icon="pi pi-folder"
                            />
                        </div>
                    </TabPanel>
                </TabView>
            </Card>
        </div>
    );
};

export default ScoutDetailsView;
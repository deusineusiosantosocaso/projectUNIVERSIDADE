import { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/log.jpg';
import { FaBars, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import {
    FiBell,
    FiUser,
    FiSettings,
    FiCalendar,
    FiUsers,
    FiHome,
    FiPieChart,
    FiMessageSquare,
    FiHelpCircle,
    FiBook,
    FiShield,
    FiDollarSign
} from 'react-icons/fi';
import './Menu.css';
import AppRoutes from '../../Routes/Routes';

export const role = 'agrupamento';
const MenuComponent = () => {
    const [visible, setVisible] = useState(true);
    const [notificationCount, setNotificationCount] = useState(5);
    const [activeMenu, setActiveMenu] = useState(null);
    const navigate = useNavigate();

    // You can get this from your authentication context or props

    const getIcon = (type) => {
        switch (type) {
            case 'Dashboard': return <FiHome className="text-blue-400" />;
            case 'Agrupamento': return <FiUsers className="text-red-400" />;
            case 'Escuteiro': return <FiUsers className="text-green-400" />;
            case 'Atividades': return <FiCalendar className="text-purple-400" />;
            case 'Eventos': return <FiPieChart className="text-orange-400" />;
            case 'Mensagens': return <FiMessageSquare className="text-pink-400" />;
            case 'Finanças': return <FiDollarSign className="text-yellow-400" />;
            case 'Configurações': return <FiSettings className="text-gray-400" />;
            case 'Ajuda': return <FiHelpCircle className="text-cyan-400" />;
            default: return <FiBook className="text-indigo-400" />;
        }
    };

    const allMenuItems = [
        {
            label: 'Dashboard',
            path: '/dashboardNacional',
            subItems: ['Visão Geral', 'Estatísticas', 'Relatórios'],
            roles: ['nacional'] 
        },
        {
            label: 'Dashboard',
            path: '/dashboardRegional',
            subItems: ['Visão Geral', 'Estatísticas', 'Relatórios'],
            roles: ['regional'] 
        },
        {
            label: 'Dashboard',
            path: '/dashboardAgrupamento',
            subItems: ['Visão Geral', 'Estatísticas', 'Relatórios'],
            roles: ['agrupamento'] 
        },
        {
            label: 'Agrupamento',
            path: '/agrupamento',
            subItems: ['Adicionar', 'Gestão', 'Relatórios'],
            roles: ['regional', 'nacional']
        },
        {
            label: 'Escuteiro',
            path: '/escuteiro',
            subItems: ['Adicionar', 'Gestão', 'Perfis', 'Progressão'],
            roles: ['agrupamento', 'regional', 'nacional']
        },
        {
            label: 'Atividades',
            path: '/atividades',
            subItems: ['Adicionar', 'Gestão', 'Calendário', 'Planejamento'],
            roles: ['agrupamento', 'regional', 'nacional']
        },
        {
            label: 'Eventos',
            path: '/eventos',
            subItems: ['Adicionar', 'Gestão', 'Inscrições', 'Histórico'],
            roles: ['agrupamento', 'regional', 'nacional']
        },
        {
            label: 'Mensagens',
            path: '/mensagens',
            subItems: ['Caixa de Entrada', 'Enviar', 'Arquivadas'],
            roles: ['agrupamento', 'regional', 'nacional']
        },
        {
            label: 'Finanças',
            path: '/financas',
            subItems: ['Resumo', 'Pagamentos', 'Relatórios'],
            roles: ['nacional']
        },
        {
            label: 'Configurações',
            path: '/configuracoes',
            subItems: ['Perfil', 'Segurança', 'Notificações', 'Temas'],
            roles: ['agrupamento', 'regional', 'nacional']
        },
        {
            label: 'Ajuda',
            path: '/ajuda',
            subItems: ['Suporte', 'Documentação', 'Tutoriais'],
            roles: ['agrupamento', 'regional', 'nacional']
        }
    ];

    // Filter menu items based on user role
    const getMenuItemsByRole = () => {
        return allMenuItems.filter(item => item.roles.includes(role));
    };

    const toggleSubmenu = (itemLabel) => {
        setActiveMenu(activeMenu === itemLabel ? null : itemLabel);
    };

    const handleSubItemClick = (mainItem, subItem) => {
        const path = `/${mainItem.toLowerCase()}/${subItem.toLowerCase().replace(/ /g, '-')}`;
        navigate(path);
    };

    const menuItems = getMenuItemsByRole();

    return (
        <div className="app-wrapper">
            <div className={`Header ${visible ? 'aberto' : 'fechado'} float-right px-6 flex justify-between items-center h-[70px] bg-white shadow-md w-full`}>
                <div className="flex items-center gap-4">
                    <Button
                        icon={<FaBars size={18} />}
                        onClick={() => setVisible(!visible)}
                        className="p-button-rounded w-10 h-10 rounded-full p-button-text hover:bg-primary hover:bg-[#6c37ae] hover:text-white transition-all"
                        aria-label="Toggle Menu"
                    />

                    <h2 className=' font-semibold'>{role.toUpperCase()}</h2>
                </div>

                <div className="flex justify-between items-center gap-6">
                    <Button
                        icon={<FiShield size={20} />}
                        className="p-button-rounded p-button-text text-gray-600"
                        aria-label="Security"
                    />
                    <div className="relative">
                        <Button
                            icon={<FiBell size={20} />}
                            className="p-button-rounded p-button-text text-gray-600"
                            aria-label="Notifications"
                            badge={notificationCount.toString()}
                            badgeClassName="p-badge-danger"
                        />
                    </div>
                    <Avatar
                        icon={<FiUser size={20} />}
                        size="large"
                        shape="circle"
                        className="bg-primary cursor-pointer"
                    />
                </div>
            </div>

            <Sidebar
                visible={visible}
                modal={false}
                className="sidebar-modern"
                style={{
                    background: 'linear-gradient(180deg, #1a1f37 0%, #1a1f37 100%)',
                    width: '15%'
                }}
                showCloseIcon={false}
            >
                <div className="mb-4 relative">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-full h-[100px]"
                    />
                </div>

                <div className="menu-wrapper p-3">
                    {menuItems.map((item, index) => (
                        <div key={index} className="menu-item">
                            <div
                                className={`menu-header ${activeMenu === item.label ? 'active' : ''}`}
                                onClick={() => toggleSubmenu(item.label)}
                            >
                                <div className="menu-header-content">
                                    <span className="menu-icon">{getIcon(item.label)}</span>
                                    <span className="menu-label">{item.label}</span>
                                </div>
                                <FaChevronDown className={`menu-arrow ${activeMenu === item.label ? 'rotated' : ''}`} />
                            </div>
                            <div className={`submenu ${activeMenu === item.label ? 'expanded' : ''}`}>
                                {item.subItems.map((subItem, subIndex) => (
                                    <div
                                        key={subIndex}
                                        className="submenu-item cursor-pointer"
                                        onClick={() => handleSubItemClick(item.label, subItem)}
                                    >
                                        <div className="w-2 h-2 rounded-full bg-gray-500 mr-3"></div>
                                        {subItem}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bottom-menu">
                    <Button
                        label="Sair"
                        icon={<FaSignOutAlt />}
                        className="p-button-text text-gray-400 w-full hover:text-white"
                    />
                </div>
            </Sidebar>

            <div className={`content-area ${visible ? 'aberto' : 'fechado'} float-right`}>
                <AppRoutes />
            </div>
        </div>
    );
};

export default MenuComponent;
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import InscreverEscuteiro from '../pages/InscreverEscuteiro';
import { role } from '../Components/Menu/Menu';
import DashboardRegional from '../pages/Dashboards/DashboardRegional';
import DashboardAgrupamento from '../pages/Dashboards/DashboardAgrupamento';
import DashboardNacional from '../pages/Dashboards/DashboardNacional';
import ScoutsManagement from '../pages/GestaoDeEscuteiros';
import ActivityRegistrationForm from '../pages/CriarAtividade';
import GroupingRegistrationForm from '../pages/cadastrarAgrupamento';
import ActivityManager from '../pages/GestaoAtividade';
import GroupingManager from '../pages/GestaoAgrupamentos';
import ScoutDetailsView from '../pages/VisualizarEscuteiro';
import LoginPage from '../pages/auth/LoginPage';
// Importação lazy dos componentes de página
// const Dashboard = lazy(() => import('../pages/Dashboard'));

// Componente de loading para ser exibido enquanto os componentes são carregados
const LoadingComponent = () => (
    <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
);

// Componente para envolver as rotas com Suspense
const SuspenseWrapper = ({ children }) => (
    <Suspense fallback={<LoadingComponent />}>
        {children}
    </Suspense>
);

const getDashboardPath = () => {
    switch (role) {
        case 'regional':
            return '/dashboardRegional';
        case 'agrupamento':
            return '/dashboardAgrupamento';
        case 'nacional':
            return '/dashboardNacional';
        default:
            return '/dashboard';
    }
};

const getDashboardComponent = () => {
    switch (role) {
        case 'regional':
            return <DashboardRegional />;
        case 'agrupamento':
            return <DashboardAgrupamento />;
        case 'nacional':
            return <DashboardNacional />;
        default:
            return <Navigate to="/" />;
    }
};

// Configuração das rotas
const AppRoutes = () => {
    return (
        <SuspenseWrapper>
            <Routes>/dashboardAgrupamento
                {/* Rota padrão */}
                {/* <Route path="/" element={<Navigate to={getDashboardPath()} replace />} /> */}
                <Route path="/" element={ <LoginPage />}/>

                <Route path="/dashboardNacional" element={<DashboardNacional />}>
                    <Route index element={<DashboardNacional />} />
                    <Route path="visao-geral" element={<DashboardNacional />} />
                    <Route path="estatisticas" element={<DashboardNacional />} />
                    <Route path="relatorios" element={<DashboardNacional />} />
                </Route>

                <Route path="/dashboardRegional" element={<DashboardRegional />}>
                    <Route index element={<DashboardRegional />} />
                    <Route path="visao-geral" element={<DashboardRegional />} />
                    <Route path="estatisticas" element={<DashboardRegional />} />
                    <Route path="relatorios" element={<DashboardRegional />} />
                </Route>

                <Route path="/dashboardAgrupamento" element={<DashboardAgrupamento />}>
                    <Route index element={<DashboardAgrupamento />} />
                    <Route path="visao-geral" element={<DashboardAgrupamento />} />
                    <Route path="estatisticas" element={<DashboardAgrupamento />} />
                    <Route path="relatorios" element={<DashboardAgrupamento />} />
                </Route>

                <Route path="/agrupamento">
                    <Route path="adicionar" element={<GroupingRegistrationForm />} />
                    <Route path="Gestão" element={<GroupingManager />} />
                    <Route path="perfis" element={<h1>DashBoard</h1>} />
                    <Route path="progressao" element={<h1>DashBoard</h1>} />
                </Route>

                {/* Escuteiro */}
                <Route path="/escuteiro">
                    <Route path="adicionar" element={<InscreverEscuteiro />} />
                    <Route path="gestão" element={<ScoutsManagement />} />
                    <Route path="visualizar/:id" element={<ScoutDetailsView />} />
                    <Route path="perfis" element={<h1>DashBoard</h1>} />
                    <Route path="progressao" element={<h1>DashBoard</h1>} />
                </Route>

                {/* Atividades */}
                <Route path="/atividades">
                    <Route path="adicionar" element={<ActivityRegistrationForm />} />
                    <Route path="Gestão" element={<ActivityManager />} />
                    <Route path="calendario" element={<h1>DashBoard</h1>} />
                    <Route path="planejamento" element={<h1>DashBoard</h1>} />
                </Route>

                {/* Eventos */}
                <Route path="/eventos" element={<h1>DashBoard</h1>}>
                    <Route index element={<h1>DashBoard</h1>} />
                    <Route path="adicionar" element={<h1>DashBoard</h1>} />
                    <Route path="gestao" element={<h1>DashBoard</h1>} />
                    <Route path="inscricoes" element={<h1>DashBoard</h1>} />
                    <Route path="historico" element={<h1>DashBoard</h1>} />
                </Route>

                {/* Mensagens */}
                <Route path="/mensagens" element={<h1>DashBoard</h1>}>
                    <Route index element={<h1>DashBoard</h1>} />
                    <Route path="caixa-de-entrada" element={<h1>DashBoard</h1>} />
                    <Route path="enviar" element={<h1>DashBoard</h1>} />
                    <Route path="arquivadas" element={<h1>DashBoard</h1>} />
                </Route>

                {/* Finanças */}
                <Route path="/financas" element={<h1>DashBoard</h1>}>
                    <Route index element={<h1>DashBoard</h1>} />
                    <Route path="resumo" element={<h1>DashBoard</h1>} />
                    <Route path="pagamentos" element={<h1>DashBoard</h1>} />
                    <Route path="relatorios" element={<h1>DashBoard</h1>} />
                </Route>

                {/* Configurações */}
                <Route path="/configuracoes" element={<h1>DashBoard</h1>}>
                    <Route index element={<h1>DashBoard</h1>} />
                    <Route path="perfil" element={<h1>DashBoard</h1>} />
                    <Route path="seguranca" element={<h1>DashBoard</h1>} />
                    <Route path="notificacoes" element={<h1>DashBoard</h1>} />
                    <Route path="temas" element={<h1>DashBoard</h1>} />
                </Route>

                {/* Ajuda */}
                <Route path="/ajuda" element={<h1>DashBoard</h1>}>
                    <Route index element={<h1>DashBoard</h1>} />
                    <Route path="suporte" element={<h1>DashBoard</h1>} />
                    <Route path="documentacao" element={<h1>DashBoard</h1>} />
                    <Route path="tutoriais" element={<h1>DashBoard</h1>} />
                </Route>

                {/* Rota para página não encontrada */}
                <Route path="*" element={<Navigate to={getDashboardPath()} replace />} />
            </Routes>
        </SuspenseWrapper>
    );
};

export default AppRoutes;
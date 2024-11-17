import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { Message } from 'primereact/message';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import CustomInput from '../../Components/others/Inputs';

const LoginPage = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [recoveryEmail, setRecoveryEmail] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [message, setMessage] = useState({ severity: '', text: '' });

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage({ severity: 'info', text: 'Processando seu login...' });
        // Implementar lógica de login aqui
    };

    const handleRecovery = (e) => {
        e.preventDefault();
        setMessage({ 
            severity: 'info', 
            text: 'Instruções de recuperação enviadas para seu email.' 
        });
        // Implementar lógica de recuperação aqui
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(to bottom right, #bebebe, #0c3cd8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
        }}>
            <div style={{ width: '100%', maxWidth: '450px' }}>
                {/* Header com Logo */}
                <div style={{ 
                    textAlign: 'center', 
                    marginBottom: '2rem',
                    color: 'white'
                }}>
                    <img
                        src="/api/placeholder/120/120"
                        alt="AEA Logo"
                        style={{
                            width: '120px',
                            height: '120px',
                            margin: '0 auto 1rem auto',
                            borderRadius: '60px',
                            padding: '0.5rem',
                            backgroundColor: 'white'
                        }}
                    />
                    <h1 style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: 'bold',
                        marginBottom: '0.5rem'
                    }}>
                        Associação dos Escuteiros de Angola
                    </h1>
                    <p style={{ color: '#E8F5E9' }}>Sistema de Gestão</p>
                </div>

                {/* Card Principal */}
                <Card className="p-shadow-5">
                    <TabView>
                        {/* Tab de Login */}
                        <TabPanel header="Login">
                            <form onSubmit={handleLogin} className="p-fluid">
                                <div className="p-field">
                                    <CustomInput
                                        type="text"
                                        label="Email"
                                        value={loginData.email}
                                        onChange={(value) => setLoginData({ ...loginData, email: value })}
                                        icon="pi pi-envelope"
                                        required
                                        placeholder="seu.email@exemplo.com"
                                    />
                                </div>

                                <div className="p-field">
                                    <CustomInput
                                        type="password"
                                        label="Senha"
                                        value={loginData.password}
                                        onChange={(value) => setLoginData({ ...loginData, password: value })}
                                        icon="pi pi-lock"
                                        required
                                        placeholder="Digite sua senha"
                                    />
                                </div>

                                <div className="p-field-checkbox" style={{ margin: '1rem 0' }}>
                                    <Checkbox
                                        inputId="rememberMe"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.checked)}
                                    />
                                    <label htmlFor="rememberMe" className="p-checkbox-label" style={{ marginLeft: '0.5rem' }}>
                                        Lembrar-me
                                    </label>
                                </div>

                                <Button
                                    type="submit"
                                    label="Entrar"
                                    icon="pi pi-sign-in"
                                    className="p-button-success p-button-raised"
                                    style={{ marginTop: '1rem' }}
                                />
                            </form>
                        </TabPanel>

                        {/* Tab de Recuperação de Senha */}
                        <TabPanel header="Recuperar Conta">
                            <form onSubmit={handleRecovery} className="p-fluid">
                                <p style={{ 
                                    color: '#666', 
                                    fontSize: '0.875rem',
                                    marginBottom: '1rem' 
                                }}>
                                    Digite seu email para receber as instruções de recuperação de senha.
                                </p>

                                <div className="p-field">
                                    <CustomInput
                                        type="text"
                                        label="Email"
                                        value={recoveryEmail}
                                        onChange={setRecoveryEmail}
                                        icon="pi pi-envelope"
                                        required
                                        placeholder="seu.email@exemplo.com"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    label="Recuperar Senha"
                                    icon="pi pi-refresh"
                                    className="p-button-success p-10 p-button-raised"
                                    style={{ marginTop: '1rem' }}
                                />
                            </form>
                        </TabPanel>
                    </TabView>

                    {message.text && (
                        <div style={{ marginTop: '1rem' }}>
                            <Message
                                severity={message.severity}
                                text={message.text}
                                style={{ width: '100%' }}
                            />
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
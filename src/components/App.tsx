import './App.scss';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DependencyProvider } from '../contexts/DependencyContext';
import { Header } from './Header/Header';
import { SideNav } from './SideNav/SideNav';
import { Main } from './Main/Main';
import { Footer } from './Footer/Footer';
import { ModalContainer } from '../hooks/UseModal';

function App()
{
    return (
        <DependencyProvider>
            <div className='application'>
                <Router>
                    <Header />
                    <SideNav />
                    <Main />
                    <Footer />
                </Router>
                <ModalContainer></ModalContainer>
            </div>
        </DependencyProvider>
    );
}

export default App;

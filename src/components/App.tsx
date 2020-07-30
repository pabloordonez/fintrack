import React from 'react';
import './App.css';
import { Numbers } from './Numbers/Numbers';
import { DependencyProvider } from '../contexts/DependencyContext';

function App()
{
    return (
        <DependencyProvider>
            <Numbers />
            <Numbers />
        </DependencyProvider>
    );
}

export default App;

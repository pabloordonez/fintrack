import React from 'react';
import './App.css';
import { Numbers } from './Numbers/Numbers';
import { DependencyProvider } from '../contexts/DependencyContext';
import { NumberGenerator } from './NumberGenerator/NumberGenerator';

function App()
{
    return (
        <DependencyProvider>
            <Numbers />
            <Numbers />
            <NumberGenerator />
        </DependencyProvider>
    );
}

export default App;

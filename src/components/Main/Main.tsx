import React, { ReactElement } from 'react';
import './Main.scss';
import { Switch, Route } from 'react-router-dom';
import { Banks } from './Admin/Banks/Banks';
import { Rules } from './Admin/Rules/Rules';

export function Main(): ReactElement
{
    return (
        <main>
            <Switch>
                <Route path='/admin/banks'>
                    <Banks />
                </Route>
                <Route path='/admin/rules'>
                    <Rules />
                </Route>
            </Switch>
        </main>);
}

import './Main.scss';
import React, { ReactElement } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Banks } from './Admin/Banks/Banks';
import { Rules } from './Admin/Rules/Rules';
import { BankEditor } from './Admin/BankEditor/BankEditor';

export function Main(): ReactElement
{
    return (
        <main>
            <Switch>
                <Route path='/admin/banks/:id' component={BankEditor} />
                <Route exact={true} path='/admin/banks' component={Banks} />
                <Route exact={true} path='/admin/rules' component={Rules} />
            </Switch>
        </main>
    );
}

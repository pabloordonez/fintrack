import './Banks.scss';
import React, { ReactElement } from 'react';
import { Page } from '../../../Shared/Page/Page';
import { Card } from '../../../Shared/Card/Card';
import { useDependency } from '../../../../contexts/DependencyContext';
import { BankRepositoryService } from '../../../../services/repositories/BankRepositoryService';
import { LoggingService } from '../../../../services/logging/LoggingService';
import { useHistory } from 'react-router-dom';

export function Banks(): ReactElement
{
    const history = useHistory();
    const logger = useDependency(LoggingService);
    const repository = useDependency(BankRepositoryService);

    const banks = repository.getAll();
    logger.debug(`Got ${banks.length} banks.`);

    function newBank(): void
    {
        history.push(`/admin/banks/new`);
    }

    function editBank(id: string): void
    {
        history.push(`/admin/banks/${id}`);
    }

    function removeBank(id: string): void
    {
        repository.remove(id);
    }

    return (
        <Page>
            <Card>
                <h1>Banks</h1>
                <button onClick={newBank}>Add New</button>
                {(banks && banks.length > 0) ?
                    <table>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Description</td>
                            </tr>
                        </thead>
                        <tbody>
                            {banks.map(bank => (
                                <tr key={bank.id} onClick={() => editBank(bank.id)}>
                                    <td>{bank.name}</td>
                                    <td>{bank.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    : <span>There's not banks yet. Try to <button onClick={newBank}>add a new one.</button></span>}
            </Card>
        </Page>
    );
}

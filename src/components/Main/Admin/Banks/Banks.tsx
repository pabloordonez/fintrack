import React, { ReactElement } from 'react';
import { Page } from '../../../Shared/Page/Page';
import { Card } from '../../../Shared/Card/Card';
import './Banks.scss';

export function Banks(): ReactElement
{
    return (
        <Page>
            <Card>
                <h1>Banks</h1>
            </Card>
        </Page>
    );
}

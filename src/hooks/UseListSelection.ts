import { useState } from 'react';

export function useListSelection<TModel extends { id: string }>(): [string[], (model: TModel, selected: boolean) => void]
{
    const [selectedIds, setSelectedIds] = useState([] as string[]);

    function select(model: TModel, isSelected: boolean): void
    {
        const newIds = [...selectedIds];

        if (isSelected)
            newIds.push(model.id);
        else
            newIds.splice(newIds.indexOf(model.id), 1);

        setSelectedIds(newIds);
    }

    return [selectedIds, select];
}

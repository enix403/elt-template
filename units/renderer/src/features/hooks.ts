import React, { useEffect, useState, useCallback } from 'react';
import type { HasID, IRawMaterial } from '@shared/object_types';
import { AllMessages, AppChannel } from '@shared/communication';
import { formatResponseErrorLog, isResponseSuccessful } from '@/utils';

// Use wisely. This hook only more like a helper for development when you'd want to re-fetch
// some data from api insteads of reloading page
export const useRefreshableEffect = (callback: React.EffectCallback, deps: React.DependencyList) =>
{
    const [updateCount, setUpdateCount] = useState(0);
    useEffect(callback, deps.concat([updateCount]));

    return useCallback(() => setUpdateCount(c => (c + 1) % 15), []);
}

export function useTrackedEffectFunc(
    callback: () => Promise<any>,
    blockWhileLoading: boolean = true
)
{
    const [loading, setIsLoading] = React.useState(false);

    const effectFunc = useCallback(() => {
        if (blockWhileLoading && loading)
            return

        setIsLoading(true);

        callback().finally(() => setIsLoading(false));
    }, [loading]);

    return [effectFunc, loading] as const;
};

export const useRawMaterialList = (onLoad?: (list: IRawMaterial[]) => void) => {
    const [mats, setMats] = useState<IRawMaterial[]>([]);
    // const [loading, setLoading] = useState(false);

    const [effectObj, loading] = useTrackedEffectFunc(async () => {
        // if (loading)
            // return;

        // setLoading(true);
        setMats([]);

        return window.SystemBackend.sendMessage(
            AppChannel.Inventory,
            new AllMessages.Inv.RM.GetAllMaterials()
        )
            .then(res => {
                if (isResponseSuccessful(res)){
                    setMats(res.data!);
                    onLoad?.(res.data!);
                }
                else {
                    setMats([]);
                    onLoad?.([]);
                    console.error("Could not fetch materials:", formatResponseErrorLog(res));
                }
            })
            // .finally(() => setLoading(false));
    });

    const refreshList = useRefreshableEffect(effectObj, []);

    return [mats, loading, refreshList] as const;
};

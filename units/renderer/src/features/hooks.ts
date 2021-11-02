import React, { useEffect, useState, useCallback } from 'react';
import type { UnpackedCollection } from '@shared/tsutils';
import {
    AllMessages,
    AppChannel,
    ExtractMsgResult,
    ExtractMsgPayload
} from '@shared/communication';
import { formatResponseErrorLog, isResponseSuccessful } from '@/utils';

// Use wisely. This hook only more like a helper for development when you'd want to re-fetch
// some data from api insteads of reloading page
export function useRefreshableEffect(callback: React.EffectCallback, deps: React.DependencyList)
{
    const [updateCount, setUpdateCount] = useState(0);
    useEffect(callback, deps.concat([updateCount]));

    return useCallback(() => setUpdateCount(c => (c + 1) % 15), []);
}

export function useTrackedEffectFunc(
    callback: () => Promise<any>,
    blockWhileLoading: boolean = true
) {
    const [loading, setIsLoading] = React.useState(false);

    const effectFunc = useCallback(() => {
        if (blockWhileLoading && loading)
            return

        setIsLoading(true);

        callback().finally(() => setIsLoading(false));
    }, [loading]);

    return [effectFunc, loading] as const;
};

type RMMsgResult    = ExtractMsgResult<AllMessages.Inv.RM.GetAllMaterials>;
type RMMsgPayload   = ExtractMsgPayload<AllMessages.Inv.RM.GetAllMaterials>;

export function useRawMaterialList(
    onLoad?: (list: RMMsgResult) => void,
    options?: RMMsgPayload
) {
    const [mats, setMats] = useState<RMMsgResult>([]);

    const [effectObj, loading] = useTrackedEffectFunc(async () => {
        setMats([]);

        return window.SystemBackend.sendMessage(
            AppChannel.Inventory,
            new AllMessages.Inv.RM.GetAllMaterials(options)
        )
            .then(res => {
                if (isResponseSuccessful(res)) {
                    setMats(res.data!);
                    onLoad?.(res.data!);
                }
                else {
                    setMats([]);
                    onLoad?.([]);
                    console.error("Could not fetch materials:", formatResponseErrorLog(res));
                }
            })
    });

    const refreshList = useRefreshableEffect(effectObj, []);

    return [mats, loading, refreshList] as const;
};

export function useRawMaterialSelect(options?: RMMsgPayload) {
    const [allMats, loading, refreshMats] = useRawMaterialList(allMats => {
        setSelected(allMats.length > 0 ? allMats[0] : undefined);
    }, options);

    const [selected, setSelected] = React.useState<UnpackedCollection<RMMsgResult>>();

    const handleChange = useCallback(e => {
        const id = e.target.value;
        setSelected(allMats.find(mat => mat.id == id));
    }, [allMats]);

    return {
        allMats,
        loading,
        refreshMats,
        handleChange,
        selected: loading ? undefined : selected,
        setSelected
    };
}

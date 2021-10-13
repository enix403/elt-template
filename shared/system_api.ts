export interface ISystemBackendAPI {
    sendPrefs: (cname: string) => Promise<void>;
};

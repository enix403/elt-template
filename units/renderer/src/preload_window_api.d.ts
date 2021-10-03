export interface IElectronAPI {
    loadPreferences: () => Promise<void>,
}

declare global {
    interface Window {
        system: IElectronAPI
    }
}

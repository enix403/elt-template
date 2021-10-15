import { AppChannel } from "@shared/communication";
import { ChannelResponse } from "@shared/system_api";

export function setupDevSystemApi() {
    if (process.env.NODE_ENV === 'development') {
        if (!window.SystemBackend) {
            window.SystemBackend = {
                sendMessage: async <T = any>(channel: AppChannel, message: T): Promise<ChannelResponse> => {
                    const rawResponse = await fetch('http://localhost:4201', {
                        method: 'POST',
                        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                        body: JSON.stringify({ channel, message })
                    });
                    return await rawResponse.json();
                }
            };
        }
    }
}

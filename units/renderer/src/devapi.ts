import { AppChannel, CommResultType } from "@shared/communication";
import { ChannelResponse } from "@shared/system_api";

export function setupDevSystemApi() {
    if (typeof window.SystemBackend == 'object')
        return

    if (process.env.NODE_ENV === 'development') {
        window['AppChannel'] = AppChannel;
        if (!window.SystemBackend) {
            window.SystemBackend = {
                sendMessage: async <T = any>(channel: AppChannel, message: T): Promise<ChannelResponse> => {
                    try {
                        const rawResponse = await fetch('http://localhost:4201', {
                            method: 'POST',
                            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                            body: JSON.stringify({ channel, message })
                        });
                        return await rawResponse.json();
                    }
                    catch (e) {
                        return {
                            type: CommResultType.SystemError,
                            error: "Failed to send http request"
                        }
                    }
                }
            };
        }
    }
}

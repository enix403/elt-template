import {
    AppChannel,
    CommResultType,
    AllMessages,
    Message
} from "@shared/communication";

import type { ChannelResponse } from "@shared/communication";

export function setupDevSystemApi() {
    if (window.SystemBackend && typeof window.SystemBackend == 'object')
        return

    if (process.env.NODE_ENV !== 'development')
        return

    window['AppChannel'] = AppChannel;
    window['AllMessages'] = AllMessages;

    const _sendPlainMessage = async (channel: AppChannel, message: any): Promise<ChannelResponse<any>> => {
        try {
            // TODO: get the port out of an env variable instead of hardcoding it
            const rawResponse = await fetch('http://localhost:4201', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ channel: channel.toString(), message })
            });
            return await rawResponse.json();
        }
        catch (e) {
            console.error("CommunicationError:", "Http request send/receive error");
            return { type: CommResultType.CommunicationError };
        }
    }

    window.SystemBackend = {
        sendPlainMessage: _sendPlainMessage,
        sendMessage: (channel, message) =>
            _sendPlainMessage(channel, Message.serialize(message))
    };
}

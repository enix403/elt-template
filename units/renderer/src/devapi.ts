import { AppChannel, CommResultType, AllMessages } from "@shared/communication";

export function setupDevSystemApi() {
    if (window.SystemBackend && typeof window.SystemBackend == 'object')
        return

    if (process.env.NODE_ENV !== 'development')
        return

    window['AppChannel'] = AppChannel;
    window['AllMessages'] = AllMessages;

    const _sendPlainMessage = async (channel: AppChannel, message: any): Promise<any> => {
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
            return {
                type: CommResultType.SystemError,
                error: "Http request send/receive error"
            }
        }
    }

    window.SystemBackend = {
        sendPlainMessage: _sendPlainMessage,
        sendMessage: (channel, message) =>
            _sendPlainMessage(channel, message.serialize())
    };
}

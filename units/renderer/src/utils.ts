import ReactDOMServer from "react-dom/server";
import type { ChannelResponse } from '@shared/communication/interfaces';
import { CommResultType } from '@shared/communication/constants';
import { AppToaster } from './toaster';

// The below if-checks are used A LOT in the application
// So they are wrapped in their own tiny functions for convenience

export const isResponseFatalError = (response: ChannelResponse<any>) =>
    response.type == CommResultType.SystemError ||
    response.type == CommResultType.CommunicationError ||
    response.type == CommResultType.InvalidChannel;


export const isResponseChannelError = (response: ChannelResponse<any>) =>
    response.type == CommResultType.ChannelError;

export const isResponseSuccessful = (response: ChannelResponse<any>) =>
    response.type == CommResultType.ChannelResponse;


// Can't really show 'Cannot access property "name" of undefined' to the user....
const SYS_ERROR_MESSAGE = 'A system error has occured. Please see the logs and contact tech support';

export const formatResponseError = (response: ChannelResponse<any>): string => {
    if (isResponseFatalError(response))
        return SYS_ERROR_MESSAGE;
    else
        return response.error || 'An error occured [ERR_CHANNEL_ERROR]';
}

const LOG_ERROR_MESSAGES = {
    [CommResultType.CommunicationError]:    "CommunicationError: A communication error has occured",
    [CommResultType.SystemError]:           "SystemError: A system error has occured",
    [CommResultType.InvalidChannel]:        "InvalidChannel: Specify a valid channel",
    [CommResultType.ChannelError]:          "ChannelError: A channel error occured",
};

export const formatResponseErrorLog = (response: ChannelResponse<any>): string =>
    LOG_ERROR_MESSAGES[response.type]

export const showGenericError = (message: string) => {
    AppToaster.show({
        intent: 'danger',
        message: message,
        icon: 'error'
    });
};


export const getReactElementSize = (elementJSX: React.ReactElement) => {

    const elementString = ReactDOMServer.renderToStaticMarkup(elementJSX);
    const elementDocument = new DOMParser().parseFromString(elementString, "text/html");

    // @ts-ignore
    const elementNode = elementDocument.getRootNode().body.firstChild;

    const container = document.createElement("div");
    const containerStyle = {
        display: "block",
        position: "absolute",
        boxSizing: "border-box",
        margin: "0",
        padding: "0",
        visibility: "hidden"
    };

    Object.assign(container.style, containerStyle);

    container.appendChild(elementNode);
    document.body.appendChild(container);

    const width = container.clientWidth;
    const height = container.clientHeight;

    container.removeChild(elementNode);
    document.body.removeChild(container);

    return { width, height };
};

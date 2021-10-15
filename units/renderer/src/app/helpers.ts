import ReactDOMServer from "react-dom/server";


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


import 'normalize.css';

import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@fontsource/roboto';

import { Button } from '@blueprintjs/core';

function App() {
    return (
        <div className="App" style={{
            width: '100vw',
            height: '100vh',
            padding: 30,
            backgroundColor: '#1e1e1e',
            color: '#ffffff',
            fontFamily: 'Roboto'
        }}>
            <h3>Hello World</h3>
            <Button
                text="A Simple Button"
                intent="warning"
                minimal={true}
                outlined={true}
                icon="take-action"
            />
        </div>
    );
}

export default App;

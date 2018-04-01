import * as React from 'react'
import './App.css'
import { JSONField } from './components'
import { InterfaceGenerator } from './utils'

const logo = require('./logo.svg')

interface Props {}
interface State {
    json: object | null
}

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { json: null }
    }
    render() {
        const { json } = this.state
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                {/* tslint:disable-next-line:no-console */}
                <JSONField onValidJSON={this.setJSON} />
                {json && (
                    <>
                        <hr />
                        <pre>{new InterfaceGenerator(json).toString()}</pre>
                    </>
                )}
            </div>
        )
    }

    private setJSON = (json: object) => this.setState({ json })
}

export default App

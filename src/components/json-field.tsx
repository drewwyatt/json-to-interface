import * as React from 'react'
import { AcceptedInput, ParseStatus, ParseStatusCode } from '../models'

interface Props {
    onValidJSON(parsedJSON: AcceptedInput): void
}

interface State {
    json: string
    parseStatus: ParseStatus
}

class JSONField extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            json: '',
            parseStatus: {
                code: ParseStatusCode.notParsed,
                message: '',
            },
        }
    }
    render() {
        const { json, parseStatus: { code, message } } = this.state
        return (
            <>
                <textarea
                    style={{
                        borderColor:
                            code === ParseStatusCode.error ? 'red' : 'black',
                    }}
                    onChange={this.onJSONUpdate}
                    value={json}
                />
                <p style={{ color: 'red' }}>{message}</p>
            </>
        )
    }

    private onJSONUpdate = ({
        target: { value: json },
    }: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({ json }, this.tryParseJSON)
    }

    private tryParseJSON = () => {
        try {
            const parsedJSON = JSON.parse(this.state.json)
            this.setState({
                parseStatus: { code: ParseStatusCode.ok, message: '' },
            })
            this.props.onValidJSON(parsedJSON)
        } catch (err) {
            this.setState({
                parseStatus: {
                    code: ParseStatusCode.error,
                    message: (err as Error).message,
                },
            })
        }
    }
}

export { JSONField }

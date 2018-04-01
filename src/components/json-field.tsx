import * as React from 'react'

interface ParseStatus {
    code: ParseStatusCode
    message: string
}

enum ParseStatusCode {
    notParsed,
    ok,
    error,
}

interface Props {}

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
            JSON.parse(this.state.json)
            this.setState({
                parseStatus: { code: ParseStatusCode.ok, message: '' },
            })
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

export default JSONField

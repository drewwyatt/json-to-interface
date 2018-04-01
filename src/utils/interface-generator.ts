import { PropType } from '../models'
type ObjectKeyType = [string, string]

class InterfaceGenerator {
    constructor(public input: object) {}

    toString(): string {
        return [
            'interface Foo {',
            ...this.props.map(([k, v]) => `    ${k}: ${v}`),
            '}',
        ].join('\n')
    }

    get props(): ReadonlyArray<ObjectKeyType> {
        return Object.keys(this.input).map(this.keyTypeForKey)
    }

    private keyTypeForKey = (key: string): ObjectKeyType => {
        const type = typeof this.input[key]
        switch (type) {
            case PropType.string:
                return [key, PropType.string]
            case PropType.number:
                return [key, PropType.number]
            case PropType.object:
                return Array.isArray(this.input[key])
                    ? [key, 'Array<any>']
                    : [key, 'object']
            default:
                return [key, 'any']
        }
    }
}

export { InterfaceGenerator }

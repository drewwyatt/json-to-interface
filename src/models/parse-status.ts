interface ParseStatus {
    code: ParseStatusCode
    message: string
}

enum ParseStatusCode {
    notParsed,
    ok,
    error,
}
export { ParseStatus, ParseStatusCode }

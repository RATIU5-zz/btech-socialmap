class HTTPError extends Error {
	constructor(code, message) {
		super(message);
		this.code = errorCode;
	}
}

module.exports = HTTPError;

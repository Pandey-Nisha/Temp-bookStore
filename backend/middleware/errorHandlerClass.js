class errorHandler extends Error {
    constructor(message, status) {
        super(message);
        this.status = status || 500;
        this.name = 'CustomError';
    }
}

export default errorHandler;

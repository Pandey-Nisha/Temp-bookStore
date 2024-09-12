const errorHandlerClass = (err, req, res, next) => {
    err.message = err.message || 'Internal Server Error';
    err.status = err.status || 500;

    console.error(err.stack);

    return res.status(err.status). json({message: err.message});
}

export default errorHandlerClass;

export const notFoundHandler = (err, req, res, next) => {
    console.log({
        method:req.method,
        url:req.originalUrl,
        body:req.body
    });
    const error=new Error('Not Found -----');

    error.status = 404;
    next(error);
}
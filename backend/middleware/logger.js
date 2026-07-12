export  const logger=(req,res,next)=>{
    console.log({
        method:req?.method,
        url:req?.originalUrl,
        body:req?.body
    });
    next()
};
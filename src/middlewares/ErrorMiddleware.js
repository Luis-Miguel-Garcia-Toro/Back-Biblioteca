function errorHandler(err, re, res, next) {
    console.log(err);
    return res.status(200).json({
        code: 500,
        text: "Error de servidor"
    })
}

module.exports ={
    errorHandler
}
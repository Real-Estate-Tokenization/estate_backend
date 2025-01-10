const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey || apiKey !== '123') {
        return res.status(401).json({
            status: 'fail',
            message: 'Invalid or missing API key'
        });
    }
    
    next();
};

module.exports = apiKeyMiddleware;

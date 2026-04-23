const { encrypt } = require('../utils/crypto');

const encryptMiddleware = (req, res, next) => {
    // Si el usuario está guardando una contraseña nueva
    if (req.body && req.body.password) {
        try {
            // La ciframos ANTES de que llegue al controlador
            req.body.password = encrypt(req.body.password);
            next(); 
        } catch (error) {
            res.status(500).json({ error: "Error al procesar el cifrado" });
        }
    } else {
        next();
    }
};

module.exports = encryptMiddleware;
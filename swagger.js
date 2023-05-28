const swaggerjsdoc = require('swagger-jsdoc');
const swaggerui = require('swagger-ui-express');

// meta data info 
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: { title: "ERP API", version: "1.0.0", description: "API de acceso al ERP" },
        servers: [
            { url: "http://localhost:3000" }
        ],
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        },
        security: [{ bearerAuth: [] }]
    },
    apis: ["./routes/api/*.js"], // files containing annotations as above

};




// docs en json format
const swaggerSpec = swaggerjsdoc(swaggerOptions);

// function to setup  oui docs
const swaggerDocs = (app, port) => {
    app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerSpec));
    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });


};

console.log("Version 1 of the API ${port}")
module.exports = { swaggerDocs };




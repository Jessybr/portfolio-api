import swaggerJsdoc from 'swagger-jsdoc'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Portfolio API',
            version: '1.0.0',
            description: 'API REST para gerenciamento de portfolio'
        },
        servers: [
            {
                url:"https://portfolio-api-latest-ydsx.onrender.com",
                description:"Render"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./src/routes/*.js']
}

const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec
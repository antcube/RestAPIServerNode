import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    // Main configuration of the API docs
    swaggerDefinition: {
        openapi: "3.0.0",
        tags: [
            {
                name: "Products",
                description: "API operations related to products"
            }
        ],
        info: {
            title: "REST API Node.js / Express / TypeScript",
            version: "1.0.0",
            description: "API Docs for Products"
        }
    },
    // Path to the API docs
    apis: ["./src/router.ts"]
}

const swaggerUiOptions: SwaggerOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url('https://cdn.pixabay.com/photo/2014/04/02/14/08/mouse-306274_1280.png');
        }
        .swagger-ui .topbar {
            background-color: #2b3b4b;
        }
        .swagger-ui .topbar a {
            height: 60px;
            max-width: 60px;
        }
    `,
    customSiteTitle: 'Documentación REST API Express / TypeScript',
    customfavIcon: 'https://cdn.pixabay.com/photo/2019/10/09/07/28/development-4536630_1280.png',
}

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUiOptions };
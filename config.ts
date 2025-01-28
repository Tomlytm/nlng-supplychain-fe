export const configData = {
  requestMethods: ["GET", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"],
  requestHeaders: [
    "authorization",
    "Access-Control-Allow-Origin",
    "Content-Type",
    "SOAPAction",
    "apikey",
    "Internal-Key",
  ],
};

export const SwaggerDefault = {
  swagger: "2.0",
  info: {
    version: "1.01",
    title: "FarouqAPUII",
  },
  security: [
    {
      default: [],
    },
  ],
  paths: {
    "/*": {
      post: {
        consumes: ["text/xml", "application/soap+xml"],
        parameters: [
          {
            in: "body",
            name: "SOAP Request",
            description: "SOAP request.",
            required: true,
            schema: {
              type: "string",
            },
          },
          {
            name: "SOAPAction",
            in: "header",
            description: "SOAPAction header for soap 1.1",
            required: false,
            type: "string",
          },
        ],
        responses: {
          "200": {
            description: "OK",
          },
        },
        security: [
          {
            default: [],
          },
        ],
        "x-throttling-tier": "Unlimited",
        "x-auth-type": "Application & Application User",
        "x-wso2-application-security": {
          "security-types": ["oauth2"],
          optional: false,
        },
      },
    },
  },
  securityDefinitions: {
    default: {
      type: "oauth2",
      authorizationUrl: "https://test.com",
      flow: "implicit",
      scopes: {},
    },
  },
  "x-wso2-auth-header": "Authorization",
  "x-wso2-cors": {
    corsConfigurationEnabled: false,
    accessControlAllowOrigins: ["*"],
    accessControlAllowCredentials: false,
    accessControlAllowHeaders: [
      "authorization",
      "Access-Control-Allow-Origin",
      "Content-Type",
      "SOAPAction",
      "apikey",
      "Internal-Key",
    ],
    accessControlAllowMethods: [
      "GET",
      "PUT",
      "POST",
      "DELETE",
      "PATCH",
      "OPTIONS",
    ],
  },
  "x-wso2-sandbox-endpoints": {
    urls: ["https://localhost:9443/am/sample/pizzashack/v1/api/"],
    type: "address",
  },
  "x-wso2-basePath": "/gum/1.01",
  "x-wso2-transports": ["http", "https"],
  "x-wso2-application-security": {
    "security-types": ["oauth2"],
    optional: false,
  },
  "x-wso2-response-cache": {
    enabled: false,
    cacheTimeoutInSeconds: 300,
  },
};

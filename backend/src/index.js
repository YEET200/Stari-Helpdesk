const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');
const searchRoutes = require('./routes/search');

const openaiRoutes = require('./routes/openai');

const usersRoutes = require('./routes/users');

const community_forum_postsRoutes = require('./routes/community_forum_posts');

const downloadsRoutes = require('./routes/downloads');

const feedback_and_surveysRoutes = require('./routes/feedback_and_surveys');

const knowledge_base_articlesRoutes = require('./routes/knowledge_base_articles');

const organizationsRoutes = require('./routes/organizations');

const support_ticketsRoutes = require('./routes/support_tickets');

const training_and_tutorialsRoutes = require('./routes/training_and_tutorials');

const rolesRoutes = require('./routes/roles');

const permissionsRoutes = require('./routes/permissions');

const settingsRoutes = require('./routes/settings');

const mailRoutes = require('./routes/mail');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Stari-Helpdesk',
      description:
        'Stari-Helpdesk Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.',
    },
    servers: [
      {
        url: config.swaggerUrl,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use(
  '/api-docs',
  function (req, res, next) {
    swaggerUI.host = req.get('host');
    next();
  },
  swaggerUI.serve,
  swaggerUI.setup(specs),
);

app.use(cors({ origin: true }));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);
app.enable('trust proxy');

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRoutes,
);

app.use(
  '/api/community_forum_posts',
  passport.authenticate('jwt', { session: false }),
  community_forum_postsRoutes,
);

app.use(
  '/api/downloads',
  passport.authenticate('jwt', { session: false }),
  downloadsRoutes,
);

app.use(
  '/api/feedback_and_surveys',
  passport.authenticate('jwt', { session: false }),
  feedback_and_surveysRoutes,
);

app.use(
  '/api/knowledge_base_articles',
  passport.authenticate('jwt', { session: false }),
  knowledge_base_articlesRoutes,
);

app.use(
  '/api/organizations',
  passport.authenticate('jwt', { session: false }),
  organizationsRoutes,
);

app.use(
  '/api/support_tickets',
  passport.authenticate('jwt', { session: false }),
  support_ticketsRoutes,
);

app.use(
  '/api/training_and_tutorials',
  passport.authenticate('jwt', { session: false }),
  training_and_tutorialsRoutes,
);

app.use(
  '/api/roles',
  passport.authenticate('jwt', { session: false }),
  rolesRoutes,
);

app.use(
  '/api/permissions',
  passport.authenticate('jwt', { session: false }),
  permissionsRoutes,
);

app.use(
  '/api/settings',
  passport.authenticate('jwt', { session: false }),
  settingsRoutes,
);

app.use(
  '/api/mail',
  passport.authenticate('jwt', { session: false }),
  mailRoutes,
);

app.use(
  '/api/openai',
  passport.authenticate('jwt', { session: false }),
  openaiRoutes,
);

app.use(
  '/api/search',
  passport.authenticate('jwt', { session: false }),
  searchRoutes,
);

const publicDir = path.join(__dirname, '../public');

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(publicDir, 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;

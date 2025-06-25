// module.exports = {
//   apps: [
//     {
//       script: './dist/api/app.bootstrap.js',
//       watch: '.',
//     },
//     {
//       script: './service-worker/',
//       watch: ['./service-worker'],
//     },
//   ],

//   deploy: {
//     production: {
//       user: 'SSH_USERNAME',
//       host: 'SSH_HOSTMACHINE',
//       ref: 'origin/master',
//       repo: 'GIT_REPOSITORY',
//       path: 'DESTINATION_PATH',
//       'pre-deploy-local': '',
//       'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
//       'pre-setup': '',
//     },
//   },
// };

module.exports = {
  apps: [
    {
      name: 'node-code',
      script: './dist/api/app.bootstrap.js', // Change this to your entry point
      instances: 'max', // Uses all available CPU cores
      exec_mode: 'cluster',
      watch: false, // Set to true if you want to auto-restart on file change
      log_date_format: 'YYYY-MM-DD HH:mm Z',

      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },

      env_production: {
        NODE_ENV: 'production',
        PORT: 8080,
      },
    },
  ],
};

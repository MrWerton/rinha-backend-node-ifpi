const path = require('path');

module.exports = {
    apps: [
        {
            name: 'rinha-back-api',
            script: path.resolve(__dirname, 'dist', 'index.js'),
            instances: 4,
            autorestart: true,
            watch: true,
            max_memory_restart: '16',
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
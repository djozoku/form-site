module.exports = {
  client: {
    service: {
      name: 'form-site',
      url: 'http://localhost:4000/graphql',
      skipSSLValidation: true
    },
    includes: ['./apps/web/src/graphql/**/*.ts'],
    excludes: ['']
  }
};

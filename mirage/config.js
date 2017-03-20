import config from '../config/environment';
import { Response } from 'ember-cli-mirage';

export default function () {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  this.urlPrefix = config.api.host;    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = config.api.namespace;    // make this `/api`, for example, if your API is namespaced
  this.timing = 100;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */

  this.post('/users');
  this.post('/users/login', function (schema, request) {
    const credentials = JSON.parse(request.requestBody);
    const user = schema.users.findBy(credentials);
    if (user) {
      return new Response(200, {
        id: 'token-id-string',
        ttl: 1209600,
        created: '2000-01-01T00:00:00.000Z',
        userId: 'user-id-string'
      });
    } else {
      return new Response(401, {
        errors: [{
          status: 401,
          source: '',
          title: 'Error',
          code: 'LOGIN_FAILED',
          detail: 'login failed'
        }]
      });
    }
  });
}

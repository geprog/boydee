import { makeAuthPlugin } from '@/lib/feathers';

export default makeAuthPlugin({
  userService: 'user',

  state: {
    accessToken: localStorage.getItem('feathers-jwt') || null,
  },
});

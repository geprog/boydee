import { makeAuthPlugin } from '@/lib/feathers';

export default makeAuthPlugin({
  userService: 'user',
});

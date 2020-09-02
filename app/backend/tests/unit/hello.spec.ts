import { createHello, Hello } from '@boydee/commons';

import app from '@/app';

describe('services/hello', () => {
  it('registered the hello-service', () => {
    const service = app.service('hello');
    expect(service).toBeDefined();
  });

  it('creates new hello message', async () => {
    const hello = createHello('Hello world!');
    const helloResult = (await app.service('hello').create(hello)) as Hello;

    expect(helloResult.message).toEqual('Hello world!');
    expect(helloResult.uuid).toEqual(hello.uuid);
  });
});

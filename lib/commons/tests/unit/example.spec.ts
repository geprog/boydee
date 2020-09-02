import { createHello, getMessage } from '@/Hello';

describe('Hello.ts', () => {
  it('returns message from create', () => {
    const hello = createHello('Hello world!');
    expect(getMessage(hello)).toBe('Hello world!');
  });

  it('generates diffrent uuids for each object', () => {
    const hello1 = createHello('Hello One');
    const hello2 = createHello('Hello Two');
    expect(hello1.uuid).not.toBe(hello2.uuid);
  });
});

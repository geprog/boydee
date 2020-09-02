import uuidv4 from 'uuid';

export interface Hello {
  message: string;
  uuid: string;
}

export const createHello = (message: string): Hello => ({
  message,
  uuid: uuidv4().toString(),
});

export const getMessage = (hello: Hello): string => hello.message;

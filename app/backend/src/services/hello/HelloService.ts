import { createHello, Hello, IHelloService } from '@boydee/commons';
import { NullableId, Paginated, Params } from '@feathersjs/feathers';

import { Application } from '@/declarations';

// eslint-disable-next-line
interface ServiceOptions {}

export class HelloService implements IHelloService {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  async find(): Promise<Hello[] | Paginated<Hello>> {
    return Promise.resolve([]);
  }

  async get(): Promise<Hello> {
    const hello = createHello('Welcome to api! Start implementing your endpoints!');
    return Promise.resolve(hello);
  }

  async create(data: Hello | Hello[], params?: Params): Promise<Hello | Hello[]> {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params) as Promise<Hello>));
    }

    return data;
  }

  async update(id: NullableId, data: Hello): Promise<Hello> {
    return Promise.resolve(data);
  }

  async patch(id: NullableId, data: Hello): Promise<Hello> {
    return Promise.resolve(data);
  }

  async remove(): Promise<Hello> {
    return Promise.resolve(createHello('test'));
  }
}

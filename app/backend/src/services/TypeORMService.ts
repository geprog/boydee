import { AdapterService, ServiceOptions } from '@feathersjs/adapter-commons';
import { BadRequest, NotFound } from '@feathersjs/errors';
import { Id, NullableId, Paginated, Params } from '@feathersjs/feathers';
import { isObject, reduce } from 'lodash';
import {
  DeepPartial,
  EntitySchema,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  FindOperator,
  getRepository,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
  ObjectType,
  Repository,
} from 'typeorm';

import Debug from '@/lib/debug';

export type TypeORMServiceOptions<T> = Partial<ServiceOptions> & { entitySchema: ObjectType<T> | EntitySchema<T> } & {
  findOptions?: FindManyOptions<T> | FindOneOptions<T>;
};
export default class TypeORMService<T> extends AdapterService<T> {
  protected readonly entitySchema: ObjectType<T> | EntitySchema<T>;
  private findOptions?: FindManyOptions<T> | FindOneOptions<T>;

  constructor(options: TypeORMServiceOptions<T>) {
    super(options);
    if (!options.entitySchema) {
      throw new Error('Missing required entity schema');
    }
    this.entitySchema = options.entitySchema;
    this.findOptions = options.findOptions;
  }

  private debug(formatter: string, ...args: unknown[]): void {
    const debug = Debug(`TypeORMService '${this.getRepository().metadata.targetName}'`);
    debug(formatter, args);
  }

  protected getRepository(): Repository<T> {
    return getRepository(this.entitySchema);
  }

  private extractOperator<Q>(key: string, value: unknown): FindOperator<Q> | null {
    if (key === '$in') {
      return In<Q>(value as FindOperator<Q> | Q[]);
    }

    if (key === '$nin') {
      return Not(In(value as FindOperator<Q> | Q[]));
    }

    if (key === '$lt') {
      return LessThan(value as FindOperator<Q> | Q);
    }

    if (key === '$lte') {
      return LessThanOrEqual(value as FindOperator<Q> | Q);
    }

    if (key === '$gt') {
      return MoreThan(value as FindOperator<Q> | Q);
    }

    if (key === '$gte') {
      return MoreThanOrEqual(value as FindOperator<Q> | Q);
    }

    if (key === '$ne') {
      return Not(value as FindOperator<Q> | Q);
    }

    if (key === '$or') {
      return value as FindOperator<Q>;
    }

    return null;
  }

  private getWhere<Q>(query: never): FindConditions<Q> {
    // TODO: support arrays and $or
    return reduce(
      query,
      (result, value, key) => {
        // deep dive into object
        if (isObject(value) && value.constructor === {}.constructor) {
          return {
            ...result,
            [key]: this.getWhere(value as never),
          };
        }

        const operator = this.extractOperator<keyof Q>((key as unknown) as string, value);
        if (operator != null) {
          return operator;
        }

        return {
          ...result,
          [key]: value,
        };
      },
      {},
    );
  }

  private getFindOptions(params?: Params): FindManyOptions<T> {
    const { filters, query } = this.filterQuery(params);
    const find: FindManyOptions<T> = {};

    if (filters.$select) {
      find.select = filters.$select;
    }

    if (filters.$sort) {
      find.order = filters.$sort;
    }

    if (filters.$limit !== undefined) {
      find.take = filters.$limit;
    }

    if (filters.$skip !== undefined) {
      find.skip = filters.$skip;
    }

    find.where = this.getWhere<T>(query as never);

    return { ...(this.findOptions as FindManyOptions<T>), ...find };
  }

  async _find(params?: Params): Promise<T[] | Paginated<T>> {
    const { filters, query, paginate } = this.filterQuery(params);
    this.debug('find', filters, query, paginate);
    const find: FindManyOptions<T> = this.getFindOptions(params);

    this.debug('find - execute query:', find);

    if (paginate) {
      if (filters.$limit === 0) {
        const total = await this.getRepository().count(find);
        return {
          total,
          limit: filters.$limit,
          skip: filters.$skip || 0,
          data: [],
        };
      }

      const [data, count] = await this.getRepository().findAndCount(find);
      if (filters.$limit !== undefined || filters.$skip !== undefined) {
        return {
          total: count,
          limit: filters.$limit,
          skip: filters.$skip || 0,
          data,
        };
      }
    }

    return this.getRepository().find(find);
  }

  async _get(id: Id): Promise<T> {
    const entity = await this.getRepository().findOne(id, this.findOptions);
    if (entity === undefined) {
      throw new NotFound(`No entity found for id '${id}'`);
    }
    return entity;
  }

  async _create(data: DeepPartial<T> | DeepPartial<T>[]): Promise<T | T[]> {
    const dataArray = Array.isArray(data) ? data : [data];
    const entities = this.getRepository().create(dataArray);
    const savedEntities = await this.getRepository().save(entities);
    return Array.isArray(data) ? savedEntities : savedEntities[0];
  }

  async _update(id: Id, data: T): Promise<T> {
    if (id !== this.getRepository().getId(data)) {
      throw new BadRequest('id does not match for the update ');
    }
    const updatedData = await this.getRepository().save(data);
    return updatedData;
  }

  async _patch(id: NullableId, data: DeepPartial<T>, params: Params): Promise<T | T[]> {
    if (id === null) {
      const entitiesToPatch = (await this._find({ ...params, paginate: false })) as T[];
      const mergedEntities = entitiesToPatch.map((e) => this.getRepository().merge(e, data));
      return this.getRepository().save(mergedEntities);
    }
    const entityToPatch = await this._get(id);
    return this.getRepository().save(this.getRepository().merge(entityToPatch, data));
  }

  async _remove(id: NullableId, params: Params): Promise<T | T[]> {
    if (id === null) {
      const entitiesToRemove = (await this._find({ ...params, paginate: false })) as T[];
      await this.getRepository().delete(entitiesToRemove.map((e) => this.getRepository().getId(e)));
      return entitiesToRemove;
    }
    const entityToRemove = await this._get(id);
    await this.getRepository().delete(id);
    return entityToRemove;
  }
}

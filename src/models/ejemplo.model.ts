import {Entity, model, property} from '@loopback/repository';

@model()
export class Ejemplo extends Entity {
  @property({
    type: 'string',
  })
  id?: string;


  constructor(data?: Partial<Ejemplo>) {
    super(data);
  }
}

export interface EjemploRelations {
  // describe navigational properties here
}

export type EjemploWithRelations = Ejemplo & EjemploRelations;

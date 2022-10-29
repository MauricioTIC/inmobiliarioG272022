import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Inmueble} from '../models/inmueble.model';
import {InmuebleRepository} from '../repositories/inmueble.repository';

@injectable({scope: BindingScope.TRANSIENT})
export class InmuebleService {
  constructor(
    //acceder a la BDs => Repositorios
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository
  ) { }

  getInmueblesDisponibles(): Promise<Inmueble[]> {
    let inmuebles = this.inmuebleRepository.find({
      //filtros
      where: {
        estado: 'A'
      }
    });
    return inmuebles;
  }

  getInmueblesPorBarrio(ubicacion: string): Promise<Inmueble[]> {
    let inmuebles = this.inmuebleRepository.find({
      //filtros  select * from inmueble where barrio = ubicacion and estado = 'A'
      where: {
        barrio: ubicacion,
        estado: 'A'
      }
    });
    return inmuebles;
  }

  getInmueblesPorBarrioConLike(ubicacion: string): Promise<Inmueble[]> {
    let inmuebles = this.inmuebleRepository.find({
      //filtros  select * from inmueble where barrio like '%ubicacion%' and estado = 'A'
      where: {
        barrio: `/.*${ubicacion}.*/i`,
        estado: 'A'
      }
    });
    return inmuebles;
  }

  getInmueblesConPrecioMayorA(valor: number): Promise<Inmueble[]> {
    let inmuebles = this.inmuebleRepository.find({
      // select * from inmueble where precio > valor and estado = 'A'
      where: {
        precio: {gt: valor},
        estado: 'A'
      }
    });
    return inmuebles;
  }

  getInmueblesConPrecionMenorOIgualA(valor: number): Promise<Inmueble[]> {
    let inmuebles = this.inmuebleRepository.find({
      // select * from inmueble where precio <= valor and estado = 'A'
      include: ['imagenes', 'propietario'],
      where: {
        precio: {lte: valor},
        estado: 'A'
      }
    });
    return inmuebles;
  }

}

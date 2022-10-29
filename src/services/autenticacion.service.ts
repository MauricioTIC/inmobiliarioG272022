import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {llaves} from '../config/llaves';
import {Propietario} from '../models/propietario.model';
import {PropietarioRepository} from '../repositories/propietario.repository';
const cryptoJS = require('crypto-js');
const generador = require('password-generator');
const jwt = require('jsonwebtoken')

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PropietarioRepository)
    public propietarioRepository: PropietarioRepository
  ) { }

  cifrarClave(clave: string): string {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  generarClave() {
    let clave = generador(8, false);
    return this.cifrarClave(clave);
  }

  //const cifrarClave2 = (clave: string) => cryptoJS.MD5(clave).toString();

  validarAcceso(usuario: string, contrasenia: string) {
    try {
      let prop = this.propietarioRepository.findOne({
        where: {
          correo: usuario,
          clave: contrasenia
        }
      });
      if (prop)
        return prop;

      return false;
    } catch (error) {
      return false;
    }
  }

  //METODO QUE GENERE UN TOKEN JWT
  generarTokenJWT(propietario: Propietario) {
    let token = jwt.sign({
      data: {
        id: propietario.id,
        correo: propietario.correo,
        nombre: `${propietario.nombres} ${propietario.apellidos}`
      }
    },
      llaves.claveJWT
    );

    return token;
  }

  validarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, llaves.claveJWT)
      return datos;
    } catch (error) {
      return false;
    }
  }
}

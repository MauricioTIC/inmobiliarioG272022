import { /* inject, */ BindingScope, injectable} from '@loopback/core';
const cryptoJS = require('crypto-js');
const generador = require('password-generator');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) { }

  cifrarClave(clave: string): string {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  generarClave() {
    let clave = generador(8, false);
    return this.cifrarClave(clave);
  }

  //const cifrarClave2 = (clave: string) => cryptoJS.MD5(clave).toString();
}

import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, RedirectRoute, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services';

export class EstrategiaAdministrador implements AuthenticationStrategy {
  name: string = 'admin';

  constructor(
    @service(AutenticacionService)
    public serviceAutenticacion: AutenticacionService
  ) { }

  async authenticate(request: Request): Promise<UserProfile | RedirectRoute | undefined> {
    // verirficar si las credenciales del usuario existen en la BDs
    let token = parseBearerToken(request);
    if (token) {
      let datos = this.serviceAutenticacion.validarTokenJWT(token);
      if (datos) {
        let perfil: UserProfile = Object.assign({
          nombre: datos.data.nombre
        });
        return perfil;
      } else {
        throw new HttpErrors[403]('No tiene permisos para hacer el llamado del servicio');
      }
    } else {
      throw new HttpErrors[401]('No se ha detectado el token')
    }
  }
}

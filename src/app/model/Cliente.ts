import { Email } from './Email';
import { Telefone } from './Telefone';
import { Endereco } from './Endereco';
export class Cliente{

    id;
    nome: string;
    cpf: string;
    endereco: Endereco;
    telefones:  Telefone[];
    emails: Email[];
   }
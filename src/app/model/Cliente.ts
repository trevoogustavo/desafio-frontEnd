import { Email } from './Email';
import { Telefone } from './Telefone';
import { Endereco } from './Endereco';
export class Cliente{

    id: number;
    nome: string;
    cpf: string;
    endereco: Endereco;
    telefones:  Telefone[];
    emails: Email[];
   }
import type { Comodo } from "./comodo";

export class Imovel {
  idImovel?: number;
  descricao: string;
  dataCompra: string;
  endereco: string;
  comodos: Comodo[];

  constructor(
    descricao: string,
    dataCompra: string,
    endereco: string,
    comodos: Comodo[],
    idImovel?: number
  ) {
    this.descricao = descricao;
    this.dataCompra = dataCompra;
    this.endereco = endereco;
    this.comodos = comodos;
    this.idImovel = idImovel;
  }
}

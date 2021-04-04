export class Counter {
  qtdPendente: string;
  qtdTotal: string;
  qtdConcluido: string;
  qtdApropriado: string;

  constructor(values = {}) {
    Object.assign(this, values);
  }
}

export class CurrencyData {
  ccy: string = '';
  base_ccy: string = '';
  buy: string = '';
  sale: string = '';
  constructor(ccy: string, base_ccy: string, buy: string, sale: string) {
    this.ccy = ccy;
    this.base_ccy = base_ccy;
    this.buy = buy;
    this.sale = sale;
  }
}

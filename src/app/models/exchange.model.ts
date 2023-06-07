export interface ExchangeModel {
  exchangeRate: number;
  fromSymbol: string;
  lastUpdatedAt: string;
  success: boolean;
  toSymbol: string;
  rateLimitExceeded?: boolean;
}

export interface LastDaysExchangeModel {
  data: [DataModel];
  from: string;
  lastUpdatedAt: string;
  success: true;
  to: string;
}

export interface DataModel {
  close: number;
  date: string;
  high: number;
  low: number;
  open: number;
}

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  DataModel,
  ExchangeModel,
  LastDaysExchangeModel,
} from 'src/app/models/exchange.model';
import { RestControllerService } from 'src/app/providers/endpoints/rest-controller.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public accordionOpened = false;
  public date = '';
  public currencyCode = '';

  public exchangeObj: ExchangeModel[] = [];
  public lastDaysExchangeObj: DataModel[] = [];

  public loading = false;

  constructor(
    private restService: RestControllerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  public getCurrentExchange(from_symbol: string, to_symbol = 'BRL') {
    this.exchangeObj = [];
    this.accordionOpened = false;

    this.loading = true;

    this.restService
      .getCurrentExchangeRate(from_symbol.toUpperCase(), to_symbol)
      .subscribe(
        (res: ExchangeModel) => {
          if (res.success) {
            this.exchangeObj.push(res);
            this.getDailyExchange(from_symbol);
          } else if (res.rateLimitExceeded) {
            this.toastr.error('A API está sobrecarregada.');
            this.loading = false;
          } else {
            this.toastr.error('Simbolo inválido.');
            this.loading = false;
          }
        },
        (error) => {
          this.toastr.error('Erro de conexão.');
          this.loading = false;
        }
      );
  }

  public getDailyExchange(from_symbol: string, to_symbol = 'BRL') {
    this.restService.getDailyExchangeRate(from_symbol, to_symbol).subscribe(
      (res: LastDaysExchangeModel) => {
        if (res.success) {
          this.lastDaysExchangeObj = res.data;

          const formatMainDate = new Date(res.lastUpdatedAt);
          formatMainDate.setHours(formatMainDate.getHours() - 3);

          this.date = formatMainDate.toISOString();

          res.data.forEach((itemdata) => {
            const formatDate = new Date(itemdata.date);
            formatDate.setHours(formatDate.getHours() - 1);
            itemdata.date = formatDate.toISOString();
          });

          res.data.sort((a, b) => (a.date > b.date ? -1 : 1));
        } else {
          this.toastr.error('Erro ao obter últimos 30 dias.');
        }

        this.loading = false;
      },
      (error) => {
        this.toastr.error('Erro de conexão.');
        this.loading = false;
      }
    );
  }

  public toggleAccordion() {
    this.accordionOpened = !this.accordionOpened;
  }
}

import { Component } from '@angular/core';
import { InvoiceService } from '../invoice/invoice.service';
import { MessageService, TreeNode } from 'primeng/api';
import { Invoice } from '../invoice/invoice.model';

interface Column {
  field: string;
  header: string;
}


@Component({
  selector: 'app-invoice2',
  templateUrl: './invoice2.component.html',
  styleUrls: ['./invoice2.component.css'],
  providers:[ MessageService,InvoiceService]
})
export class Invoice2Component {

  recordType!: string; // Main or sub
  // for dropdowns:
  countries: any[] | undefined;
  selectedCountry: string | undefined;
  //
  public rowIndex = 0;
  // invoices!: Invoice[];
  invoices!:TreeNode[]
  expandedRows = {};
  cols!: Column[];
  selectionKeys = {};
  constructor(private _InvoiceService: InvoiceService, private messageService: MessageService) { }

  ngOnInit() {

    // this._InvoiceService.getMainItemsWithSubItems().then((data ) => (

    //   this.invoices = data as TreeNode[]
    // ));
    this.invoices = this._InvoiceService.getMainItemsWithSubItemsDataTree();
    console.log(this.invoices);

    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
    ];

    this.cols = [
      { field: 'serviceNumber', header: 'ServiceNumber' },
      { field: 'description', header: 'Description' },
      { field: 'quantity', header: 'Quantity' },
       { field: 'uom', header: 'UOM' },
      { field: 'formula', header: 'Formula' },
      { field: 'amountPerUnit', header: 'AmountPerUnit'},
      { field: 'currency', header: 'Currency' },
      { field: 'total', header: 'Total' },
      { field: 'profitMargin', header: 'ProfitMargin' },
      { field: 'totalWithProfit', header: 'TotalWithProfit' }
  
    ];
    this.selectionKeys = {
      '0-0': {
          partialChecked: false,
          checked: true
      }
  };
  }

  expandAll() {
    //this.expandedRows = this.products.reduce((acc, p) => (acc[p.id] = true) && acc, {});
  }

  delete() {
    console.log("delete");

  }

  collapseAll() {
    this.expandedRows = {};
  }
 
}

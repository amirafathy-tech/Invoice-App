import { Component } from '@angular/core';
import * as FileSaver from 'file-saver';

import { MessageService } from 'primeng/api';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice.model';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  providers: [MessageService, InvoiceService]
})
export class InvoiceComponent {

  recordType!: string; // Main or sub

  // for dropdowns:
  countries: any[] | undefined;
  selectedCountry: string | undefined;

  //

  public rowIndex = 0;

  invoices!: Invoice[];
  expandedRows = {};


  constructor(private _InvoiceService: InvoiceService, private messageService: MessageService) { }

  ngOnInit() {

    this._InvoiceService.getMainItemsWithSubItems().then((data) => (this.invoices = data));

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

  // onRowExpand(event: TableRowExpandEvent) {
  //   this.messageService.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
  // }

  // onRowCollapse(event: TableRowCollapseEvent) {
  //   this.messageService.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
  // }

  


  // to handel checkbox selection:
  selectedRecord: Invoice | null = null;
  selectedRecords: any[] = [];
  // onRecordSelectionChange(event: any, record: any) {
  //   if (event.checked) {
  //     this.selectedRecord = record
  //     console.log(record);

  //     // Add the record to the selectedRecords array if it's not already present
  //     if (!this.selectedRecords.includes(record)) {
  //       this.selectedRecords.push(record);
  //     }
  //   } else {
  //     // Remove the record from the selectedRecords array
  //     const index = this.selectedRecords.indexOf(record);
  //     if (index !== -1) {
  //       this.selectedRecords.splice(index, 1);
  //     }
  //   }
  // }

  // selection only work :
  // onRecordSelectionChange(event: any, record: Invoice) {
  //   record.selected = event.checked;
  //   console.log(record.selected);

  //   if (record.selected) {
  //     // User selected the record, now we need to select all associated orders
  //     if (record.subItems && record.subItems.length > 0) {
  //       console.log(record.subItems);

  //       // Iterate over orders and mark them as selected
  //       // record.subItems.forEach((subItem: { selected: boolean; }) => {
  //       //   subItem.selected = true; // Assuming each order object has a 'selected' property
  //       // });

  //         record.subItems.forEach(subItem  => subItem.selected = event.checked);
  //       console.log(record.subItems);
  //     }
  //   } 
  //   else {
  //     // User deselected the record, so we need to deselect all associated orders
  //     if (record.subItems && record.subItems.length > 0) {
  //       record.subItems.forEach((subItem: { selected: boolean; }) => {
  //         subItem.selected = false; // Deselect the order
  //       });
  //       console.log(record.subItems);
  //     }
  //   }
  // }


  onRecordSelectionChange(event: any, mainItem: Invoice) {
    console.log(mainItem);
    console.log(event.checked);
    mainItem.selected = event.checked;
    console.log(mainItem.selected); 
  
    if (mainItem.selected) {
      // User selected the record, now we need to select all associated orders
      if (mainItem.subItems && mainItem.subItems.length > 0) {
        console.log(mainItem.subItems);

        // Iterate over orders and mark them as selected
        // record.subItems.forEach((subItem: { selected: boolean; }) => {
        //   subItem.selected = true; // Assuming each order object has a 'selected' property
        // });
//
        mainItem.subItems.forEach(subItem => subItem.selected = !subItem.selected);
        console.log(mainItem.subItems);
      }
    }
    else {
      // User deselected the record, so we need to deselect all associated orders
      if (mainItem.subItems && mainItem.subItems.length > 0) {
        mainItem.subItems.forEach(subItem => subItem.selected = false)
        console.log(mainItem.subItems);
      }
    }
    //mainItem.subItems.forEach(subItem => subItem.selected = event.checked);
  }


  // onRecordSelectionChange(event: any, record: Invoice) {
  //   // Check if the event.checked is an array
  //   if (Array.isArray(event.checked)) {
  //     console.log(record);
  //     console.log(event.checked);
      
  //     // User selected or deselected the record, now we need to update the selection state of the main item and its sub-items
  //     record.selected = event.checked.includes(record);
  //     console.log(record.selected);
      
  
  //     if (record.subItems && record.subItems.length > 0) {
  //       record.subItems.forEach(subItem => subItem.selected = event.checked.includes(subItem.id));
  //       console.log(record.subItems);
  //     }
  //   }
  // }







  showAddProductDialogFlag: boolean = false;
  newProduct = { id: 0, name: '', orders: [] };
  newProductOrders: number = 0;

  showAddProductDialog() {
    this.showAddProductDialogFlag = true;
  }

  hideAddProductDialog() {
    this.showAddProductDialogFlag = false;
  }

  addNewProduct() {
    // Create a new product with the provided details
    const newProduct = {
      id: (this.invoices.length + 1),
      name: this.newProduct.name,
      orders: Array.from({ length: this.newProductOrders }, (_, i) => ({
        id: i + 1,
        customer: `Customer ${i + 1}`,
        date: '2023-06-09',
        amount: Math.floor(Math.random() * 1000),
        status: ['Pending', 'Delivered', 'Cancelled'][Math.floor(Math.random() * 3)]
      }))
    };

    // Add the new product to the products array
    this.invoices.push(newProduct);

    // Expand the newly added product row
    //this.expandedRows[(newProduct.id).toString()] = true;

    // Reset the dialog form
    this.newProduct = { id: 0, name: '', orders: [] };
    this.newProductOrders = 0;
    this.showAddProductDialogFlag = false;
  }


  addRow() {

    const newProduct = {
      id: (this.invoices.length + 1),
      name: this.newProduct.name,
      orders: Array.from({ length: this.newProductOrders }
        //   , (_, i) => ({
        //     id: i + 1,
        //     customer: `Customer ${i + 1}`,
        //     date: '2023-06-09',
        //     amount: Math.floor(Math.random() * 1000),
        //     status: ['Pending', 'Delivered', 'Cancelled'][Math.floor(Math.random() * 3)]
        // })
      )
    };
    console.log(newProduct.orders.length);


    // Add the new product to the products array
    this.invoices.push(newProduct);
    console.log(this.invoices);


    // Expand the newly added product row
    //this.expandedRows[(newProduct.id).toString()] = true;

    // Reset the dialog form
    this.newProduct = { id: 0, name: '', orders: [] };
    this.newProductOrders = 0;

  }


  // Export  to Excel Sheet
  exportExcel() {
    import('xlsx').then((xlsx) => {
      const selectedRows = this.invoices;
      const worksheet = xlsx.utils.json_to_sheet(selectedRows);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'invoice');
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }



















  // handle Formula Parameters 
  showPopup: boolean = false;
  parameterValues: { [key: string]: number } = {};
  showPopupUpdate: boolean = false;
  parameterValuesUpdate: { [key: string]: number } = {};
  openPopup() {
    if (this.selectedCountry) {
      this.showPopup = true;
      //  for (const parameterId of this.selectedFormulaRecord.parameterIds) {
      //    this.parameterValues[parameterId] = 0;
      //    console.log(this.parameterValues);
      //  }
    }
    else {
      this.showPopup = false;
    }
  }
  //  openPopupUpdate() {
  //    if (this.updatedFormulaRecord) {
  //      this.showPopupUpdate = true;
  //      console.log(this.showPopupUpdate);

  //      for (const parameterId of this.updatedFormulaRecord.parameterIds) {
  //        this.parameterValuesUpdate[parameterId] = 0;
  //        console.log(this.parameterValuesUpdate);
  //      }
  //    }
  //    else {
  //      this.showPopupUpdate = false;
  //    }
  //  }
  resultAfterTest!: number
  resultAfterTestUpdate!: number
  saveParameters() {
    if (this.selectedCountry) {
      console.log(this.parameterValues);
      const valuesOnly = Object.values(this.parameterValues)
        .filter(value => typeof value === 'number') as number[];
      console.log(valuesOnly);
      console.log(this.resultAfterTest);

      //  const formulaObject: any = {
      //    formula: this.selectedFormulaRecord.formula,
      //    description: this.selectedFormulaRecord.description,
      //    numberOfParameters: this.selectedFormulaRecord.numberOfParameters,
      //    parameterIds: this.selectedFormulaRecord.parameterIds,
      //    parameterDescriptions: this.selectedFormulaRecord.parameterDescriptions,
      //    formulaLogic: this.selectedFormulaRecord.formulaLogic,
      //    testParameters: valuesOnly
      //  };
      //  console.log(formulaObject);
      //  this.apiService.put<any>('formulas', this.selectedFormulaRecord.formulaCode, formulaObject).subscribe((response: Formula) => {
      //    console.log('formula updated:', response);
      //    this.resultAfterTest = response.result;
      //    console.log(this.resultAfterTest);
      //  });
      this.showPopup = false;
    }
    //  if (this.updatedFormulaRecord) {
    //    console.log(this.parameterValuesUpdate);
    //    const valuesOnly = Object.values(this.parameterValuesUpdate)
    //      .filter(value => typeof value === 'number') as number[];
    //    console.log(valuesOnly);
    //    console.log(this.resultAfterTestUpdate);
    //    const formulaObject: any = {
    //      formula: this.updatedFormulaRecord.formula,
    //      description: this.updatedFormulaRecord.description,
    //      numberOfParameters: this.updatedFormulaRecord.numberOfParameters,
    //      parameterIds: this.updatedFormulaRecord.parameterIds,
    //      parameterDescriptions: this.updatedFormulaRecord.parameterDescriptions,
    //      formulaLogic: this.updatedFormulaRecord.formulaLogic,
    //      testParameters: valuesOnly
    //    };
    //    console.log(formulaObject);
    //    this.apiService.put<any>('formulas', this.updatedFormulaRecord.formulaCode, formulaObject).subscribe((response: Formula) => {
    //      console.log('formula updated:', response);
    //      this.resultAfterTestUpdate = response.result;
    //      console.log(this.resultAfterTestUpdate);

    //    });
    //    this.showPopupUpdate = false;
    //  }

  }

}

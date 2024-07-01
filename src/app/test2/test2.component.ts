import { Component, Input } from '@angular/core';
import { Bike } from './invoice.model';
import { BikeService } from './invoice.service';
import { MessageService } from 'primeng/api';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { ProductService } from './product.service';
import { Product } from './product.model';
@Component({
  selector: 'app-test2',
   templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css'],
  providers: [BikeService,MessageService,ProductService],
})
export class Test2Component {
  products!: Product[];
  expandedRows = {};
  
  bikes!: Bike[];
  constructor(private bikeService: BikeService,private productService: ProductService, private messageService: MessageService) {}
  ngOnInit() {
    // this.bikeService.getBikes().subscribe((d) => {
    //   this.bikes = d.data;
    // });
    this.productService.getProductsWithOrdersSmall().then((data) => (this.products = data));
  }

  expandAll() {
   // this.expandedRows = this.products.reduce((acc, p) => (acc[p.id] = true) && acc, {});
}

collapseAll() {
    this.expandedRows = {};
}

onRowExpand(event: TableRowExpandEvent) {
  this.messageService.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
}

onRowCollapse(event: TableRowCollapseEvent) {
  this.messageService.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
}

showAddProductDialogFlag: boolean = false;
newProduct= { id: '', name: '', orders: [] };
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
      id: (this.products.length + 1).toString(),
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
  this.products.push(newProduct);

  // Expand the newly added product row
  //this.expandedRows[(newProduct.id).toString()] = true;

  // Reset the dialog form
  this.newProduct = { id: '', name: '', orders: [] };
  this.newProductOrders = 0;
  this.showAddProductDialogFlag = false;
}


addRow(){

  const newProduct = {
    id: (this.products.length + 1).toString(),
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
this.products.push(newProduct);
console.log(this.products);


// Expand the newly added product row
//this.expandedRows[(newProduct.id).toString()] = true;

// Reset the dialog form
this.newProduct = { id: '', name: '', orders: [] };
this.newProductOrders = 0;

}





  // tableData = [
  //   { name: 'Root 1', value: 100, children: [
  //     { name: 'Child 1', value: 50, children: [
  //       { name: 'Grandchild 1', value: 20 },
  //       { name: 'Grandchild 2', value: 30 }
  //     ]},
  //     { name: 'Child 2', value: 30 }
  //   ]},
  //   { name: 'Root 2', value: 200, children: [
  //     { name: 'Child 3', value: 100 },
  //     { name: 'Child 4', value: 100 }
  //   ]}
  // ];

  // @Input() data: any[] | undefined;
  // @Input() level: number = 0;

  // expandedRows: any[] = [];

  // toggleExpand(row: any) {
  //   row.expanded = !row.expanded;
  //   if (row.expanded) {
  //     this.expandedRows.push(row);
  //   } else {
  //     this.expandedRows = this.expandedRows.filter(r => r !== row);
  //   }
  // }
}

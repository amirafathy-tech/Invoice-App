import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { Test2Component } from './test2/test2.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { Invoice2Component } from './invoice2/invoice2.component';
import { InvoiceTestComponent } from './invoice-test/invoice-test.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'test', component: TestComponent },
  { path: 'test2', component: Test2Component },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'invoice2', component: Invoice2Component },
  
  { path: 'invoiceTest', component: InvoiceTestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

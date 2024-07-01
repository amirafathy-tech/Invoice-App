import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { TreeTableModule } from 'primeng/treetable';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TestComponent } from './test/test.component';
import { Test2Component } from './test2/test2.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { Invoice2Component } from './invoice2/invoice2.component';
import { InvoiceTestComponent } from './invoice-test/invoice-test.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Test2Component,
    InvoiceComponent,
    Invoice2Component,
    InvoiceTestComponent,
   // TestComponent
  ],
  imports: [
    FundamentalNgxCoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,

     TreeTableModule,
    ToastModule,
    TableModule,
    ButtonModule,
    DialogModule,
    CheckboxModule,
    DropdownModule,
    ToolbarModule,
    InputTextModule,
    RadioButtonModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

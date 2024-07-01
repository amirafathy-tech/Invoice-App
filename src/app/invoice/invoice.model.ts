
export class SubItem {
    id?: number;
    mainCode?: string;
    serviceNumber?: string;
    description?: string;
    quantity?: number;
    uom?:string;
    formula?:string;
    amountPerUnit?: number;
    currency?: string;
    total?: number;
    selected?: boolean;

   
}

export class Invoice {
    id: number=0;
    code?: string;
    serviceNumber?: string;
    description?: string;
    quantity?: number;
    uom?:string;
    formula?:string;
    amountPerUnit?: number;
    currency?: string;
    total?: number;
    profitMargin?: number;
    totalWithProfit?: number;
    selected?: boolean;
    subItems?:SubItem[]
}
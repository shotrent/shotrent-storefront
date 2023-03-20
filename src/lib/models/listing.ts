export enum DurationType {
    MONTHLY = "monthly",
    DAILY = "daily",
}

export enum ListingStatus {
    DRAFT = "draft",
    INREVIEW = "in_review",
    PUBLISHED = "published",
}

export class CreateListing {
    title: string = '';
    product_link: string | null = '';
    inventory_quantity: number = 0;
    purchase_price: number = 0;
    variants: CreateListingVariant[] = [];
    duration_type: DurationType = DurationType.MONTHLY;
}

export class Listing {
    id: string = '';
    title: string = '';
    product_link: string | null = '';
    inventory_quantity: number = 0;
    purchase_price: number = 0;
    variants: ListingVariant[] = [];
    duration_type: DurationType = DurationType.MONTHLY;
    created_at:string = '';
    status:ListingStatus = ListingStatus.INREVIEW;
}

export class ListingVariant {
    id?: number;
    name: string='';
    price: number= 0;
    listing_price: number= 0;
    earning_price: number= 0;
    tax_rate: number= 0;
    commission_rate: number= 0;
}

export type Plan = {
    type: DurationType,
    name:string,
    variants: ListingPirceBreakout[]
}

export class CreateListingVariant {    
    name: string = '';
    price: number= 0;
    listing_price: number= 0;
    earning_price: number= 0;
    tax_rate: number= 0;
    commission_rate: number= 0;
}

type ListingPirceBreakoutOptions = {
    name: string;
    purchase_price: number;
    interest_rate: number;
    buyout_period: number;
    tax_rate: number;
    commission_rate: number;
    depreciation_rate: number;
};

export class ListingPirceBreakout
{
    private _purchase_price: number;    
    private _buyout_period: number;
    private _interest_rate: number;
    private _tax_rate: number;
    private _commission_rate: number;
    private _depreciation_rate: number;
    public name: any;
    

    constructor(props:ListingPirceBreakoutOptions) {
        this.name = props.name;
        this._purchase_price = props.purchase_price;
        this._interest_rate = props.interest_rate;
        this._buyout_period = props.buyout_period;
        this._tax_rate = props.tax_rate;
        this._commission_rate = props.commission_rate;
        this._depreciation_rate = props.depreciation_rate;
    }

    public get purchase_price(): number {
        return this._purchase_price;
    }

    public get buyout_period(): number {
        return this._buyout_period;
    }

    public get interest_rate(): number {
        return this._interest_rate;
    }

    public get tax_rate(): number {
        return this._tax_rate;
    }

    public get commission_rate(): number {
        return this._commission_rate;
    }

    public get depreciation_rate(): number {
        return this._depreciation_rate;
    }

    public set depreciation_rate(value: number) {
        this._depreciation_rate = value;
    }
    
    public get interest_rate_for_buyout_period() : number {
        return (this.interest_rate/12) * this.buyout_period;
    }
    
    public get earning_price() : number { 
        return Math.ceil((this.purchase_price + (this.purchase_price*this.interest_rate_for_buyout_period))/this.buyout_period) 
    }

    
    public get commission_amount() : number {
        return  Math.ceil(this.earning_price * this.commission_rate);
    }

    public get listing_price() : number {
        return this.earning_price + this.commission_amount;
    }

    public get tax_amount() : number {
        return Math.ceil(this.listing_price * this.tax_rate)
    }

    public get price():number{
        return this.listing_price + this.tax_amount;
    }

    public get depreciation_amount(): number {
        return Math.ceil((this.purchase_price * this.depreciation_rate) / 12);
    }

    public get income_after_depreciation(): number {
        return this.earning_price - this.depreciation_amount;
    }

    public get payback_time(): number {
        return Math.ceil(this.purchase_price / this.earning_price);
    }

    public get net_income_rate(): number {
        return this.income_after_depreciation / this.earning_price;
    }
}
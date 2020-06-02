import {Component, OnInit} from '@angular/core'
import {IProduct} from './product'
import { ProductService } from './product.service';

@Component({
    // selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
    pageTitle :string = "Product List from Component";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    // listFilter: string = "Cart";
    filteredProducts : IProduct[];
    _listFtilter : string;
    get listFilter() : string {
        return this._listFtilter;
    }
    set listFilter(value:string) {
        this._listFtilter = value;
        this.filteredProducts = this.listFilter? this.performFilter(this.listFilter): this.products;
    }
    errorMessage : string;
    
    constructor(private productService:ProductService) {
       
    }
    products : IProduct[] = [];
    toggleImage() : void {
        this.showImage = !this.showImage;
    }

    ngOnInit() : void {
        this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;},
            error: err => this.errorMessage = err
        });
        
    }

    performFilter (filterBy:string):IProduct[]{
        filterBy = filterBy.toLowerCase();
        return this.products.filter((product: IProduct) =>
        product.productName.toLowerCase().indexOf(filterBy) !== -1);
    }

    onRatingClicked(message: string): void {
        this.pageTitle  = message;
    }
}
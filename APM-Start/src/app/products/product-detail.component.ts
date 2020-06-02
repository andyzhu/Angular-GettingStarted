import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  // selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle :string = "Product Detail Component"
  product: IProduct;
  constructor(private route:ActivatedRoute,
              private router: Router,
              private productService: ProductService) { }
  errorMessage :string;

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;

    this.productService.getProductById(id).subscribe({
      next: product => {
          this.product = product;
          },
      error: err => this.errorMessage = err
  });
    // this.product = {
    //   "productId": 1,
    //   "productName": "Leaf Rake",
    //   "productCode": "GDN-0011",
    //   "releaseDate": "March 19, 2019",
    //   "description": "Leaf rake with 48-inch wooden handle.",
    //   "price": 19.95,
    //   "starRating": 3.2,
    //   "imageUrl": "assets/images/leaf_rake.png"
    // };
    // console.log(`Inside ngOninit: ${this.product}`);
  }

  onBack(): void{
    this.router.navigate(['/products']);
  }

 

}

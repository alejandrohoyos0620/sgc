import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '@core/models/product.model';
import { switchMap, } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductService } from '@core/services/products/product.service';
//import { ProductsService } from '@core/services/products/products.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private ProductService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.ProductService.getProduct(params.id).subscribe((response) => {
        if (response.status == "success")
          this.product = response.product;
        console.log(response);
      });
    });

    // this.product$ 
    //   .pipe(
    //     switchMap((params: Params) => {
    //       return this.ProductService.getProduct(params.id);
    //     })
    //   );
  }

}

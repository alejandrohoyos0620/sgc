import { Component, OnInit } from '@angular/core';
import {Product} from '@core/models/product.model';
import { EstablishmentService } from '@core/services/establishments/establishment.service';
import { ProductService } from '@core/services/products/product.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.container.html',
  styleUrls: ['./products.container.scss']
})
export class ProductsContainer implements OnInit {
  products: Product[] = [];
  establishmentId: number;
  numberOfPages: number;
  currentPage = 1;
  pages = [];
  numbers = [];
  constructor(
    private productsService: ProductService,
    private establishmentService: EstablishmentService,
  ) { }

  ngOnInit(): void {
    this.establishmentId = this.establishmentService.getEstablishmentId();
    this.fetchProducts();
  }

  clickProduct(id: number): void{
    console.log('product');
    console.log(id);
  }

  fetchProducts(): void{
    this.productsService.getAllProductsByCatalog(this.establishmentId, '0').subscribe(response =>
      {
        if(response.status == "success"){
          this.numberOfPages = response.products.numberOfPages;
          for(let i = 1; i<=this.numberOfPages; i++){
            this.numbers.push(i);
          }
          console.log(this.numbers);
          this.products = response.products.products;
        } 
    });
  }
  previos(){

  }
  next(){

  }
  getPage(page) {
    if (page != this.currentPage) {
      //this.getRequests(page);
      let pageString = page+"";
      this.productsService.getAllProductsByCatalog(this.establishmentId, pageString).subscribe(response =>
        {
          if(response.status == "success"){
            this.products = response.products.products;
            this.currentPage = page;
          } 
      });
    }
  }


}

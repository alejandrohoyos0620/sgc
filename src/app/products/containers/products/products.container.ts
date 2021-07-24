import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Category } from '@core/models/category.model';
import { Product } from '@core/models/product.model';
import { CategoryService } from '@core/services/categories/category.service';
import { EstablishmentService } from '@core/services/establishments/establishment.service';
import { ProductService } from '@core/services/products/product.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
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
  categories: Category[];
  pages = [];
  numbers = [];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(
    private productsService: ProductService,
    private establishmentService: EstablishmentService,
    private breakpointObserver: BreakpointObserver,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.establishmentId = this.establishmentService.getEstablishmentId();
    this.fetchProducts();
    this.fetchCategories();
  }

  clickProduct(id: number): void {
    console.log('product');
    console.log(id);
  }

  fetchProducts(): void {
    this.productsService.getAllProductsByCatalog(this.establishmentId, '0').subscribe(response => {
      if (response.status == "success") {
        this.numberOfPages = response.products.numberOfPages;
        for (let i = 1; i <= this.numberOfPages; i++) {
          this.numbers.push(i);
        }
        console.log(this.numbers);
        this.products = response.products.products;
      }
    });
  }
  fetchCategories(): void {
    this.categoryService.getAllCategories(this.establishmentId).subscribe(categories => {
      this.categories = categories;
    }
    );
  }
  getAllProducts(){
    this.productsService.getAllProductsByCatalog(this.establishmentId, '0').subscribe(response => {
      if (response.status == "success") {
        this.products = response.products.products;
      }
    });
  }
  getProductsByCategory(idCategory: number) {
    let id = idCategory + "";
    this.productsService.getAllProductsByCategory(idCategory).subscribe(response => {
      if(response.status == "success"){}
        this.products = response.products;
    }
    );
  }
  previos() {

  }
  next() {

  }
  getPage(page) {
    if (page != this.currentPage) {
      //this.getRequests(page);
      let pageString = page + "";
      this.productsService.getAllProductsByCatalog(this.establishmentId, pageString).subscribe(response => {
        if (response.status == "success") {
          this.products = response.products.products;
          this.currentPage = page;
        }
      });
    }
  }


}

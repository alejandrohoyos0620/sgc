import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { Product } from '@core/models/product.model';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();
  today = new Date();
  constructor() { }

  ngOnInit(): void {
  }
  addCart(): void {
    console.log('añadir al carrito');
  // this.productClicked.emit(this.product.id);
    //this.cartService.addCart(this.product);
  }

}

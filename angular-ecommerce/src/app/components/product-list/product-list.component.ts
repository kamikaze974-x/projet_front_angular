import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProdutcs();
    });

  }

  listProdutcs() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode)
      this.handleSearchProducts();
    else
      this.handleListProducts();
  }


  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // now search for the produts using pkeyword
    this.productService.searchProducts(theKeyword).subscribe(
      data =>
        this.products = data
    );
  }

  handleListProducts() {

    //check if if "id" parameter is avaliable
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //get the id param string . convert to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }

    else {
      //not category id avalaible ... default to category id 1
      this.currentCategoryId = 1;
    }

    //now get the products foor the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }
}





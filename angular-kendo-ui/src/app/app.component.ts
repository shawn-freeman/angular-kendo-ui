import { Component } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { DataResult, SortDescriptor } from '@progress/kendo-data-query';
import { Observable, of } from 'rxjs';
import { categories } from './data/data.categories';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService]
})
export class AppComponent {
  title = 'angular-kendo-ui';

  //grid demo properties
  public gridItems: Observable<GridDataResult> ;
  public pageSize: number = 10;
  public skip: number = 0;
  public sortDescriptor: SortDescriptor[] = [];
  public filterTerm: number = 0;

  //dropdown demo properties
  public dropDownItems = categories;
  public defaultItem = { text: "Filter by Category", value: null as any };

  constructor(private service: ProductService){
    this.loadGridItems();
  }

  public pageChange(event: PageChangeEvent){
    this.skip = event.skip;
    this.loadGridItems();
  }

  public handleSortChange(descriptor: SortDescriptor[]){
    this.sortDescriptor = descriptor;
    this.loadGridItems();
  }

  private loadGridItems():void{
    this.gridItems = this.service.getProducts(
      this.skip,
      this.pageSize,
      this.sortDescriptor,
      this.filterTerm
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataResult, orderBy, process, SortDescriptor } from '@progress/kendo-data-query';
import { Observable, of } from 'rxjs';
import { products } from './data.products';

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) { }
    
    public getExampleApiResult(
        skip: number,
        pageSize: number,
        sortDescriptor: SortDescriptor[],
        filterTerm: number | null
    ): Observable<DataResult> {
        console.log('Getting weather data...');
        let data;

        data = this.http.get<DataResult>('http://localhost:5211/WeatherForecast', 
            { 
                observe: 'body', 
                responseType: 'json'
            }
        );

        return data;
    }

    public getProducts(
        skip: number,
        pageSize: number,
        sortDescriptor: SortDescriptor[],
        filterTerm: number | null
    ): Observable<DataResult> {
        let data;
        if (filterTerm) {
            data = process(orderBy(products, sortDescriptor), {
                filter: {
                    logic: 'and',
                    filters: [
                        {
                            field: 'CategoryID',
                            operator: 'eq',
                            value: filterTerm
                        }
                    ]
                }
            }).data;
        } else {
            data = orderBy(products, sortDescriptor);
        }
        return of({
            data: data.slice(skip, skip + pageSize),
            total: data.length
        });
    }
}
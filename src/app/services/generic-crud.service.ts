import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class GenericCrud<T> {
    baseUrl: string = '';

    constructor(protected http: HttpClient, baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    getAll(): Observable<any> {
        return this.http.get(`${this.baseUrl}`);
    }

    create(data: T): Observable<any> {
        return this.http.post(`${this.baseUrl}`, data);
    }

    update(id: any, data: T): Observable<any> {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

    setDelete(id: any): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}
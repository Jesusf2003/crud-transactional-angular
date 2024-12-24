import { HttpClient } from "@angular/common/http";
import { environment } from "../../environment/environment";
import { GenericCrudService } from "./generic-crud.service";
import { TbCarrera } from "./model/carrera.model";
import { Injectable } from "@angular/core";

const baseUrl = `${environment.baseUrl}/carrera`;

@Injectable({
    providedIn: 'root'
})
export class CarreraService extends GenericCrudService<TbCarrera> {

    constructor(protected override http: HttpClient) {
        super(http, baseUrl);
    }
}
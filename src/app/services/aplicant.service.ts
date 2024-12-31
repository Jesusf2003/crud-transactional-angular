import { HttpClient } from "@angular/common/http";
import { GenericCrud } from "./generic-crud.service";
import { TbAplicant } from "./model/aplicant.model";
import { environment } from "../../environment/environment";
import { Injectable } from "@angular/core";

const baseUrl = `${environment.baseUrl}/aplicant`;

@Injectable({ providedIn: 'root' })
export class AplicantService extends GenericCrud<TbAplicant> {

    constructor(protected override http: HttpClient) {
        super(http, baseUrl)
    }
}
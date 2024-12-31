import { Injectable } from "@angular/core";
import { environment } from "../../environment/environment";
import { GenericCrud } from "./generic-crud.service";
import { TbAdviser } from "./model/adviser.model";
import { HttpClient } from "@angular/common/http";

const baseUrl = `${environment.baseUrl}/adviser`;

@Injectable({ providedIn: 'root' })
export class AdviserService extends GenericCrud<TbAdviser> {

    constructor(protected override http: HttpClient) {
        super(http, baseUrl)
    }
}
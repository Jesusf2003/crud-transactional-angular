import { Injectable } from "@angular/core";
import { environment } from "../../environment/environment";
import { GenericCrud } from "./generic-crud.service";
import { TbConsultation } from "./model/consultation.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const baseUrl = `${environment.baseUrl}/consultation`;

@Injectable({ providedIn: 'root' })
export class ConsultationService extends GenericCrud<TbConsultation> {

    constructor(protected override http: HttpClient) {
        super(http, baseUrl);
    }
}
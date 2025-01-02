import { HttpClient } from "@angular/common/http";
import { GenericCrud } from "./generic-crud.service";
import { TbApplicant } from "./model/applicant.model";
import { environment } from "../../environment/environment";
import { Injectable } from "@angular/core";

const baseUrl = `${environment.baseUrl}/applicant`;

@Injectable({ providedIn: 'root' })
export class ApplicantService extends GenericCrud<TbApplicant> {

    constructor(protected override http: HttpClient) {
        super(http, baseUrl)
    }
}
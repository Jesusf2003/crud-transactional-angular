import { TbAdviser } from "./adviser.model";
import { TbApplicant } from "./applicant.model";
import { TbCarrera } from "./carrera.model";

export interface TbConsultation {
    id: number | null;
    queryDate: Date | null;
    applicant: TbApplicant | null;
    career: TbCarrera | null;
    query: string | null;
    adviser: TbAdviser | null;
    answer: string | null;
    state: string | null;
}
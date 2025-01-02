import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TbConsultation } from "../../../services/model/consultation.model";
import { ConsultationService } from "../../../services/consultation.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CarreraService } from "../../../services/carrera.service";
import { TbCarrera } from "../../../services/model/carrera.model";
import { ApplicantService } from "../../../services/applicant.service";
import { AdviserService } from "../../../services/adviser.service";

@Component({
    selector: 'app-consultation-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './consultation-form.component.html',
    styleUrls: ['./consultation-form.component.css']
})
export class ConsultationFormComponent implements OnInit {

    fConsultation!: FormGroup;
    mConsultation!: TbConsultation;
    optCarrera!: any;
    optApplicant!: any;
    optAdviser!: any;
    isEditable: boolean = false;
    @Input() data: any;

    constructor(
        private fb: FormBuilder,
        public sConsultation: ConsultationService,
        public sCarrera: CarreraService,
        public sApplicant: ApplicantService,
        public sAdviser: AdviserService,
        public msActive: NgbActiveModal
    ) {
        this.sApplicant.getAll().subscribe((res) => { this.optApplicant = res; });
        this.sAdviser.getAll().subscribe((res) => { this.optAdviser = res; });
        this.sCarrera.getAll().subscribe((res) => { this.optCarrera = res; });
    }

    ngOnInit(): void {
        this.fConsultation = this.fb.group({
            queryDate: [this.formatDate(new Date()), [Validators.required]],
            applicant: ['', [Validators.required]],
            career: ['', [Validators.required]],
            query: ['', [Validators.required]],
            adviser: ['', [Validators.required]],
            answer: ['', [Validators.required]],
        });
        this.isEditable = this.data?.isEditable || false;
        if (this.isEditable === true) {
            this.fConsultation.patchValue({
                queryDate: this.data.obj.queryDate,
                applicant: this.data.obj.applicant?.id,
                career: this.data.obj.career?.identificador,
                query: this.data.obj.query,
                adviser: this.data.obj.adviser?.id,
                answer: this.data.obj.answer,
                state: this.data.obj.state
            });
        }
    }

    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes comienza desde 0
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    submitFunction(): void {
        if (this.isEditable === true) {
            this.update();
        } else {
            this.save();
        }
    }

    save(): void {
        this.mConsultation = {
            ...this.fConsultation.value,
            applicant: { id: this.fConsultation.value.applicant },
            career: { identificador: this.fConsultation.value.career },
            adviser: { id: this.fConsultation.value.adviser },
        };
        console.log(this.mConsultation)
        this.sConsultation.create(this.mConsultation).subscribe((res) => {
            console.log(res);
            this.msActive.close();
        })
    }

    update(): void {
        this.mConsultation = { ...this.fConsultation.value };
        console.log(this.mConsultation)
    }
}
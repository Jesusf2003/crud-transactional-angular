import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TbApplicant } from "../../../services/model/applicant.model";
import { ApplicantService } from "../../../services/applicant.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-applicant-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './applicant-form.component.html',
    styleUrls: ['./applicant-form.component.css']
})
export class ApplicantFormComponent implements OnInit {

    fApplicant!: FormGroup;
    mApplicant!: TbApplicant;
    isEditable: boolean = false;
    @Input() data: any;

    constructor(
        private fb: FormBuilder,
        public sApplicant: ApplicantService,
        public msActive: NgbActiveModal
    ) { }

    ngOnInit(): void {
        this.fApplicant = this.fb.group({
            names: ['', [Validators.required]],
            surnames: ['', [Validators.required]],
            sex: ['', [Validators.required]],
            identificationDocument: ['', [Validators.required, Validators.minLength(3)]],
            documentNumber: ['', [Validators.required, Validators.minLength(8)]],
            email: ['', [Validators.required, Validators.email]],
            cellphone: ['', [Validators.required]]
        });
        
        this.isEditable = this.data?.isEditable || false;
        if (this.isEditable === true) {
            this.fApplicant.patchValue({
                names: this.data.obj.names,
                surnames: this.data.obj.surnames,
                sex: this.data.obj.sex,
                identificationDocument: this.data.obj.identificationDocument,
                documentNumber: this.data.obj.documentNumber,
                email: this.data.obj.email,
                cellphone: this.data.obj.cellphone,
                state: this.data.obj.state
            });
        }
    }

    changeOption(e: any) {
        this.fApplicant.get("sex")?.setValue(e.target.value)
    }

    submitFunction(): void {
        if (this.isEditable === true) {
            this.update();
        } else {
            this.save();
        }
    }

    save(): void {
        this.mApplicant = { ...this.fApplicant.value };
        this.sApplicant.create(this.mApplicant).subscribe(() => {
            this.msActive.close();
        });
    }

    update(): void {
        this.mApplicant = { ...this.fApplicant.value, "state": this.data.obj.state };
        this.sApplicant.update(this.data.obj.id, this.mApplicant).subscribe(() => {
            this.msActive.close();
        });
    }
}
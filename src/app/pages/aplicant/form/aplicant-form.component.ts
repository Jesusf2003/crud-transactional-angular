import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TbAplicant } from "../../../services/model/aplicant.model";
import { AplicantService } from "../../../services/aplicant.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-aplicant-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './aplicant-form.component.html',
    styleUrls: ['./aplicant-form.component.css']
})
export class AplicantFormComponent implements OnInit {

    fAplicant!: FormGroup;
    mAplicant!: TbAplicant;
    isEditable: boolean = false;
    @Input() data: any;

    constructor(
        private fb: FormBuilder,
        public sAplicant: AplicantService,
        public msActive: NgbActiveModal
    ) { }

    ngOnInit(): void {
        this.fAplicant = this.fb.group({
            names: ['', [Validators.required]],
            surnames: ['', [Validators.required]],
            sex: ['', [Validators.required]],
            identificationDocument: ['', [Validators.required, Validators.minLength(3)]],
            documentNumber: ['', [Validators.required, Validators.minLength(8)]],
            email: ['', [Validators.required, Validators.email]],
            cellphone: ['', [Validators.required]]
        });
        
        this.isEditable = this.data.isEditable;
        if (this.isEditable === true) {
            this.fAplicant.patchValue({
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
        console.log(this.data.obj)
    }

    changeOption(e: any) {
        console.log(e.target.value)
        this.fAplicant.get("sex")?.setValue(e.target.value)
    }

    submitFunction(): void {
        if (this.isEditable === true) {
            this.update();
        } else {
            this.save();
        }
    }

    save(): void {
        this.mAplicant = { ...this.fAplicant.value };
        this.sAplicant.create(this.mAplicant).subscribe(() => {
            this.msActive.close();
        });
    }

    update(): void {
        this.mAplicant = { ...this.fAplicant.value, "state": this.data.obj.state };
        this.sAplicant.update(this.data.obj.id, this.mAplicant).subscribe(() => {
            this.msActive.close();
        });
    }
}
import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TbAdviser } from "../../../services/model/adviser.model";
import { AdviserService } from "../../../services/adviser.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-adviser-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './adviser-form.component.html',
    styleUrls: ['./adviser-form.component.css']
})
export class AdviserFormComponent implements OnInit {

    fAdviser!: FormGroup;
    mAdviser!: TbAdviser;
    isEditable: boolean = false;
    @Input() data: any;

    constructor(
        private fb: FormBuilder,
        public sAdviser: AdviserService,
        public msAdviser: NgbActiveModal
    ) { }

    ngOnInit(): void {
        this.fAdviser = this.fb.group({
            names: ['', [Validators.required]],
            surnames: ['', [Validators.required]],
            identificationDocument: ['', [Validators.required, Validators.minLength(3)]],
            documentNumber: ['', [Validators.required, Validators.minLength(8)]],
            email: ['', [Validators.required, Validators.email]],
            cellphone: ['', [Validators.required]],
        });
        this.isEditable = this.data?.isEditable || false;
        if (this.isEditable === true) {
            this.fAdviser.patchValue({
                names: this.data.obj.names,
                surnames: this.data.obj.surnames,
                identificationDocument: this.data.obj.identificationDocument,
                documentNumber: this.data.obj.documentNumber,
                email: this.data.obj.email,
                cellphone: this.data.obj.cellphone,
                state: this.data.obj.state
            });
        }
    }

    submitFunction() {
        if (this.isEditable === true) {
            this.update();
        } else {
            this.save();
        }
    }

    save(): void {
        this.mAdviser = { ...this.fAdviser.value };
        this.sAdviser.create(this.mAdviser).subscribe(() => {
            this.msAdviser.close();
        })
    }

    update(): void {
        this.mAdviser = { ...this.fAdviser.value, state: this.data.obj.state };
        this.sAdviser.update(this.data.obj.id, this.mAdviser).subscribe(() => {
            this.msAdviser.close();
        });
    }
}
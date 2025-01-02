import { Component, OnInit } from '@angular/core';
import { ApplicantService } from '../../services/applicant.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicantFormComponent } from './form/applicant-form.component';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-applicant',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './applicant.component.html',
    styleUrl: './applicant.component.css'
})
export class ApplicantComponent implements OnInit {

    lApplicant: any[] = [];

    constructor(
        private sApplicant: ApplicantService,
        private sModal: NgbModal
    ) {}

    ngOnInit(): void {
        this.showAll();
    }

    showAll(): void {
        this.sApplicant.getAll().subscribe(res => {
            this.lApplicant = res;
        });
    }

    delete(id: number): void {
        Swal.fire({
            title: "¿Estás seguro de que quieres eliminar a este aplicante?",
            showDenyButton: true,
            confirmButtonText: `Eliminar`,
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Aplicante eliminado', '', 'info');
                this.sApplicant.setDelete(id).subscribe(() => {
                    this.ngOnInit();
                })
            } else {
                Swal.fire('Cancelando acción', '', 'info');
            }
        });
        
    }

    openSaveForm() {
        this.sModal.open(ApplicantFormComponent,
            {
                centered: true,
                backdrop: 'static'
            }
        ).result.then(() => {
            this.ngOnInit();
        });
    }

    openEditForm(data: any) {
        const updateData = this.sModal.open(ApplicantFormComponent,
            {
                centered: true,
                backdrop: 'static'
            }
        );
        updateData.componentInstance.data = { obj: data, isEditable: true };
        updateData.result.then(() => {
            this.ngOnInit();
        })
    }
}

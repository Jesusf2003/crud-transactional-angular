import { Component, OnInit } from '@angular/core';
import { AplicantService } from '../../services/aplicant.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AplicantFormComponent } from './form/aplicant-form.component';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-aplicant',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './aplicant.component.html',
    styleUrl: './aplicant.component.css'
})
export class AplicantComponent implements OnInit {

    lAplicant: any[] = [];

    constructor(
        private sAplicant: AplicantService,
        private sModal: NgbModal
    ) {}

    ngOnInit(): void {
        this.showAll();
    }

    showAll(): void {
        this.sAplicant.getAll().subscribe(res => {
            this.lAplicant = res;
            console.log(res);
        });
    }

    delete(id: number): void {
        Swal.fire({
            title: "¿Estás seguro de que quieres eliminar a este aplicante?",
            showDenyButton: true,
            confirmButtonText: `Eliminar`,
            denyButtonText: `Cancelar`,
        }).then((result) => {
            console.log(result.isConfirmed)
            if (result.isConfirmed) {
                Swal.fire('Aplicante eliminado', '', 'info');
                this.sAplicant.setDelete(id).subscribe(() => {
                    this.ngOnInit();
                })
            } else {
                Swal.fire('Cancelando acción', '', 'info');
            }
        });
        
    }

    openSaveForm() {
        this.sModal.open(AplicantFormComponent,
            {
                centered: true,
                backdrop: 'static'
            }
        ).result.then(() => {
            this.ngOnInit();
        });
    }

    openEditForm(data: any) {
        const updateData = this.sModal.open(AplicantFormComponent,
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

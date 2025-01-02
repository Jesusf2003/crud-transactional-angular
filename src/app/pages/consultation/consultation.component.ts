import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConsultationService } from '../../services/consultation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ConsultationFormComponent } from './form/consultation-form.component';

@Component({
    selector: 'app-consultation',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './consultation.component.html',
    styleUrl: './consultation.component.css'
})
export class ConsultationComponent implements OnInit {

    lConsultation: any[] = [];

    constructor(
        private sConsultation: ConsultationService,
        private sModal: NgbModal
    ) { }

    ngOnInit(): void {
        this.showAll();
    }

    showAll(): void {
        this.sConsultation.getAll().subscribe(res => {
            this.lConsultation = res;
        });
    }

    delete(id: number): void {
        Swal.fire({
            title: "¿Estás seguro de que quieres eliminar esta consulta?",
            showDenyButton: true,
            confirmButtonText: `Eliminar`,
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Consulta eliminada', '', 'info');
                this.sConsultation.setDelete(id).subscribe(() => {
                    this.ngOnInit();
                })
            } else {
                Swal.fire('Cancelando acción', '', 'info');
            }
        })
    }

    openSaveForm() {
        this.sModal.open(ConsultationFormComponent,
            {
                centered: true,
                backdrop: 'static'
            }
        ).result.then(() => {
            this.ngOnInit();
        });
    }

    openEditForm(data: any) {
        const updateData = this.sModal.open(ConsultationFormComponent,
            {
                centered: true,
                backdrop: 'static'
            }
        );
        updateData.componentInstance.data = {
            obj: data,
            isEditable: true
        };
        updateData.result.then(() => {
            this.ngOnInit();
        });
    }
}

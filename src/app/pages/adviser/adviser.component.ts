import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdviserService } from '../../services/adviser.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AdviserFormComponent } from './form/adviser-form.component';

@Component({
    selector: 'app-adviser',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './adviser.component.html',
    styleUrl: './adviser.component.css'
})
export class AdviserComponent implements OnInit {

    lAdviser: any[] = [];

    constructor(
        private sAdviser: AdviserService,
        private sModal: NgbModal
    ) {}

    ngOnInit(): void {
        this.showAll();
    }

    showAll(): void {
        this.sAdviser.getAll().subscribe(res => {
            this.lAdviser = res;
        });
    }

    delete(id: number): void {
        Swal.fire({
            title: "¿Estás seguro de que quieres eliminar a este asesor?",
            showDenyButton: true,
            confirmButtonText: `Eliminar`,
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Asesor eliminado', '', 'info');
                this.sAdviser.setDelete(id).subscribe(() => {
                    this.ngOnInit();
                })
            } else {
                Swal.fire('Cancelando acción', '', 'info');
            }
        })
    }

    openSaveForm() {
        this.sModal.open(AdviserFormComponent,
            {
                centered: true,
                backdrop: 'static'
            }
        ).result.then(() => {
            this.ngOnInit();
        });
    }

    openEditForm(data: any) {
        const updateData = this.sModal.open(AdviserFormComponent,
            {
                centered: true,
                backdrop: 'static'
            }
        );
        updateData.componentInstance.data = {obj: data, isEditable: true};
        updateData.result.then(() => {
            this.ngOnInit();
        });
    }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarreraService } from '../../services/carrera.service';
import { TbCarrera } from '../../services/model/carrera.model';

@Component({
    selector: 'app-carrera',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './carrera.component.html',
    styleUrls: ['./carrera.component.css']
})
export class CarreraComponent implements OnInit {

    fCarrera!: FormGroup;
    mCarrera!: TbCarrera;
    lCarrera: any[] = [];
    editable: boolean = false;

    constructor(
        private fb: FormBuilder,
        private sCarrera: CarreraService
    ) {}

    ngOnInit(): void {
        this.fCarrera = this.fb.group({
            identificador: [null, [Validators.required]],
            nombre: [null, [Validators.required]],
            descripcion: [null, [Validators.required]]
        });
        this.showAll();
    }

    showAll(): void {
        this.sCarrera.getAll().subscribe(res => {
            this.lCarrera = res;
        })
    }

    save(): void {
        this.mCarrera = {...this.fCarrera.value};
        this.sCarrera.create(this.mCarrera).subscribe(res => {
            this.editable = true;
            window.location.reload();
        });
    }

    update(): void {
        this.mCarrera = {...this.fCarrera.value};
        this.sCarrera.update(this.mCarrera.identificador, this.mCarrera).subscribe(res => {
            this.editable = true;
            window.location.reload();
        });
    }

    delete(): void {
        this.mCarrera = {...this.fCarrera.value};
        this.sCarrera.setDelete("EMA").subscribe()
    }
}

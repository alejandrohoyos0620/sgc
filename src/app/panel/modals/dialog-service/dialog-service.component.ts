import { Component,Inject  } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import { hiredService } from '@core/models/hiredService.model';
import { Employee } from '@core/models/employee.model';
import { UsersService } from '@core/services/users/users.service';
@Component({
  selector: 'app-dialog-service',
  templateUrl: './dialog-service.component.html',
  styleUrls: ['./dialog-service.component.scss']
})
export class DialogServiceComponent {

  selected:any;
  isShowRepairmans:boolean = false;
  repairmans;
  constructor(
    public dialogRef: MatDialogRef<DialogServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: hiredService,
    private userService: UsersService
    ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  showRepairmans(){
    this.isShowRepairmans = true;
    this.userService.getAllRepairmans(1).subscribe(repairmans =>{
      this.repairmans = repairmans;
    }
  );
  // this.repairmans =[
  //     {
  //       address:'Calle 21 A #45',
  //       email:'juanRepairmanQuemado@sgc.com',
  //       establishment: {
  //         address: 'Cuadra superior carrera 23A',
  //         city: 'Manizales, Caldas',
  //         email: 'puntodelpcquemado@mail.com',
  //         name: 'Punto del PC quemado',
  //         nit: '987382-4',
  //         phone: '(03)8785622',
  //         id:1
  //       },
  //       fullName:'Juan Andrés Quemado Repairman',
  //       id: 1,
  //       password:'123456',
  //       phone:'+5734546736',
  //       role:'repairman',
  //     },
  //     {
  //       address:'Calle 45 F #45',
  //       email:'pedroRepairmanQuemado@sgc.com',
  //       establishment: {
  //         address: 'Cuadra superior carrera 23A',
  //         city: 'Manizales, Caldas',
  //         email: 'puntodelpcquemado@mail.com',
  //         name: 'Punto del PC quemado',
  //         nit: '987382-4',
  //         phone: '(03)8785622',
  //         id:1
  //       },
  //       fullName:'Pedro Felipe Quemado Repairman',
  //       id: 2,
  //       password:'123456',
  //       phone:'+573432436',
  //       role:'repairman',
  //     },
  //     {
  //       address:'Carrera 22 A #45',
  //       email:'matiasRepairmanQuemado@sgc.com',
  //       establishment: {
  //         address: 'Cuadra superior carrera 23A',
  //         city: 'Manizales, Caldas',
  //         email: 'puntodelpcquemado@mail.com',
  //         name: 'Punto del PC quemado',
  //         nit: '987382-4',
  //         phone: '(03)8785622',
  //         id:1
  //       },
  //       fullName:'Matias Quintero Quemado Repairman',
  //       id: 3,
  //       password:'123456',
  //       phone:'+57 6543536',
  //       role:'repairman',
  //     },
  //     {
  //       address:'Av.Santander 21 A #45',
  //       email:'manuelRepairmanQuemado@sgc.com',
  //       establishment: {
  //         address: 'Cuadra superior carrera 23A',
  //         city: 'Manizales, Caldas',
  //         email: 'puntodelpcquemado@mail.com',
  //         name: 'Punto del PC quemado',
  //         nit: '987382-4',
  //         phone: '(03)8785622',
  //         id:1
  //       },
  //       fullName:'Manuel Hernández Quemado Repairman',
  //       id: 4,
  //       password:'123456',
  //       phone:'+57654234',
  //       role:'repairman',
  //     }
  //   ]
  }
}

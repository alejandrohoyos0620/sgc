import { Component, OnInit } from '@angular/core';
import { hiredService } from '@core/models/hiredService.model';
import { DialogServiceComponent } from './../dialog-service/dialog-service.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  tableEnable = 'service';
  //hiredServices : hiredService[];
  establishment:  {
    address: 'Cuadra superior carrera 23A',
    city: 'Manizales, Caldas',
    email: 'puntodelpcquemado@mail.com',
    name: 'Punto del PC quemado',
    nit: '987382-4',
    phone: '(03)8785622'
  };
  // customer1: Partial<Customer> = {
  //   fullName: 'Alejandro Hoyos Quemado',
  //   address: 'Calle 21 A',
  //   city: 'Manizales Caldas',
  //   email: 'alejoquemado@mail.com',
  //   phone: '+5731456765'
  // }
  // device1: Device = {
  //   id: '1',
  //   brand: 'Asus x555gq',
  //   code: 'C5H34HSMC-DM',
  //   color: 'Negro',
  //   name: 'Computador portatil',
  // }
  // repairman1: Partial<Employee> = {
  //   address: 'Calle 78B 21',
  //   email: 'tecnicoquemado@mail.com',
  //   establishment: this.establishment,
  //   fullName: 'Pedro el técnico',
  //   id: '1',
  //   phone: '+57312657673',
  //   role: 'tecnico'
  // }
  // service1: Service ={
  //   description: 'Mantenimiento completo de computador, con formateada',
  //   establishment: this.establishment,
  //   id: '2',
  //   isDeliverable: false,
  //   isEnable: true,
  //   name: 'Mantenimiento'
  // }
  // servicio1 = {
  //   id: '2',
  //   customer: this.customer1,
  //   device: this.device1,
  //   repairman: this.repairman1,
  //   service: this.service1,
  //   status: 'service'
  // };
 // servicios: hiredService = this.servicio1;
  hiredServices: hiredService[] = [
   // this.servicios
    {
      id: 1,
      customer: {
        fullName: 'Alejandro Hoyos Quemado',
        address: 'Calle 21 A',
        city: 'Manizales Caldas',
        email: 'alejoquemado@mail.com',
        phone: '+5731456765'
      },
      device: {
        id: 1,
        brand: 'Asus x555gq',
        code: 'C5H34HSMC-DM',
        color: 'Negro',
        name: 'Computador portatil',

      },
      repairman: {
        address: 'Calle 78B 21',
        email: 'tecnicoquemado@mail.com',
        establishment:  {
          address: 'Cuadra superior carrera 23A',
          city: 'Manizales, Caldas',
          email: 'puntodelpcquemado@mail.com',
          name: 'Punto del PC quemado',
          nit: '987382-4',
          phone: '(03)8785622',
          id:1
        },
        fullName: 'Pedro el técnico',
        id: 1,
        phone: '+57312657673',
        role: 'tecnico'
      },
      service: {
        description: 'Mantenimiento completo de computador, con formateada',
        establishment:  {
          address: 'Cuadra superior carrera 23A',
          city: 'Manizales, Caldas',
          email: 'puntodelpcquemado@mail.com',
          name: 'Punto del PC quemado',
          nit: '987382-4',
          phone: '(03)8785622',
          id:1
        },
        id: 2,
        isDeliverable: false,
        isEnable: true,
        name: 'Mantenimiento'
      },
      status: 'course',
      createdAt: '07-enero-2021'
    },
    {
      id: 2,
      customer: {
        fullName: 'Manuel Narvaez Quemado',
        address: 'Carrera 87 F',
        city: 'Manizales Caldas',
        email: 'manuelquemado@mail.com',
        phone: '+57319898965'
      },
      device: {
        id: 2,
        brand: 'Lennovo ff45643',
        code: 'KLOSBM-83927',
        color: 'Gros',
        name: 'Computador portatil',
      },
      repairman: {
        address: 'Calle 78B 21',
        email: 'tecnicoquemado@mail.com',
        establishment:  {
          address: 'Cuadra superior carrera 23A',
          city: 'Manizales, Caldas',
          email: 'puntodelpcquemado@mail.com',
          name: 'Punto del PC quemado',
          nit: '987382-4',
          phone: '(03)8785622',
          id:1
        },
        fullName: 'Pedro el técnico',
        id: 1,
        phone: '+57312657673',
        role: 'tecnico'
      },
      service: {
        description: 'Servicio de reparación de pantalla de computador',
        establishment:  {
          address: 'Cuadra superior carrera 23A',
          city: 'Manizales, Caldas',
          email: 'puntodelpcquemado@mail.com',
          name: 'Punto del PC quemado',
          nit: '987382-4',
          phone: '(03)8785622',
          id:1
        },
        id: 1,
        isDeliverable: false,
        isEnable: true,
        name: 'Cambio de pantalla'
      },
      status: 'course',
      createdAt: '07-enero-2021'
    },
    {
      id: 3,
      customer: {
        fullName: 'Alejandro Hoyos Quemado',
        address: 'Calle 21 A',
        city: 'Manizales Caldas',
        email: 'alejoquemado@mail.com',
        phone: '+5731456765'
      },
      device: {
        id: 1,
        brand: 'Asus x555gq',
        code: 'C5H34HSMC-DM',
        color: 'Negro',
        name: 'Computador portatil',

      },
      repairman: {
        address: 'Calle 78B 21',
        email: 'tecnicoquemado@mail.com',
        establishment:  {
          address: 'Cuadra superior carrera 23A',
          city: 'Manizales, Caldas',
          email: 'puntodelpcquemado@mail.com',
          name: 'Punto del PC quemado',
          nit: '987382-4',
          phone: '(03)8785622',
          id:1
        },
        fullName: 'Pedro el técnico',
        id: 1,
        phone: '+57312657673',
        role: 'tecnico'
      },
      service: {
        description: 'Servicio de reparación de pantalla de computador',
        establishment:  {
          address: 'Cuadra superior carrera 23A',
          city: 'Manizales, Caldas',
          email: 'puntodelpcquemado@mail.com',
          name: 'Punto del PC quemado',
          nit: '987382-4',
          phone: '(03)8785622',
          id:1
        },
        id: 1,
        isDeliverable: false,
        isEnable: true,
        name: 'Cambio de pantalla'
      },
      status: 'course',
      createdAt: '07-enero-2021'
    }
  ];
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(this.hiredServices);
  }

  changeTable(table: string) {
    this.tableEnable = table;
  }

  openDialog(index: number): void {
    const dialogRef = this.dialog.open(DialogServiceComponent, {
      width: '1000px',
      height:'600px',
      disableClose:true,
      autoFocus:false,
      data: this.hiredServices[index]
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      //this.animal = result;
    });
  }
}

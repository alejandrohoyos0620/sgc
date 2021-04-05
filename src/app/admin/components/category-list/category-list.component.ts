import { Component, OnInit } from '@angular/core';
import { hiredService } from '@core/models/hiredService.model';
import { Service } from '@core/models/service.model';
import { ServiceService } from '@core/services/Services/service.service';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogServiceComponent } from '../dialog-service/dialog-service.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  
  services: Service[];
  constructor(
    private serviceService: ServiceService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }
  fetchServices(): void {
    this.serviceService.getAllServices(1).subscribe(services =>
      this.services = services
    );
  }

  deleteService(id: number): void {
    this.serviceService.deleteService(id).subscribe(rta => {
      if (rta) {
        const index = this.services.findIndex((service) => service.id === id);
        this.services.splice(index, 1);
        this.services = [...this.services];
      }
    });
  }

  openDialogService(index: number): void {
    const dialogRef = this.dialog.open(DialogServiceComponent, {
      width: '1000px',
      height: '600px',
      disableClose: true,
      autoFocus: false,
      data: this.services[index],
    });

    dialogRef.afterClosed().subscribe(repairmanId => {
      console.log("salió");
    });
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-rating',
  templateUrl: './dialog-rating.component.html',
  styleUrls: ['./dialog-rating.component.scss']
})
export class DialogRatingComponent  {
  form: FormGroup;
  selected: any;
  isShowRepairmans = false;
  repairmans;
  firstAdvertenceCancel = false;
  firstAdvertenceSave = false;
  constructor(
    public dialogRef: MatDialogRef<DialogRatingComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) { 
    this.buildForm();
  }
  onNoClick(): void {
    if(this.firstAdvertenceCancel || (!( this.form.controls['star1'].dirty || this.form.controls['star2'].dirty || this.form.controls['star3'].dirty || this.form.controls['star4'].dirty || this.form.controls['star5'].dirty))){
      this.dialogRef.close('0');
    }else{
      this.firstAdvertenceCancel = true;
    }
    
  }
  private buildForm(): void {
    this.form = this.formBuilder.group({
      star1: ['', []],
      star2: ['', []],
      star3: ['', []],
      star4: ['', []],
      star5: ['', []],
    });
  }
  saveRating(event: Event): void {
    event.preventDefault();
    if(this.form.controls['star1'].dirty || this.form.controls['star2'].dirty || this.form.controls['star3'].dirty || this.form.controls['star4'].dirty || this.form.controls['star5'].dirty){
      this.toastr.success('Se guardó exitosamente la calificación');
      this.dialogRef.close(this.form.value.star1);
    }else{
      this.firstAdvertenceSave = true;
    } 
  }

}

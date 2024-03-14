import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-conformation-modal.component.html',
  styleUrls: ['./delete-conformation-modal.component.css']
})
export class DeleteConfirmationModalComponent {
  constructor(public dialogRef: MatDialogRef<DeleteConfirmationModalComponent>) { }
}


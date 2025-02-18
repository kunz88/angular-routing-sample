import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { ModalServiceService } from '../../services/modal-service.service';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css',
})
export class ConfirmModalComponent {
  private dialogEl =
    viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  modalService = inject(ModalServiceService);

  ngAfterViewInit(): void {
    this.dialogEl().nativeElement.showModal();
  }

  closeModal() {
    this.modalService.closeModal();
  }
}

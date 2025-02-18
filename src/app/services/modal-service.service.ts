import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalServiceService {
  private showModal = signal(false);

  get showModalGetter() {
    return this.showModal;
  }

  closeModal() {
    this.showModal.update((value) => !value);
  }
}

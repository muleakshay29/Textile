import { Injectable } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { DeleteConfirmationComponent } from "../_helper/delete-confirmation/delete-confirmation.component";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  openModalWithComponent(Name: string, _id: string) {
    const initialState = {
      message: "Are you sure to delete " + Name + "?",
      title: "Delete Confirmation",
    };

    this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, {
      initialState,
    });

    return this.bsModalRef;
  }
}

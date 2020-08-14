import { Component, OnInit, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Validations } from "../validations";

@Component({
  selector: "app-error-message",
  template: ` <div
    *ngIf="errorMessage !== null"
    class="invalid-feedback d-block"
  >
    * {{ errorMessage }}
  </div>`,
})
export class ErrorMessageComponent implements OnInit {
  @Input() control: FormControl;
  constructor() {}

  ngOnInit() {}

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.invalid &&
        this.control.dirty
      ) {
        return Validations.getValidatorErrorMessage(
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }

    return null;
  }
}

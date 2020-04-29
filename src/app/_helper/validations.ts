import { AbstractControl } from "@angular/forms";

export class Validations {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      null: "Required field",
      required: "Required field",
      email: "Invalid email",
      invalidFormat: "Only characters, numbers and -, _ are allowed",
      characterFormat:
        "Only characters and numbers are allowed. Minimum length should be 3.",
      characterNumberFormat: "Only characters and numbers are allowed.",
      floatNumbers: "Only numbers are allowed",
      invallidNumbers: "Only numbers are allowed",
      alreadyExist: "Already exist",
      invalidBarcode: "Invalid barcode pattern",
      invalidEmailAddress: "Invalid email address",
      invalidPassword:
        "Invalid password. Password must be at least 8 characters long, and contain at least 1 number, 1 uppercase letter, 1 lowercase letter and 1 special character.",
      missmatch: "Confirm Password should be same as Password",
      minlength: `Minimum length ${validatorValue.requiredLength}`,
      maxlength: `Maximum length ${validatorValue.requiredLength}`,
      max: `Maximum length ${validatorValue.requiredLength}`,
    };
    return config[validatorName];
  }

  static characterPattern(control) {
    if (control.value === null) {
      return { characterFormat: true };
    } else {
      if (control.value.match(/^[a-zA-Z]{3,100}$/)) {
        return null;
      } else {
        return { characterFormat: true };
      }
    }
  }

  static characterNumberPattern(control) {
    if (control.value === null) {
      return { characterNumberFormat: true };
    } else {
      if (control.value.match(/^[a-zA-Z0-9]*$/)) {
        return null;
      } else {
        return { characterNumberFormat: true };
      }
    }
  }

  static floatnumberPattern(control) {
    if (control.value === null) {
      return { floatNumbers: true };
    } else {
      if (control.value.match(/^-?[\d.]+(?:e-?\d+)?$/)) {
        return null;
      } else {
        return { floatNumbers: true };
      }
    }
  }

  static numberPattern(control) {
    if (control.value === null) {
      return { invallidNumbers: true };
    } else {
      if (control.value.match(/^[0-9]*$/)) {
        return null;
      } else {
        return { invallidNumbers: true };
      }
    }
  }

  static alphaNumericPattern(control) {
    if (control.value === null) {
      return { invalidFormat: true };
    } else {
      if (control.value.match(/^[a-zA-Z0-9-_ ]*$/)) {
        return null;
      } else {
        return { invalidFormat: true };
      }
    }
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get("Password").value;
    const confirmPassword: string = control.get("Re_Password").value;

    if (password !== confirmPassword) {
      control.get("Re_Password").setErrors({ missmatch: true });
    } else {
      return null;
    }
  }

  static passwordValidator(control) {
    if (control.value === null) {
      return { invalidPassword: true };
    } else {
      if (
        control.value.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,}$/
        )
      ) {
        return null;
      } else {
        return { invalidPassword: true };
      }
    }
  }
}

import { Directive } from "@angular/core";
import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
  NG_ASYNC_VALIDATORS,
} from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CommonService } from "../_services/common.service";

export function uniqueCheckValidator(
  cmaster: CommonService,
  data: any,
  fieldName: string,
  url: string
): AsyncValidatorFn {
  return (
    c: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    data[fieldName] = c.value;
    return cmaster.findData(data, url).pipe(
      map((res) => {
        return res.alreadyExist ? { alreadyExist: true } : null;
      })
    );
  };
}

@Directive({
  selector: "[appUniqueRecords]",
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UniqueRecordsDirective,
      multi: true,
    },
  ],
})
export class UniqueRecordsDirective {
  constructor() {}
}

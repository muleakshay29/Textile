import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "replaceQuotes",
})
export class ReplaceQuotesPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/["]+/g, "");
  }
}

import { EmailService } from './EmailService';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class EmailValidator {
  public static createValidator(emailService: EmailService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return emailService.fakeHttp(control.value).pipe(
        map((result: boolean) => result ? null as any : {invalidAsync: true})
      );
    };
  }
}
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private validEmails = ['test@test.test','qwe@qwe.qwe'];
  fakeHttp(value: string) {
    return of(this.validEmails.includes(value)).pipe(delay(5000));
  }
}
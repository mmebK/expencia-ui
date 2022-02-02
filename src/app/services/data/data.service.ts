import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AccountTransaction} from '../../modals/AccountTransaction';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  formData: BehaviorSubject<AccountTransaction> = new BehaviorSubject<AccountTransaction>(null);
  transactions: BehaviorSubject<AccountTransaction[]> = new BehaviorSubject<AccountTransaction[]>(null);

  constructor() {
  }

  updateFormData(data) {
    this.formData.next(data);
  }

  updateTransactions(data) {
    this.transactions.next(data);
  }
}

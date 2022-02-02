import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  getCategories() {
    return CATEGORIES;
  }

  getPaymentModes() {
    return PAYMENTMODES;
  }

  getOperationType() {
    return OPERATIONTYPE;
  }


}

const OPERATIONTYPE =
  {
    'CREDIT': 'Income',
    'DEBIT': 'Expense'
  }
;
const PAYMENTMODES = {
  'CREDIT_CARD': 'Credit Card',
  'DEBIT_CARD': 'Debit Card',
  'BANK_TRANSFER': 'Bank Transfer',
  'CASH': 'Cash'
};

const CATEGORIES = {
  Debit: {
    'RENT': 'Rent',
    'FOOD': 'Food',
    'BUILD': 'Build',
    'UTILITIES': 'Utilities',
    'TRANSPORTATION': 'Transportation',
    'INSURANCE': 'Insurance',
    'SHOPPING': 'Shopping',
    'ENTERTAINMENT': 'Entertainment',
    'HEALTHCARE': 'Healthcare',
    'HOUSING': 'Housing',
    'TAXES': 'Taxes',
    'CLOTHING': 'Clothing',
    'EDUCATION': 'Education',
    'PERSONAL_CARE': 'Personal Care',
    'MISCELLANEOUS': 'Miscellaneous'
  },
  Credit: {
    'SALARY': 'Salary',
    'BUSINESS': 'Business',
    'EXTRA_INCOME': 'Extra Income'
  }
};



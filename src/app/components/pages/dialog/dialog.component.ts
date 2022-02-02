import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {OptionsService} from '../../../services/options.service';
import {TransactionsService} from '../../../services/account/transactions.service';
import {DataService} from '../../../services/data/data.service';
import * as _ from 'lodash';
import {MatDialogRef} from '@angular/material/dialog';
import {AccountTransaction} from '../../../modals/AccountTransaction';
import {DashboardService} from "../../../services/dashboard/dashboard.service";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  dialogForm: any;
  transactions: AccountTransaction[];
  categories;
  paymentModes;
  types;
  typeValue;
  breakpoint;


  constructor(
    private fb: FormBuilder,
    private optionsService: OptionsService,
    private transactionService: TransactionsService,
    private dashboardService: DashboardService,
    private dataService: DataService,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {
  }


  ngOnInit(): void {

    this.paymentModes = this.optionsService.getPaymentModes();
    this.dialogForm = this.fb.group({
      id: [],
      type: ['CREDIT', Validators.required],
      category: ['', Validators.required],
      amount: ['', Validators.required],
      description: ['', [Validators.required, Validators.max(10)]],
      paymentMode: ['', Validators.required]
    });


    this.populatate();
    this.types = this.optionsService.getOperationType();
    if (this.dialogForm.get('type').value === 'CREDIT') {
      this.categories = this.optionsService.getCategories().Credit;
    } else {
      this.categories = this.optionsService.getCategories().Debit;
    }
  }


  async onSubmitForm() {
    // console.log(this.dialogForm.value);
    if (this.dialogForm.get('id').value == null || this.dialogForm.get('id').value == undefined) {
      this.transactionService.postTransaction(this.dialogForm.value).subscribe();

      this.transactionService.getInitialTransactions().subscribe();
      this.dashboardService.getDashboardInfos().subscribe();

    } else {
      let operationId = this.dialogForm.get('id').value;
      this.transactionService.updateOperation(operationId, this.dialogForm.value).subscribe();
      /*this.transactionService.getInitialTransactions().subscribe();
      this.dashboardService.getDashboardInfos().subscribe();*/
      this.dashboardService.getDashboardInfos().subscribe();

      this.transactionService.getInitialTransactions().subscribe();
      this.dashboardService.getDashboardInfos().subscribe();

    }

    this.onCloseForm();

  }

  onClearForm() {

    //this.dialogForm.reset();
    this.initializeForm();


  }

  onCloseForm() {
    // this.dialogForm.reset();
    this.initializeForm();
    this.dialogRef.close();

    //console.log(this.dialogForm.value)

  }


  changeCategories(event) {
    this.typeValue = event.value;
    if (this.typeValue == 'CREDIT') {

      this.categories = this.optionsService.getCategories().Credit;
    } else {

      this.categories = this.optionsService.getCategories().Debit;
    }

  }

  populatate() {
    let rawData = this.dataService.formData.value;

    if (rawData != null) {
      rawData = _.omit(rawData, 'operationDate');
      // console.log(rawData);
      //console.log(rawData);

      this.dialogForm.patchValue(rawData);

    }
  }

  initializeForm() {
    this.dialogForm.setValue({
      id: null,
      type: 'CREDIT',
      category: '',
      amount: '',
      description: '',
      paymentMode: ''
    });
    //  console.log(this.dialogForm.value);
  }

}



import {Component, OnInit} from '@angular/core';

// core components
import {DashboardService} from '../../../services/dashboard/dashboard.service';
import {Account} from '../../../modals/account';
import {AccountTransaction} from '../../../modals/AccountTransaction';
import {TransactionsService} from '../../../services/account/transactions.service';
import {AccountStats} from '../../../modals/accountStats';
import {chartExample1, chartExample2, chartOptions, doughnoutChart, parseOptions} from '../../../variables/charts';
import Chart from 'chart.js';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public testdata;
  public transactions: AccountTransaction;
  public datasets: any;
  public data: any;
  public balanceChart;
  public expenseChart;
  public allExpensesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public infos: Account;
  public accountStats: AccountStats[];
  public opbalance;
  public opdate;
  public expenses;
  public breakpoint: number;

  public category;
  public totalExpenses;

  // private statsData = {};
  categoryIcon;

  constructor(
    private dashboardService: DashboardService,
    private transactionsService: TransactionsService,
    private route: Router) {
  }


  async ngOnInit() {

    this.getOperations();
    this.getInfos();
    await this.getstats();

    this.dashboardService.dataStats.subscribe(data => {

      this.opbalance = data.balance;
      this.opdate = data.operationDate;
      this.expenses = data.expense;
    });
    await this.dashboardService.getTotalExpensesStats();

    this.dashboardService.datatotalExpenses.subscribe(data => {
      this.category = data.category;
      this.totalExpenses = data.totalExpenses;
    });


    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];

    let datas1 = {
      labels: this.opdate,
      datasets: [{
        label: 'Balance',
        data: this.opbalance
      }]
    };
    let datas2 = {
      labels: this.opdate,
      datasets: [{
        label: 'Expenses',
        data: this.expenses
      }]
    };

    let datas3 = {
      labels: this.category,
      datasets: [{
        label: 'Expenses',
        data: this.totalExpenses,
        backgroundColor: [
          'rgb(255,0,53)',
          'rgb(75,79,50)',
          'rgb(43,36,17)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(63,18,18)',
          'rgb(7,87,255)',
          'rgb(237,130,18)',
          'rgb(57,132,27)',
          'rgb(1,4,11)',
          'rgb(255,0,0)'
        ],
      }]
    };

    //  console.log('datas ' + JSON.stringify(datas));
    this.data = this.datasets[0];


    let balanceCh = document.getElementById('balance-chart');
    let expenseCh = document.getElementById('expense-chart');
    let allExpensesCh = document.getElementById('allExpenses-chart');


    parseOptions(Chart, chartOptions());


    this.balanceChart = new Chart(balanceCh, {
      type: 'line',
      options: chartExample1.options,
      data: datas1
    });
    this.expenseChart = new Chart(expenseCh, {
      type: 'bar',
      options: chartExample2.options,
      data: datas2
    });


    this.allExpensesChart = new Chart(allExpensesCh, {
      type: 'doughnut',
      options: doughnoutChart.options,
      data: datas3
    });
    //console.log(this.opdate);

  }

  async getstats() {

    await this.dashboardService.getAccountStatsArrays();

  }


  getOperations() {

    this.transactionsService.getInitialTransactions().subscribe(data => {
      this.transactions = data.content;

    });
  }


  getInfos() {
    this.dashboardService.getDashboardInfos().subscribe(data => {
      this.infos = data;

    });
  }

  public updateOptions() {
    this.balanceChart.data.datasets[0].data = this.data;
    this.balanceChart.update();
  }


  seeAllTransactions() {
    this.route.navigate(["/tables"])
  }

  fill(item: string) {
    let category = item.toLowerCase();
    this.categoryIcon = "assets/img/icons/category/" + category + ".svg";
  }
}

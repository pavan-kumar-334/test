import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import * as XLSX from 'xlsx';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  listData: any;
  dataSource: any;
  excelData: any;
  csvData: any;
  //paginator:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private route: Router, private authService: AuthserviceService) {}

  displayedColumns: string[] = ['id', 'name', 'status', 'Actions'];

  ngOnInit(): void {
    this.LoadCustomer();
    this.readExcel(Event);
  }

  logOut() {
    this.route.navigate(['']);
    return localStorage.removeItem('token');
  }

  LoadCustomer() {
    this.authService.getListData().subscribe((data) => {
      this.listData = data['data']['rows'];
      this.dataSource = new MatTableDataSource(this.listData);
      this.dataSource.paginator = this.paginator;

      //console.log('ooooooooooooooooooo', this.listData);
    });
  }

  fileDownload() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Report Data',
      useBom: true,
      noDownload: false,
      headers: ['id', 'name', 'status'],
    };

    new ngxCsv(this.listData, 'Report', options);
  }

  readExcel(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workBook.SheetNames;
      this.csvData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
      //console.log('ggggggggggggggggg', this.csvData);

      this.authService.importData(this.csvData).subscribe((result) => {
        //console.log('lllllllllllll', result);
      });
    };
  }

  deleteCompany(id: any) {}
}

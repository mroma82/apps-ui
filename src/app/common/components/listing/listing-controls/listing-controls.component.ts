import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppHttpClientService } from 'src/app/common/services/app-http-client.service';
import { ToastMessageContextService } from 'src/app/common/services/toast-message-context.service';

@Component({
  selector: 'app-listing-controls',
  templateUrl: './listing-controls.component.html',
  styleUrls: ['./listing-controls.component.scss']
})
export class ListingControlsComponent implements OnInit {
  @Input() exportFilename : string = "export";
  @Input() exportSheetname : string = "Data";
  @Output() onRefresh = new EventEmitter();
  @Output() onClear = new EventEmitter();
  @Output() onSetPageSize = new EventEmitter<number>();

  // constants
  readonly PAGE_SIZE_MAX = 99999;

  // define model
  model = {
    pageSize: 25
  };

  // new
  constructor(
    private http : AppHttpClientService, private t : ToastMessageContextService
  ) { }

  ngOnInit() {
  }

  // init model
  initModel(model : any) {
    this.model.pageSize = model.pageSize;
  }

  // set page size
  setPageSize(pageSize: number) {
    this.model.pageSize = pageSize;
    this.onSetPageSize.emit(this.model.pageSize);
  }

  // clear
  clear() {
    this.onClear.emit();
  }
  // refresh
  refresh() {
    this.onRefresh.emit();
  }

  // export excel
  exportExcel() {

    // build the headers
    var headers : any[] = [];    
    var headersRaw = document.getElementsByTagName("datatable-header-cell");         
    for(let x = 0 ; x < headersRaw.length; x++) {

      // get the label and add the header
      var label = headersRaw[x].getElementsByTagName("label")[0];            
      headers.push({
        Name: label ? label.innerText.trim() : headersRaw[x].textContent.trim(),
        CellType: "String"
      });
    }

    // build the rows
    var rows : any[] = [];
    var rowsRaw = document.getElementsByTagName("datatable-body-row");    
    for(let x = 0; x < rowsRaw.length; x++) {
      var row = rowsRaw[x];

      // build the values in this row
      let values : any[] = [];
      var valuesRaw = row.getElementsByTagName("datatable-body-cell");
      for(let i = 0; i < valuesRaw.length; i++) {
        
        // add the value
        values.push({
          Value: valuesRaw[i].textContent.trim(),
          CellType: "String"
        });
      }

      // add row
      rows.push({        
        Cells: values
      });
    }

    // format date
    const today = new Date();
    const dateString = `${today.getFullYear()}_${today.getMonth() + 1 < 10 ? '0': ''}${today.getMonth() + 1}_${today.getDate() < 10 ? '0' : ''}${today.getDate()}`;

    // build final model
    const model = {
      Header: headers,
      Rows: rows,
      Filename: `${this.exportFilename}${dateString}.xls`,
      SheetName: this.exportSheetname
    };

    // get the excel file    
    this.http.postBlob("/utilities/exportGrid", model).subscribe((x : Blob) => {      
      
      // download the file      
      var a = document.createElement("a");        
      a.href = window.URL.createObjectURL(x);
      a.target = "_blank";
      a.download = model.Filename;
      a.click();
    });      
  }
}

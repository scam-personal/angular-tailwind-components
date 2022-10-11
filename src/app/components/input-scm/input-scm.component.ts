import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-input-scm",
  templateUrl: "./input-scm.component.html",
  styleUrls: ["./input-scm.component.scss"],
})
export class InputScmComponent implements OnInit {
  dateInput: string = "";
  showdatePicker: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  dateSelected(date: any) {
    this.dateInput = date.value;
    this.showdatePicker = false;
  }

  showHidePicker() {
    this.showdatePicker = !this.showdatePicker;
  }
}

import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { DatepickerScmComponent } from "../datepicker-scm/datepicker-scm.component";

const FirstElement: number = 0;

@Component({
  selector: "app-input-scm",
  templateUrl: "./input-scm.component.html",
  styleUrls: ["./input-scm.component.scss"],
})
export class InputScmComponent implements OnInit {
  dateInput: string = "";
  showdatePicker: boolean = false;
  @ViewChild("inputDate", { static: true }) inputDate!: ElementRef;
  @ViewChildren(DatepickerScmComponent)
  datepickers!: QueryList<DatepickerScmComponent>;
  constructor() {}

  ngOnInit(): void {}

  dateSelected(date: string) {
    this.dateInput = date;
    this.showdatePicker = false;
  }

  showHidePicker() {
    this.showdatePicker = !this.showdatePicker;
  }

  onDatepickerClose(event: any) {
    this.showdatePicker = false;
  }

  @HostListener("document:click", ["$event"])
  onClick(event: any): void {
    let datepickerEelement = this.datepickers.get(FirstElement);
    let isInputClicked = this.inputDate.nativeElement.contains(event.target);
    let isDatepickerClicked =
      datepickerEelement?.elementRef.nativeElement.contains(event.target);
    if (!(isDatepickerClicked || isInputClicked)) this.showdatePicker = false;
  }
}

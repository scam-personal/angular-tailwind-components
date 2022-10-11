import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";

@Component({
  selector: "app-selector-scm",
  templateUrl: "./selector-scm.component.html",
  styleUrls: ["./selector-scm.component.scss"],
})
export class SelectorScmComponent implements AfterViewInit {
  @Input() collection: Array<number | string> = [];
  @Input() selectedItem: string | number = "";

  @Output("onSelected") onSelected: EventEmitter<number | string> =
    new EventEmitter();

  constructor() {}

  ngAfterViewInit(): void {
    this.scrollToPreviouslySelected();
  }

  scrollToPreviouslySelected() {
    let elementToScrollId = this.collection
      .indexOf(this.selectedItem)
      .toString()
      .concat(this.selectedItem.toString());
    let elementToScroll = document.getElementById(`${elementToScrollId}`);
    if (elementToScroll) elementToScroll.scrollIntoView(true);
  }

  itemSelected(item: number | string) {
    this.onSelected.emit(item);
  }
}

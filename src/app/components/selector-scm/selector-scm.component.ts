import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
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

  @ViewChild("selector", { static: true }) selector!: ElementRef;

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

  public get elementRef(): ElementRef {
    return this.selector;
  }

  @HostListener("document:click", ["$event"])
  onClick(event: any): void {
    let isSelectorClicked = this.elementRef.nativeElement.contains(
      event.target
    );
    console.log("selector: ", isSelectorClicked);
  }
}

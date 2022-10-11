import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-selector-scm",
  templateUrl: "./selector-scm.component.html",
  styleUrls: ["./selector-scm.component.scss"],
})
export class SelectorScmComponent implements OnInit {
  @Input() collection: Array<number | string> = [];

  constructor() {}

  ngOnInit(): void {}
}

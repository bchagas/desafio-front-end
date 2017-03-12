import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public searchForm: FormGroup;
  public startAddress = new FormControl('', Validators.required);
  public finalAddress = new FormControl('', Validators.required);

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.searchForm = new FormGroup({
      startAddress: this.startAddress,
      finalAddress: this.finalAddress
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('Valid?', this.searchForm.valid, this.searchForm.value);
  }
}

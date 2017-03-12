import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchInputComponent } from './search-input/search-input.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        SearchInputComponent,
    ],
    declarations: [
        SearchInputComponent,
    ],
    providers: [],
})
export class SearchInputModule { }

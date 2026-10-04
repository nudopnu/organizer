import { Component, input, model } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TablerIconComponent } from "@tabler/icons-angular";

@Component({
    selector: "org-search",
    template: `
    <label class="input w-full">
        <tabler-icon icon="search" [size]="20"/>
        <input type="search" [(ngModel)]="query" [placeholder]="placeholder()">
    </label>
    `,
    imports: [FormsModule, TablerIconComponent],
})
export class SearchComponent {
    placeholder = input("Search...");
    query = model("");
}
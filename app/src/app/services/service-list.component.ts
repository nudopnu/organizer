import { Component, model } from "@angular/core";
import { SearchAndNewComponent } from "../components/search-and-new.component";

@Component({
    template: `
    <org-san resource="Service" [(query)]="query"/>
    `,
    imports: [SearchAndNewComponent],
})
export class ServiceListComponent {
    query = model("");
}
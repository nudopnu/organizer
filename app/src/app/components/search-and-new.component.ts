import { Component, input, model } from "@angular/core";
import { SearchComponent } from "../daisy/search.component";
import { TablerIconComponent } from "@tabler/icons-angular";

@Component({
    selector: "org-san",
    host: { class: "flex flex-col gap-3" },
    template: `
    <div class="flex justify-between">
        <div class="text-2xl font-bold">{{resource()}}s</div>
        <button class="btn btn-sm btn-primary btn-outline min-w-32">
            <tabler-icon icon="plus"></tabler-icon>
            <span>New {{resource()}}</span>
        </button>
    </div>
    <org-search [(query)]="query" [placeholder]="'Search ' + resource() + '...'"/>
    `,
    imports: [SearchComponent, TablerIconComponent],

})
export class SearchAndNewComponent {
    resource = input("Resource");
    query = model("");
}
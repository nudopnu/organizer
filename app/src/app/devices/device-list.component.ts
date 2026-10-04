import { Component } from "@angular/core";
import { TablerIconComponent } from "@tabler/icons-angular";
import { SearchComponent } from "../daisy/search.component";

@Component({
    host: { class: "flex flex-col gap-3" },
    template: `
    <div class="flex justify-between">
        <div class="text-2xl font-bold">Devices</div>
        <button class="btn btn-sm btn-primary btn-outline">
            <tabler-icon icon="plus"></tabler-icon>
            <span>New Device</span>
        </button>
    </div>
    <org-search></org-search>
    `,
    imports: [SearchComponent, TablerIconComponent],
})
export class DeviceListComponent { }
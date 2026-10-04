import { HttpClient, httpResource } from "@angular/common/http";
import { Component, inject, model, signal } from "@angular/core";
import { ServiceSummary } from "../../models/api";
import { API_BASE_URL } from "../api.config";
import { SearchAndNewComponent } from "../components/search-and-new.component";
import { TriggleComponent } from "../daisy/triggle.component";
import { firstValueFrom } from "rxjs";
import { TablerIconComponent } from "@tabler/icons-angular";

@Component({
    template: `
    <org-san resource="Service" [(query)]="query"/>
    @for (summary of services.value(); track $index) {
        <div class="flex justify-between items-center gap-2">
            <div class="grow">
                {{summary.name}}
            </div>
            <org-triggle [pending]="pending().has(summary.id)" [status]="summary.status" (toggled)="onToggle(summary)"></org-triggle>
            <button class="btn btn-circle">
                <tabler-icon icon="refresh-alert"></tabler-icon>
            </button>
        </div>
    }
    `,
    imports: [SearchAndNewComponent, TriggleComponent, TablerIconComponent],
})
export class ServiceListComponent {
    query = model("");
    api = inject(API_BASE_URL);
    http = inject(HttpClient);
    services = httpResource<ServiceSummary[]>(() => `${this.api}/services/`);
    pending = signal(new Set<string>());

    async onToggle(summary: ServiceSummary) {
        this.pending.update(pending => new Set(pending).add(summary.id));
        try {
            const method = summary.status === "down" ? "start" : "stop";
            await firstValueFrom(this.http.post(`${this.api}/services/${summary.id}/action/${method}`, {}));
        } finally {
            this.services.reload();
            this.pending.update(p => { const n = new Set(p); n.delete(summary.id); return n; })
        }
    }
    async onRefersh(summary: ServiceSummary) {
        this.pending.update(pending => new Set(pending).add(summary.id));
        try {
            await firstValueFrom(this.http.post(`${this.api}/services/${summary.id}/refresh`, {}));
        } finally {
            this.services.reload();
            this.pending.update(p => { const n = new Set(p); n.delete(summary.id); return n; })
        }
    }
}
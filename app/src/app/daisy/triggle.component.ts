import { Component, computed, input, model, output, signal } from "@angular/core";


export type Status = "up" | "starting" | "down";


@Component({
    selector: "org-triggle",
    template: `
        <label class="flex items-center justify-center gap-3 w-8" >
            @if (pending()) {
                <span class="loading loading-spinner loading-sm"></span>
            }@else {
                <input type="checkbox" [checked]="status() === 'up'" class="toggle toggle-success" (click)="toggled.emit()" />
            }
        </label>
    `,
})
export class TriggleComponent {
    status = input<Status>();
    pending = input(false);
    toggled = output();
}
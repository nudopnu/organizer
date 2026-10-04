import { Component, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TablerIconComponent } from "@tabler/icons-angular";

@Component({
    selector: "org-nav",
    template: `
    <!-- Brand -->
    <div class="flex items-center gap-3 h-14 px-5 cursor-pointer" routerLink="/">
        <span class="text-primary shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" /> </svg>
        </span>
        @if (!collapsed()) { <span class="font-bold">Organizer</span> }
    </div>

    <!-- Menu -->
    <ul class="menu bg-base-200 w-full">
        @for (link of links; track $index) {
            <li>
                <a [routerLink]="[link.route]">
                    <tabler-icon [icon]="link.icon" [size]="20" />
                    <span>{{link.label}}</span>
                </a>
            </li>
        }
    </ul>
    `,
    imports: [TablerIconComponent, RouterLink],
})
export class NavbarComponent {
    links = [
        { icon: "device-3d-camera", label: "Devices", route: "/devices" },
        { icon: "antenna-bars-5", label: "Services", route: "/services" },
    ];
    collapsed = signal(false);
}
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { NavbarComponent } from './navbar.component';
import { TablerIconComponent } from '@tabler/icons-angular';

@Component({
  imports: [RouterOutlet, NavbarComponent, TablerIconComponent],
  selector: 'app-root',
  template: `
  <div class="relative drawer lg:drawer-open h-dvh">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle"
      [checked]="drawerOpen()" (change)="drawerOpen.set($any($event.target).checked)" />
    <div class="drawer-content p-4">
      <!-- Page content here -->
      <router-outlet/>

      <div class="absolute left-0 bottom-0 w-full p-4">
        <label for="my-drawer-3" class="btn btn-circle drawer-button lg:hidden">
          <tabler-icon icon="menu-2"></tabler-icon>
        </label>
      </div>

    </div>
    <div class="drawer-side">
      <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="bg-base-200 min-h-full w-80 p-4">
        <!-- Sidebar content -->
        <org-nav/>
      </div>
    </div>
  </div>
  `,
})
export class App {
  protected drawerOpen = signal(false);

  constructor() {
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.drawerOpen.set(false));
  }
}

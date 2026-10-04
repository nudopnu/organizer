import { InjectionToken } from "@angular/core";

/** Base URL of the backend API. Relative, because the app is served from the same origin as the API (proxy in dev, FastAPI in prod). */
export const API_BASE_URL = new InjectionToken<string>("API_BASE_URL", {
    providedIn: "root",
    factory: () => "/api/v1",
});

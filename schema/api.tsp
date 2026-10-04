import "@typespec/http";
import "./device.tsp";

using Http;

@service(#{title: "Organizer API"})
@route("/api/v1")
namespace Organizer;

model ServiceSummary {
  id: string;
  name: string;
  description: string;
  actions: string[];
  status: "up" | "starting" | "down";
}

@route("/devices")
interface Devices {
    @get list(): Device[];
}

@route("/services")
interface Services {
    @get list(): ServiceSummary[];
}


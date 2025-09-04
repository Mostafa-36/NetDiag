import os from "os";

export function getPrivateIP() {
  const interfaces = os.networkInterfaces();
  for (let iface in interfaces) {
    for (let addr of interfaces[iface]) {
      if (addr.family === "IPv4" && !addr.internal) {
        // This is the private IPv4 address of your device inside the local network (LAN)
        return addr.address;
      }
    }
  }
  return "Not found";
}

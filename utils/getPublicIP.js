export async function getPublicIP() {
  const res = await fetch("https://api.ipify.org?format=json");
  const { ip: publicIP } = await res.json();

  // This is the public IP address of your router (as seen by external servers on the internet)
  return publicIP;
}

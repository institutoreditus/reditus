import { Rox } from "rox-ssr";
export default async function (container) {
  if (!Rox.hasStarted) {
    Rox.hasStarted = true;

    const key = process.env.ROLLOUT_API_KEY || "";
    if (!key) return;

    Rox.register("SSR", container);
    await Rox.setup(key, {
      version: "1.0.0",
      platform: "Isomorphic",
      configuration:
        typeof window !== "undefined" ? window.rollout_conf : undefined,
    });
  }
}

import { Rox } from "rox-ssr";
export default function (container) {
  if (!Rox.hasStarted) {
    Rox.hasStarted = true;
    Rox.register("SSR", container);
    Rox.setup(process.env.ROLLOUT_API_KEY, {
      version: "1.0.0",
      platform: "Isomorphic",
      configuration:
        typeof window !== "undefined" ? window.rollout_conf : undefined,
    });
  }
}

import { Rox, Flag, Variant } from "rox-ssr";

class FakeFlag {
  constructor(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }
}

if (!Rox.containerCache) {
  const key = process.env.ROLLOUT_API_KEY || "";
  if (!key) {
    Rox.containerCache = {
      suggestedDonationValues: new FakeFlag("25|75|100"),
      shouldShowRegistrationForm: new FakeFlag(false),
      dashboardEnabled: new FakeFlag(false),
    };
  } else {
    Rox.containerCache = {
      suggestedDonationValues: new Variant("25|75|150", [
        "25|75|150",
        "50|150|300",
        "150|300|500",
      ]),
      shouldShowRegistrationForm: new Flag(),
      dashboardEnabled: new Flag(),
    };
  }
}
export default Rox.containerCache;

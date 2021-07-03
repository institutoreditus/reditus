import { Rox, Flag, RoxString } from "rox-ssr";

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
      suggestedMonthlyDonationValues: new FakeFlag("30|75|150"),
      suggestedSingleDonationValues: new FakeFlag("100|200|500"),
      shouldShowRegistrationForm: new FakeFlag(false),
      dashboardEnabled: new FakeFlag(false),
    };
  } else {
    Rox.containerCache = {
      suggestedMonthlyDonationValues: new RoxString("25|75|150", [
        "25|75|150",
        "50|75|150",
      ]),
      suggestedSingleDonationValues: new RoxString("100|150|200", [
        "100|150|200",
        "100|110|120",
      ]),
      shouldShowRegistrationForm: new Flag(),
      dashboardEnabled: new Flag(),
    };
  }
}
export default Rox.containerCache;

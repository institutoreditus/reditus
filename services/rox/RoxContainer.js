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
      suggestedMonthlyDonationValues: new FakeFlag("30|75|150"),
      suggestedSingleDonationValues: new FakeFlag("100|200|500"),
      shouldShowRegistrationForm: new FakeFlag(false),
      
    };
  } else {
    Rox.containerCache = {
      suggestedMonthlyDonationValues: new Variant("30|75|150", [
        "25|75|150",
        "50|75|150",
      ]),
      suggestedSingleDonationValues: new Variant("100|200|500", [
        "100|150|200",
        "100|110|120",
      ]),
      shouldShowRegistrationForm: new Flag(),
    };
  }
}
export default Rox.containerCache;

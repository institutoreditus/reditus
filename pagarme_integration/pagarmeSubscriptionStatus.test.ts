import {
  isCancelableStatus,
  isCompletableStatus,
  PagarmeSubscriptionStatus,
} from "./pagarmeSubscriptionStatus";

test.each([
  ["trialing", false],
  ["paid", true],
  ["pending_payment", false],
  ["unpaid", false],
  ["canceled", false],
  ["ended", false],
])(
  "is completable pagarme subscription status",
  async (status, expectedResult) => {
    const enumStatus: PagarmeSubscriptionStatus = (<any>(
      PagarmeSubscriptionStatus
    ))[status];
    const result = await isCompletableStatus(enumStatus);
    expect(result).toBe(expectedResult);
  }
);

test.each([
  ["trialing", false],
  ["paid", false],
  ["pending_payment", false],
  ["unpaid", true],
  ["canceled", true],
  ["ended", true],
])(
  "is cancelable pagarme subscription status",
  async (status, expectedResult) => {
    const enumStatus: PagarmeSubscriptionStatus = (<any>(
      PagarmeSubscriptionStatus
    ))[status];
    const result = await isCancelableStatus(enumStatus);
    expect(result).toBe(expectedResult);
  }
);

export {};

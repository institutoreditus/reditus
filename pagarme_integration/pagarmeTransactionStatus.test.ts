import {
  isCancelableStatus,
  isCompletableStatus,
  PagarmeTransactionStatus,
} from "./pagarmeTransactionStatus";

test.each([
  ["processing", false],
  ["authorized", false],
  ["paid", true],
  ["refunded", false],
  ["waiting_payment", false],
  ["pending_refund", false],
  ["refused", false],
  ["chargedback", false],
  ["analyzing", false],
  ["pending_review", false],
])(
  "is completable pagarme transaction status",
  async (status, expectedResult) => {
    const enumStatus: PagarmeTransactionStatus = (<any>PagarmeTransactionStatus)[status];
    const result = await isCompletableStatus(enumStatus);
    expect(result).toBe(expectedResult);
  }
);

test.each([
  ["processing", false],
  ["authorized", false],
  ["paid", false],
  ["refunded", true],
  ["waiting_payment", false],
  ["pending_refund", false],
  ["refused", true],
  ["chargedback", true],
  ["analyzing", false],
  ["pending_review", false],
])(
  "is cancelable pagarme transaction status",
  async (status, expectedResult) => {
    const enumStatus: PagarmeTransactionStatus = (<any>PagarmeTransactionStatus)[status];
    const result = await isCancelableStatus(enumStatus);
    expect(result).toBe(expectedResult);
  }
);

export {};

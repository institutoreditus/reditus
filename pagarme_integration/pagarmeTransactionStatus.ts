export enum PagarmeTransactionStatus {
  processing = "processing",
  authorized = "authorized",
  paid = "paid",
  refunded = "refunded",
  waitingPayment = "waiting_payment",
  pendingRefund = "pending_refund",
  refused = "refused",
  chargedback = "chargedback",
  analyzing = "analyzing",
  pendingReview = "pending_review",
}

async function isCompletableStatus(
  status: PagarmeTransactionStatus
): Promise<Boolean> {
  return status === PagarmeTransactionStatus.paid;
}

async function isCancelableStatus(
  status: PagarmeTransactionStatus
): Promise<Boolean> {
  const listOfStatuses = [
    PagarmeTransactionStatus.refunded,
    PagarmeTransactionStatus.refused,
    PagarmeTransactionStatus.chargedback,
  ];
  return listOfStatuses.includes(status);
}

export { isCompletableStatus, isCancelableStatus };

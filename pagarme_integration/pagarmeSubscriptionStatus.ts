export enum PagarmeSubscriptionStatus {
  trialing = "trialing",
  paid = "paid",
  pendingPayment = "pending_payment",
  unpaid = "unpaid",
  canceled = "canceled",
  ended = "ended",
}

async function isCompletableStatus(
  status: PagarmeSubscriptionStatus
): Promise<Boolean> {
  return status === PagarmeSubscriptionStatus.paid;
}

async function isCancelableStatus(
  status: PagarmeSubscriptionStatus
): Promise<Boolean> {
  const listOfStatuses = [
    PagarmeSubscriptionStatus.unpaid,
    PagarmeSubscriptionStatus.canceled,
    PagarmeSubscriptionStatus.ended,
  ];
  return listOfStatuses.includes(status);
}

export { isCompletableStatus, isCancelableStatus };

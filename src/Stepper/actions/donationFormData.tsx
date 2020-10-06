export default function updateAction(state: any, payload: any) {
  return {
    ...state,
    donationFormData: {
      ...state.donationFormData,
      ...payload,
    },
  };
}

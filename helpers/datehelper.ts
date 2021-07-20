export default function convertQueryParamToDate(dateString: string): Date {
  const format =
    "^\\d{4}-((0[1-9])|(1[0-2]))-((0[1-9])|(1[0-9])|(2[0-9])|(3[01]))$";
  const re = new RegExp(format);
  const ok = re.test(dateString);
  if (ok) {
    return new Date(dateString);
  } else {
    throw new Error("A data deve estar no formato yyyy-MM-dd");
  }
}

export function isValidDateOfBirth(dateOfBirth: Date): boolean {
  return !(
    !dateOfBirth ||
    dateOfBirth.getFullYear() < 1900 ||
    dateOfBirth.getFullYear() === new Date().getFullYear()
  );
}

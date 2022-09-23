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

export function isValidBirthday(birthday: Date | null | undefined): [boolean, string] {

  let status = true;
  let message = ''

  if ((!birthday || !(birthday instanceof Date && !isNaN(birthday.getTime())))) {
    status = false;
    message = 'Por favor, selecione uma data de nascimento válida.';
    return [status, message];
  }

  if ((birthday.getFullYear() < 1900 ||
    birthday.getFullYear() >= new Date().getFullYear())) {
    status = false;
    message = 'Por favor, cheque o ano da data de nascimento.';
  }

  return [status, message];

}

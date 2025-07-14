
export function logFormData(form: HTMLFormElement) {
  const data = new FormData(form);
  console.log(Object.fromEntries(data));
}

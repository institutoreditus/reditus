import { Select } from "@rmwc/select";

function Options({ options }: any) {
  return options.map((option: any) => (
    <option key={option.id} value={option.name}>
      {!option.label ? option.name : `(${option.name})`} {option.label}
    </option>
  ));
}

function yearList() {
  const year = new Date().getFullYear();
  const range = 89;
  return Array.from(new Array(90), (_v, i) => (
    <option key={i} value={year - range + i}>
      {year - range + i}
    </option>
  ));
}

export const Combobox = (props: any): JSX.Element => {
  return (
    <Select
      label={props.label}
      placeholder={props.placeholder}
      name={props.name}
      onChange={props.onChange}
      type={props.type}
    >
      {props.type == "number" ? (
        yearList()
      ) : (
        <Options width="50px" options={props.dataset} />
      )}
      <option value="outros">{props.otherOption}</option>
    </Select>
  );
};

export default Combobox;

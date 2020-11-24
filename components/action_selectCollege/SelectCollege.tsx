import { collegeData } from "./collegeData";
import { Select } from "@rmwc/select";

function Options({ options }: any) {
  return options.map((option: any) => (
    <option key={option.id} value={option.name}>
      ({option.name}) {option.label}
    </option>
  ));
}

export const SelectCollege = (props: any): JSX.Element => {
  return (
    <>
      {/* <select
        name={props.name}
        onChange={props.onChange}
        className="form-control"
      >
        <Options options={collegeData} />
      </select>*/}

      <Select
        label="Universidade"
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
      >
        <Options options={collegeData} />
        <option value="outros">Outra instituição</option>
      </Select>
    </>
  );
};

export default SelectCollege;

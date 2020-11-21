import { collegeData } from "./collegeData";
import { Select } from "@rmwc/select";

import styles from "../Form.module.css";

function Options({ options }: any) {
  return options.map((option: any) => (
    <option
      className={styles.optionSelect}
      key={option.id}
      value={option.value}
    >
      {option.value} - {option.name}
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

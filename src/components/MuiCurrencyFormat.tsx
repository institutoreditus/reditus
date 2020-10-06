import React from "react";
import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";

const MuiCurrencyFormat = ({ onChange, value, ...props }: any) => {
  const [currency, setCurrency] = React.useState(value);

  return (
    <NumberFormat
      customInput={TextField}
      {...props}
      value={currency}
      fullWidth
      thousandSeparator={true}
      decimalScale={2}
      onValueChange={(target: any) => {
        setCurrency(target.floatValue);
        onChange(target.floatValue);
        console.log(currency);
      }}
      isNumericString
      label={props.label}
      prefix="R$ "
    />
  );
};

export default MuiCurrencyFormat;

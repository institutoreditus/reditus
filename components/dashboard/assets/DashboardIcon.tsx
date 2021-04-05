import SvgIcon from "@material-ui/core/SvgIcon";

export const DashboardIcon = (props: any) => {
  return (
    <SvgIcon className={props.className}>
      <svg
        width="24"
        height="20"
        viewBox="0 0 14 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          y="0.979492"
          width="7.95721"
          height="8.03626"
          fill={props.color}
        />
        <rect
          x="10.042"
          y="0.979492"
          width="7.95721"
          height="8.03626"
          fill={props.color}
        />
        <rect
          x="10.042"
          y="11.123"
          width="7.95721"
          height="8.03626"
          fill={props.color}
        />
        <rect y="11.123" width="7.95721" height="8.03626" fill={props.color} />
      </svg>
    </SvgIcon>
  );
};

export default DashboardIcon;

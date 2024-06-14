import styles from "./index.module.css";

const Header = (props: {
  tag: string;
  tagOnClick?: () => void;
  title: string;
  description: string;
}) => {
  return (
    <div className={styles.titleContainer}>
      <Tag tag={props.tag} onClick={props.tagOnClick} />
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
};

const Tag = (props: { tag: string; onClick?: () => void }) => {
  if (!props.onClick) {
    return <div className={styles.tagButton}>{props.tag}</div>;
  }

  return (
    <button className={styles.tagButton} onClick={props.onClick}>
      {props.tag}
    </button>
  );
};

export default Header;

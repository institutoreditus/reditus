import { List, SimpleListItem } from "@rmwc/list";
import styles from "./Form.module.css";


export default function Reasons() {

  const reasons = [
    {emoji: '🌱', text: 'Fortalece a cultura de retribuição da UFRJ'},
    {emoji: '🧑‍🎓', text: 'Contribui para uma estrutura perene de auxílio a alunos'},
    {emoji: '💡', text: 'Viabiliza projetos de inovação da comunidade da UFRJ'},
  ]

  return (
    <>
      <p>Tornando-se parte dessa iniciativa você...</p>
      <div className={styles.reasons}>
        {reasons.map(r => <Reason {...r}/>)}
      </div>

      {/* <PreviousList/> */}
    </>
  );
}


function Reason ({emoji, text} : {emoji: string, text: string}) {
  return <div className={styles.reason}>
    <div className={styles.reason__emoji}>{emoji}</div>
    <p className={styles.reason__text}>{text}</p>
  </div>
}


function PreviousList () {
  return <List nonInteractive={true}>
    <SimpleListItem
      ripple={false}
      graphic="radio_button_checked"
      text="retorna um bem à comunidade de alunos e ex-alunos da UFRJ"
    />
    <SimpleListItem
      ripple={false}
      graphic="radio_button_checked"
      text="ajuda a fomentar uma estrutura de auxílio a alunos e equipes de competição"
    />
    <SimpleListItem
      ripple={false}
      graphic="radio_button_checked"
      text="perpetua uma cultura de retribuição"
    />
  </List>
}
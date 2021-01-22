import Head from "next/head";
import styles from "./index.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Reditus</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.termsPage}>
        <div style={{ paddingLeft: 20, paddingRight: 50 }}>
          <h1>Termos e Condições de Uso – Instituto Reditus</h1>

          <p>Bem-vindos ao Instituto Reditus</p>

          <ol className={styles.orderedList}>
            <li className={styles.listItem}>Quem Somos</li>
            <p>
              O Instituto Reditus (“Reditus”) é uma associação privada, sem fins
              lucrativos, formada principalmente por alunos e ex-alunos da
              Universidade Federal do Rio de Janeiro (“UFRJ”).
            </p>
            <p>
              Nosso objetivo é fortalecer a comunidade de alunos e ex alunos da
              UFRJ que desejam se vincular ao Instituto Reditus, fomentando a
              cultura de retribuição e aprimorando a experiência educacional,
              por meio da realização de coletas de doações e desenvolvimento de
              projetos de apoio financeiro, material e social aos corpo
              discente, separadamente ou em conjunto com entidades parceiras. O
              Reditus é uma iniciativa privada de ex-alunos e simpatizantes da
              UFRJ e não possui qualquer vinculo com a Universidade.
            </p>
            <li className={styles.listItem}>Objeto</li>
            <p>
              Pelo presente documento (Termos e Condições de Uso) ficam
              estabelecidos os direitos e obrigações dos Usuários do site. É
              importante a compreensão desse documento, pois, para se associar
              ao Instituto ou para contribuir através de doações ou de qualquer
              outra forma, é necessária a concordância com os termos e condições
              aqui descritos.
            </p>
            <li className={styles.listItem}>Definições importantes</li>
            <p>
              Pelo presente documento (Termos e Condições de Uso) ficam
              estabelecidos os direitos e obrigações dos Usuários do site. É
              importante a compreensão desse documento, pois, para se associar
              ao Instituto ou para contribuir através de doações ou de qualquer
              outra forma, é necessária a concordância com os termos e condições
              aqui descritos.
            </p>
            <ul>
              <li>
                <b>&quot;Instituto Reditus&quot;</b>: associação civil inscrita
                no Cadastro Nacional da Pessoa Jurídica (CNPJ) sob o no
                34.989.305/0001-90;
              </li>
              <li>
                <b>&quot;Usuário&quot;</b>: pessoa natural que integra o quadro
                de associados do Instituto Reditus, que contribui
                financeiramente ao Instituto ou que participa de seus projetos;
              </li>
              <li>
                <b>&quot;Website&quot;</b>: refere-se ao site
                www.reditus.org.br, operado pelo Instituto Reditus
              </li>
              <li>
                <b>&quot;Política de Privacidade&quot;</b>: documento pelo qual
                o Instituto Reditus esclarece em detalhes, o tratamento de dados
                pessoais dos Membros, em atendimento à legislação vigente,
                sobretudo, de acordo com as disposições da Lei Geral de Proteção
                de Dados (Lei 13.709/18);
              </li>
              <li>
                <b>&quot;LGPD&quot;</b>: Lei Geral de Proteção de Dados ou Lei
                13.709/18;
              </li>
              <li>
                <b>&quot;Dados pessoais&quot;</b>: qualquer informação
                relacionada à pessoal natural que a identifique, ou que, usada
                em combinação com outras informações tratadas, identifiquem um
                indivíduo. Ainda, qualquer informação por meio da qual a
                identificação ou informação de contato de uma pessoa natural
                seja possível;
              </li>
              <li>
                <b>&quot;Titular&quot;</b>: pessoa natural a quem se referem os
                dados pessoais objeto do tratamento de dados pessoais;
              </li>
              <li>
                <b>&quot;Tratamento de dados pessoais&quot;</b>: considera-se
                tratamento de dado pessoal a coleta, produção, recepção,
                classificação, utilização, acesso, reprodução, transmissão,
                distribuição, processamento, arquivamento, armazenamento,
                eliminação, avaliação ou controle da informação, modificação,
                comunicação, transferência, difusão ou extração de dados de
                pessoas físicas;
              </li>
              <li>
                <b>&quot;Consentimento&quot;</b>: autorização livre, informada e
                inequívoca (sem deixar dúvidas) pela qual o Usuário concorda com
                o tratamento de seus dados pessoais para uma finalidade
                previamente estipulada.
              </li>
            </ul>
            <br />
            <li className={styles.listItem}>Regras de utilização </li>
            <p>
              Será considerado Usuário, a pessoa natural que integra o quadro de
              associados do Instituto Reditus, que contribui financeiramente ao
              Instituto ou que participa de seus projetos.
            </p>
            <p>
              Para isso deverá informar: (i) seu nome e sobrenome; (ii) e-mail e
              (iii) CPF (iv) CEP; (v) telefone; (vi) dados bancários; (vii) data
              de nascimento; (viii) facebook, linkedin ou Skype; (ix) endereço;
              (x) dados profissionais; e (xi) dados de formação.
            </p>
            <p>
              Ao preencher os dados solicitados e aceitar expressamente estes
              Termos e Condições, o Usuário passa a aderir e participar da
              plataforma do Instituto, o que implica na aceitação total e
              irrestrita destes Termos de Uso. Caso o Usuário não concorde com
              alguma das disposições contidas neste documento, não poderá
              utilizar os serviços disponibilizados na plataforma.
            </p>
            <p>
              O Instituto Reditus não possui qualquer responsabilidade pela
              exatidão das informações, que fica a cargo dos Usuários.
            </p>
            <p>
              O Usuário garante e responde, em qualquer caso, pela veracidade e
              exatidão dos dados informados, devendo fornecer informações
              verdadeiras, exatas, atuais e completas para que serviço prestado
              cumpra a finalidade dele esperada.
            </p>
            <p>
              A inscrição e participação no Reditus por meio de seu site está
              disponível apenas para as pessoas que tenham capacidade legal,
              ficando o usuário advertido das imposições legais previstas nos
              artigos 166, I, 171, I e 180 do Código Civil:
            </p>
            <ul>
              <li>
                O Usuário deverá ser maior de 18 anos, menor emancipado, ou
                possuir o consentimento expresso e por escrito dos pais ou
                responsável legal, além de ser plenamente capaz para se vincular
                a estes Termos e Condições de Uso e aceitar e cumprir com suas
                disposições.
              </li>

              <li>
                Menores de idade não devem enviar informações pessoais, tais
                como endereço de e-mail, nome e CPF para a plataforma.
              </li>
            </ul>
            <br />
            <li className={styles.listItem}>Pagamento</li>
            <p>
              Ao utilizar meios de pagamento on-line, fica o Usuário ciente de
              que os pagamentos serão feitos por intermédio de empresas
              terceirizadas, não possuindo o Instituto Reditus qualquer
              ingerência sobre tal operação, razão pela qual não poderá ser
              responsabilizada pelos atos por elas praticados.
            </p>
            <p>
              Ainda, o Instituto Reditus não se responsabiliza nos casos em que
              as empresas operadoras dos meios de pagamento vierem a admitir o
              uso de cartões por quem não for seu legítimo titular, sendo tais
              empresas as únicas responsáveis por eventuais fraudes.
            </p>
            <p>
              Caso os dados de pagamento do Usuário sofram alterações, fica o
              Usuário responsável por sua atualização na área de cadastro no
              site do Reditus www.reditus.org.br. Na hipótese de os pagamentos
              se tornarem impossíveis por falta de atualização do Usuário, sua
              filiação ao Instituto será suspensa, podendo, a depender do
              período total de impossibilidade, resultar em exclusão do quadro
              de membros do Reditus, conforme disposto no Estatuto Social.
            </p>
            <li className={styles.listItem}>Período de vigência </li>
            <p>
              O site entra em vigor por prazo indeterminado, podendo o Instituto
              Reditus suspendê-lo ou encerrá-lo a qualquer tempo, e
              independentemente da anuência prévia dos Usuários.
            </p>
            <li className={styles.listItem}>Privacidade das informações</li>
            <p>
              Ao acessar a Plataforma, o Usuário declara estar ciente da{" "}
              <a href="/policy">Política Privacidade</a> estabelecida,
              disponível em www.reditus.org.br - conforme as disposições da Lei
              Geral de Proteção de Dados (Lei 13.709/18) - e declara
              expressamente que aceita e concorda com as previsões nela
              descritas.
            </p>
            <li className={styles.listItem}>
              Alteração dos Termos e Condições de Uso e Política de Privacidade
            </li>
            <p>
              O Instituto Reditus poderá modificar, a qualquer tempo, os Termos
              e Condições de Uso e Política de Privacidade da Plataforma,
              visando seu aprimoramento e correspondência com os serviços
              prestados ou para atender questões legais, administrativas ou
              ordens judiciais. É de exclusiva responsabilidade do Usuário a
              verificação de tais documentos periodicamente.
            </p>
            <p>
              O Instituto Reditus pode, por mera liberalidade, informar ao
              Usuário acerca de alterações significativas através de avisos por
              e-mail, mensagens na plataforma, banners no website ou aplicativo,
              ou meio outro que considerar adequado.
            </p>
            <p>
              Fica a critério do Usuário decidir se prosseguirá ou não com a
              utilização da plataforma. Caso o Usuário não concorde com as
              alterações deverá cessar a uso do site e dos serviços nele
              oferecidos.
            </p>
            <li className={styles.listItem}>Propriedade Intelectual </li>
            <p>
              O uso comercial da expressão “Instituto Reditus” como marca, nome
              empresarial ou nome de domínio, bem como os conteúdos das telas
              relativas à plataforma, programas, bancos de dados, redes e
              arquivos, são propriedade do Instituto Reditus e estão protegidos
              pelas leis brasileiras e tratados internacionais de direito
              autoral, marcas, patentes, modelos e desenhos industriais. O uso
              indevido e a reprodução total ou parcial dos referidos conteúdos
              são proibidos, salvo a autorização expressa do Instituto Reditus.
            </p>
            <p>
              O Instituto Reditus possui todos os direitos intelectuais pelos
              conteúdos contidos no website, incluindo, sem limitação, todos os
              direitos do software, de títulos, patentes, marcas, logos, modelos
              de serviço, nomes comerciais, design, código fonte, banco de
              dados, textos, conteúdos, gráficos, ícones e hyperlinks. Ao
              concordar com estes Termos e Condições de Uso, o Usuário estará
              concordando em não reproduzir ou distribuir quaisquer conteúdos do
              site e da plataforma, sem a obtenção e consentimento do Instituto
              Reditus.{" "}
            </p>
            <li className={styles.listItem}>
              Limitações, atividades vedadas ao Usuário e outras obrigações{" "}
            </li>
            <p>
              O Usuário concorda que cumprirá todas as leis e regulamentos
              aplicáveis com relação às atividades dispostas neste documento,
              bem como concorda que não utilizará a Plataforma para executar
              qualquer tipo de atividade ilegal ou para tomar qualquer ação que
              afete negativamente os desempenhos do sistema, bem como que não se
              envolverá, nem ajudará - por intenção ou omissão - um terceiro com
              o propósito de:{" "}
            </p>
            <ul>
              <li>
                fazer qualquer tentativa de contornar quaisquer características
                de segurança;
              </li>
              <li>violar qualquer lei, estatuto, ordenança ou regulamento;</li>
              <li>
                reproduzir, duplicar, copiar, vender ou revender os serviços
                prestados pelo Instituto Reditus;
              </li>
            </ul>
            <br />
            <li className={styles.listItem}>Foro de Eleição </li>
            <p>
              Qualquer controvérsia decorrente da interpretação ou aplicação do
              presente Contrato será resolvida de acordo com o princípio da
              boa-fé, elegendo as partes foro da cidade do Rio de Janeiro,
              Estado do Rio de Janeiro, como competente para processar e julgar
              quaisquer disputas oriundas desta relação.
            </p>
            <li className={styles.listItem}>Data de Entrada em Vigor</li>
            <p>22 de Janeiro de 2021.</p>
            <br />
          </ol>
        </div>
      </main>
    </div>
  );
}

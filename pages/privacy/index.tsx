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
        <div style={{ paddingLeft: 20, paddingRight: 100, width: "100%" }}>
          <h1>Política de Privacidade - Reditus</h1>

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
            <li className={styles.listItem}>O propósito desse documento</li>
            <p>
              Esta Política de Privacidade (“Política”) busca fortalecer o
              compromisso do Reditus com a privacidade de seus membros,
              parceiros, doadores] e alunos que participarem de seus editais ou
              programas e se aplica às pessoas que diretamente interajam como o
              Reditus na qualidade de membros, doadores, parceiros ou como
              participantes de seus programas, bem como às pessoas vinculadas às
              entidades que interajam com o Instituto Reditus.
            </p>
            <p>
              Por meio desse documento, o Reditus informa sobre o tratamento que
              dá a dados pessoais, a fim de esclarecer quais informações são
              coletadas, utilizadas, armazenadas, descartadas ou divulgadas a
              terceiros.
            </p>
            <li className={styles.listItem}>Definições importantes</li>

            <ul>
              <li>
                <b>&quot;Membros&quot;</b>: pessoa natural que integra o quadro
                de associados do Instituto Reditus, que contribui
                financeiramente ao Instituto ou que participada de seus projetos
                como mentor ou tutor.
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
                dados pessoais objeto do tratamento;
              </li>
              <li>
                <b>&quot;Tratamento de dados pessoais&quot;</b>: onsidera-se
                tratamento toda operação realizada com dados pessoais, como as
                que se referem a coleta, produção, recepção, classificação,
                utilização, acesso, reprodução, transmissão, distribuição,
                processamento, arquivamento, armazenamento, eliminação,
                avaliação ou controle da informação, modificação, comunicação,
                transferência, difusão ou extração de dados de pessoas físicas;
              </li>
              <li>
                <b>&quot;Controlador&quot;</b>: pessoa natural ou jurídica, de
                direito público ou privado, a quem competem as decisões
                referentes ao tratamento de dados pessoais;
              </li>
              <li>
                <b>&quot;Encarregado&quot;</b>: pessoa natural ou jurídica,
                indicada pelo controlador, que atua como canal de comunicação
                entre o controlador, os titulares de dados e a Autoridade
                Nacional de Proteção de Dados;
              </li>
              <li>
                <b>&quot;Registros de acesso&quot;</b>: o conjunto de
                informações referentes à data e hora de uso de uma determinada
                aplicação de internet a partir de um determinado endereço IP;
              </li>
              <li>
                <b>&quot;Finalidade&quot;</b>: o que o Instituto Reditus
                objetiva a partir do tratamento de dados pessoais;
              </li>
              <li>
                <b>&quot;Necessidade&quot;</b>: a indispensabilidade de um dado
                pessoal no atingimento da finalidade pretendida. Na medida das
                capacidades do Reditus, os dados pessoais sujeitos a tratamento
                serão limitados ao mínimo necessário para que se alcance tal
                finalidade, ou seja, o conjunto de dados tratados deve ser
                pertinente, proporcional e não excessivo;
              </li>
              <li>
                <b>&quot;Consentimento&quot;</b>:autorização livre, informada e
                inequívoca (sem deixar dúvidas) pela qual o Titular concorda com
                o tratamento de seus dados pessoais para uma finalidade
                previamente estipulada. Após conceder o consentimento, o Titular
                poderá revogá-lo a qualquer tempo para tratamentos futuros,
                sendo mantido, porém, o tratamento realizado até aquele momento.
              </li>
            </ul>
            <br />
            <li className={styles.listItem}>
              A quem essa Política de Privacidade se aplica{" "}
            </li>
            <p>
              Esta Política se aplica às pessoas que diretamente interajam como
              o Reditus na qualidade de membros, doadores, parceiros ou como
              participantes de seus programas, bem como às pessoas vinculadas às
              entidades que interajam com o Instituto Reditus.
            </p>
            <li className={styles.listItem}>
              O Instituto Reditus coleta e utiliza os seguintes dados pessoais
              para a prestação de seus serviços:{" "}
            </li>
            <br />
            <table className={styles.table}>
              <tr className={styles.table}>
                <td className={styles.table}>
                  <b>Informações que você fornece</b>
                </td>
                <td className={styles.table}>
                  O Instituto Reditus coleta as informações que fornecidas
                  quando você se torna membro do Instituto ou quando participa
                  de algum dos projetos oferecidos. São elas: nome, e-mail,
                  telefone, endereço, CEP, CPF, telefone, endereço, Facebook,
                  Linkedin, Skype, dados profissionais, dados de formação e
                  dados bancários.
                </td>
              </tr>
              <tr className={styles.table}>
                <td className={styles.table}>
                  Informações coletadas automaticamente
                </td>
                <td className={styles.table}>
                  O Instituto Reditus coleta e armazena informações sempre que
                  há interação com nosso site. São exemplos a utilização de
                  cookies, número do IP do dispositivo e a data e hora do
                  acesso.
                </td>
              </tr>
            </table>
            <br />
            <li className={styles.listItem}>
              Finalidade do tratamento de dados pessoais pelo Instituto Reditus
            </li>
            <br />
            <table className={styles.table}>
              <tr className={styles.table}>
                <td className={styles.table}>
                  <b>Finalidade</b>
                </td>
                <td className={styles.table}>
                  <b>Base Legal</b>
                </td>
              </tr>
              <tr className={styles.table}>
                <td className={styles.table}>
                  A fim de concretizar a relação do Instituto com os membros e
                  com os participantes dos projetos oferecidos pelo Instituto.
                </td>
                <td className={styles.table}>
                  Art. 7º, V da LGPD - execução do contrato.
                </td>
              </tr>
              <tr className={styles.table}>
                <td className={styles.table}>
                  A fim de responder às solicitações, atender pedidos e dar
                  suporte.
                </td>
                <td className={styles.table}>
                  Art. 7º, V da LGPD - execução do contrato.
                </td>
              </tr>
              <tr className={styles.table}>
                <td className={styles.table}>
                  A fim de enviar informações administrativas sobre o Instituto.
                </td>
                <td className={styles.table}>
                  Art. 7º, V da LGPD - execução do contrato.
                </td>
              </tr>
              <tr className={styles.table}>
                <td className={styles.table}>
                  Para fins de aprimoramento do Instituto, como desenvolvimento
                  de novos projetos e melhoria do site.
                </td>
                <td className={styles.table}>
                  Art. 7º, IX da LGPD - interesse legítimo.
                </td>
              </tr>
              <tr className={styles.table}>
                <td className={styles.table}>
                  Para cumprimento de obrigações legais, como relacionadas à
                  processos ou requisições de autoridades públicas ou
                  governamentais.
                </td>
                <td className={styles.table}>
                  Art. 7º, II da LGPD - cumprimento de obrigação legal ou
                  regulatória.
                </td>
              </tr>
              <tr className={styles.table}>
                <td className={styles.table}>
                  A fim de proteger os direitos, a privacidade, a segurança, a
                  propriedade, as operações, aplicar termos e condições,
                  permitir o alcance de recursos disponíveis ou limitar os danos
                  causados ao Instituto Reditus.
                </td>
                <td className={styles.table}>
                  Art. 7º, IX da LGPD - interesse legítimo.
                </td>
              </tr>
              <tr className={styles.table}>
                <td className={styles.table}>
                  A fim de enviar fornecer informações sobre projetos ou
                  serviços (por exemplo, comunicações de marketing ou campanhas
                  ou promoções). Isso poderá ser feito por meios como e-mail,
                  anúncios, SMS, ligações telefônicas e correspondências postais
                  na medida em que permitidas pela lei aplicável.
                </td>
                <td className={styles.table}>
                  Art. 7º, I da LGPD - consentimento.
                </td>
              </tr>
            </table>
            <br />
            <li className={styles.listItem}>
              Compartilhamento de dados com terceiros e transferências
              internacionais
            </li>
            <p>
              O Reditus compartilha dados pessoais nos casos em que o
              compartilhamento for necessário para o cumprimento da legislação
              aplicável ou diante de requisição de autoridades públicas ou
              governamentais.
            </p>
            <p>
              O site do Reditus pode conter links para sites de terceiros,
              plug-ins ou aplicativos. Clicar nesses links ou habilitar tais
              conexões pode permitir que terceiros coletem ou compartilhem seus
              dados. O Instituto Reditus não é responsável pela Política de
              Privacidade destes sites de terceiros, portanto, quando sair desta
              plataforma, você deve ler a Política de Privacidade específica de
              cada sítio eletrônico visitado antes de consentir com o tratamento
              de seus dados por tal terceiro.
            </p>
            <p>
              O Reditus poderá contratar operadores para o tratamento de dados
              pessoais para as finalidades descritas nesta Política. Na
              eventualidade de tais operadores estarem baseados em países
              estrangeiros, o Reditus garante que tais países possuem legislação
              de proteção de dados equivalente à LGPD, ou, caso contrário,
              celebrou contrato contendo as salvaguardas legalmente exigidas.
            </p>
            <li className={styles.listItem}>
              Tempo de retenção de dados pessoais
            </li>
            <p>
              Os dados pessoais coletados ou tratados pelo Instituto Reditus
              serão armazenados em razão de obrigação contratual, durante o
              prazo prescricional relativo à pretensão de reparação civil por
              inadimplemento.
            </p>
            <p>
              Findo este prazo, os dados pessoais tratados pelo Instituto
              Reditus serão eliminados, ressalvadas as hipóteses de retenção
              previstas na legislação aplicável.
            </p>
            <li className={styles.listItem}>
              Direitos dos titulares de dados pessoais
            </li>
            <p>
              O titular possui o direito de solicitar ao Reditus os direitos
              previstos no art. 18, da LGPD:
            </p>
            <ul>
              <li>
                <b>Confirmação da existência de tratamento:</b> em caso de
                dúvida, os titulares de dados pessoais podem entrar em contato a
                fim de confirmar se algum dado pessoal é tratado ou armazenado
                pelo Reditus. Os requerimentos serão respondidos:
                <ul>
                  <li>em formato simplificado, imediatamente; </li>
                  <li>
                    por meio de declaração clara e completa, que indique a
                    origem dos dados, a inexistência de registro, os critérios
                    utilizados e a finalidade do tratamento;
                  </li>
                  <li>
                    por meio eletrônico, seguro e idôneo para esse fim ou
                    impresso.
                  </li>
                </ul>
              </li>
              <li>
                <b>Acesso aos dados:</b> é direito dos titulares requerer acesso
                aos dados existentes e tratados pelo Reditus. Caso o tratamento
                seja baseado em contrato ou em consentimento, o titular poderá
                requerer cópia integral de seus dados pessoais. Os requerimentos
                serão respondidos:
                <ul>
                  <li>em formato simplificado, imediatamente; </li>
                  <li>
                    por meio de declaração clara e completa, que indique a
                    origem dos dados, a inexistência de registro, os critérios
                    utilizados e a finalidade do tratamento;
                  </li>
                  <li>
                    por meio eletrônico, seguro e idôneo para esse fim ou
                    impresso.
                  </li>
                  <li>
                    Por meio eletrônico, caso seja requerida cópia dos dados.
                  </li>
                </ul>
              </li>
              <li>
                <b>
                  Correção de dados incompletos, inexatos ou desatualizados:
                </b>{" "}
                os titulares de dados podem solicitar ao Reditus a qualquer
                momento, a alteração de seus dados pessoais, no caso em que
                estejam incorretos, inexatos ou desatualizados. São exemplos:
                atualização de nome, alteração de telefone e endereço. É
                importante que os dados pessoais sejam precisos e atuais, assim,
                cabe ao titular manter o Instituto Reditus informado nos casos
                em que seus dados pessoais precisem ser corrigidos.
              </li>
              <li>
                <b>
                  Anonimização, bloqueio ou eliminação de dados desnecessários,
                  excessivos ou tratados em desconformidade a LGPD:
                </b>{" "}
                o titular poderá solicitar o bloqueio e a eliminação de seus
                dados pessoais. Tal solicitação só será negada pelo Reditus nos
                casos em que o pedido não possa ser atendido ou nos casos em que
                for obrigatório ou permitido seu armazenamento, nas hipóteses
                elencadas no art. 7º da LGPD e demais dispositivos aplicáveis.
                Dados anonimizados são aqueles que não possibilitam a
                identificação do titular, considerando a utilização de meios
                técnicos, razoáveis e disponíveis na ocasião do tratamento. Em
                razão de a anonimização impedir a identificação do indivíduo, os
                dados anonimizados deixam de ser considerados pessoais e,
                portanto, passam a estar fora do escopo de aplicação da LGPD,
                desde que o processo de anonimização não possa ser revertido,
                considerando-se os critérios legalmente aplicáveis.
              </li>
              <li>
                <b>
                  Portabilidade dos dados a outro fornecedor de serviço ou
                  produto, mediante requisição expressa, de acordo com a
                  regulamentação da autoridade nacional, observados os segredos
                  comercial e industrial:
                </b>{" "}
                a portabilidade dos dados pessoais não inclui dados que já
                tenham sido anonimizados pelo Instituto Reditus.
              </li>
              <li>
                <b>
                  Eliminação dos dados pessoais tratados com o consentimento do
                  titular:
                </b>
                os dados pessoais dos titulares serão eliminados após o
                cumprimento da finalidade, exceto em determinados casos:
                <ul>
                  <li>
                    cumprimento de obrigação legal ou regulatória pelo Reditus;
                  </li>
                  <li>
                    transferência a terceiro, desde que respeitados os
                    requisitos de tratamento de dados dispostos na LGPD; ou
                  </li>
                  <li>
                    uso exclusivo do Instituto Reditus, vedado seu acesso por
                    terceiro, e desde que os dados estejam anonimizados.{" "}
                  </li>
                </ul>
              </li>
              <li>
                <b>
                  Informação das entidades públicas e privadas com as quais o
                  controlador realizou uso compartilhado de dados:
                </b>{" "}
                é direito do titular requerer acesso aos dados pessoais que
                forem encaminhados às entidades públicas e privadas, exceto, em
                situações não permitidas previstas em lei.
              </li>
              <li>
                <b>
                  Informação sobre a possibilidade de não fornecer consentimento
                  e sobre as consequências da negativa:
                </b>
                o Instituto Reditus está disponível para atender e auxiliar, de
                forma transparente, quaisquer dúvidas que possam existir em
                função do tratamento dos dados pessoais dos titulares. Inclusive
                informar quais são os possíveis impactos negativos caso o
                titular dos dados revogue o seu consentimento para o uso dos
                dados pessoais, nos casos em que a base legal para tratamento
                dos dados é o consentimento do titular.
              </li>
              <li>
                <b>Revogação do consentimento:</b>o consentimento fornecido
                pelas titulares dos dados pessoais poderá ser revogado a
                qualquer momento por meio de pedido formal ao Instituto Reditus.
              </li>
            </ul>
            <br />
            <li className={styles.listItem}>
              Modificação da Política de Privacidade{" "}
            </li>
            <p>
              O Instituto Reditus poderá modificar, alterar ou substituir esta
              Política de Privacidade a qualquer tempo. Em caso de alteração, o
              titular será informado por e-mail e pela interface da plataforma
              antes da entrada em vigor da alteração. Caso não concorde com as
              alterações, poderá revogar seu consentimento na forma da lei.
            </p>
            <li className={styles.listItem}>Legislação e Foro:</li>
            <p>
              Esta Política de Privacidade será regida, interpretada e aplicada
              de acordo com as Leis da República Federativa do Brasil,
              independentemente das Leis de outros estados ou Países, sendo
              competente o foro da Comarca da Capital do Estado do Rio de
              Janeiro para dirimir qualquer dúvida decorrente deste documento.
            </p>
            <li className={styles.listItem}>Política de Cookies:</li>
            <p>
              O Instituto Reditus utiliza somente cookies essenciais. Se o
              titular desejar, poderá desativá-los. É comum que isso possa ser
              feito no menu &quot;opções&quot; ou &quot;preferências&quot; do
              seu browser.
            </p>
            <p>
              Os cookies essenciais são necessários para que a plataforma
              funcione de maneira mais simples e eficiente, permitindo
              gerenciamento de rede, um ambiente mais seguro e acessibilidade.
              Assim, ao desativar cookies, pode ser que haja prejuízos na
              performance de navegação do site.
            </p>
            <li className={styles.listItem}>Data de Entrada em Vigor</li>
            <p>
              <b>Dados do Controlador:</b>
            </p>
            <p>
              Instituto Fundo Patrimonial Reditus, inscrito no CNPJ/MF sob o no.
              34.989.305/0001-90, com sede na Cidade do Rio de Janeiro, Estado
              do Rio de Janeiro, na Rua Visconde de Pirajá, numero 500, sala
              115, Ipanema, CEP 22410-901.
            </p>
            <p>
              <b>Dados do Encarregado - Data Protection Officer (DPO):</b>
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

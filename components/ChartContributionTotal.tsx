import { Line } from "react-chartjs-2";
import moment from "moment";
import "moment/locale/nl";
import "chartjs-adapter-moment";

moment.locale("pt-BR");

export const ChartContribution = ({ result }: any) => {
  const labels = [];
  const values = [];

  for (const v of result) {
    labels.push(v["day"]);
    values.push(v["accumulated"]);
  }

  //  const label =  Array.from(result["day"]).map(() => 0);
  // console.log(label);

  const data = {
    chartData: {
      labels: labels,
      datasets: [
        {
          label: "Total Captado",
          data: values,
          borderColor: "rgb(0,212,255)",
        },
      ],
    },
  };

  return (
    <div className="line-chart">
      <article className="canvas-container">
        <Line
          data={data.chartData}
          width={800}
          height={400}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: true,
              fontColor: "rgb(250,250,250)",
              text: "Contribuições Acumuladas",
              fontSize: 25,
            },
            legend: {
              display: true,
              position: "top",
              align: "end",
              usePointStyle: "true",
            },
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    fontColor: "rgb(250,250,250)",
                    labelString: "Valor (R$)",
                  },
                },
              ],
              xAxes: [
                {
                  display: true,
                  type: "time",
                  time: {
                    parser: "YYYY-MM-DDTHH:mm:ss.SSS",
                    unit: "day",
                    // unitStepSize: 1,
                    displayFormats: { day: "D MMM" },
                  },
                },
              ],
            },
          }}
        />
      </article>
    </div>
  );
};

export default ChartContribution;

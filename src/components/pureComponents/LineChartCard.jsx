// @flow
import React from "react";
import { Card } from "antd";
import { Line } from "react-chartjs-2";
import classNames from "classnames";
import { transData } from "apis/chartjs";
type tProps = {
  //loading state
  loading?: boolean,
  // LineChartCard parameters
  cardInfo: {
    title: string,
    info?: string,
    data?: mixed,
    type: string
  }
};

const cardChartOpts = {
  tooptips: {
    enabled: true,
    positon: "nearest"
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "transparent",
          zeroLineColor: "transparent"
        },
        ticks: {
          fontSize: 2,
          fontColor: "transparent"
        }
      }
    ],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false
          // min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          // max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5
        }
      }
    ]
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 2,
      fill: false
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
      backgroundColor: "rgb(255,255,255)"
    }
  }
};
/**
 * Component LineChartCard, Card componet with line chart
 */
const lineChartCard = (props: tProps) => {
  const { loading, cardInfo } = props;

  const mainClass = classNames("card", "text-white", {
    [`bg-${cardInfo.type}`]: true
  });
  const data = transData(cardInfo.data);
  return (
    <div className={mainClass}>
      <div className="card-body">
        <h3 className="text-white">{cardInfo.title}</h3>
        <div>{cardInfo.info}</div>
        <div className="chart-wrapper mt-3" style={{ height: "80px" }}>
          <Line data={data} options={cardChartOpts} height={80} />
        </div>
      </div>
    </div>
  );
};

lineChartCard.defaultProps = {
  cardInfo: {
    title: "DEFAULT TITLE",
    info: "Default information",
    type: "primary",
    data: [1, 2, 3]
  }
};

export default lineChartCard;

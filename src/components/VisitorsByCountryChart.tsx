import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface VisitorsByCountryChartProps {
  title: string;
  data: number[];
}

function VisitorsByCountryChart({ title, data }: VisitorsByCountryChartProps)  {
    
  const options: ApexOptions = {
    chart: {
      height: 160,
      type: 'bar',
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val}`, 
      offsetY: -3,
      style: {
        colors: ['#304758'],
      },
    },
    xaxis: {
      categories: data.map((_, index) => `Country ${index + 1}`), 
      position: 'bottom',
      labels: {
        show: true,
      },
    },
    yaxis: {
      title: {
        text: 'Visitors',
      },
    },
    title: {
      text: title,
      align: 'left',
    },
  };

  const series = [{ name: title, data }];

  return (
    <div>
      <ReactApexChart options={options} series={series} type="bar" height={160} />
    </div>
  );
};

export default VisitorsByCountryChart;

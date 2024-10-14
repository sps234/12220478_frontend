import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface TotalVisitorsSparklineProps {
  title: string;
  subtitle?: string;
  data: number[];
}

function TotalVisitorsSparkline({ title, subtitle, data }: TotalVisitorsSparklineProps ) {
  const options: ApexOptions = {
    chart: {
      type: 'line', 
      height: 160,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: 'smooth', 
    },
    fill: {
      opacity: 1,
    },
    yaxis: {
      min: 0, 
    },
    colors: ['#FF1654'],
    title: {
      text: title,
      offsetX: 0,
      style: {
        fontSize: '16px',
        color: '#333', 
      },
    },
    subtitle: {
      text: subtitle,
      offsetX: 0,
      style: {
        fontSize: '12px',
        color: '#999', 
      },
    },
  };

  const series = [{ data }]; 

  return (
    <div>
      <ReactApexChart options={options} series={series} type="line" height={160} />
    </div>
  );
};

export default TotalVisitorsSparkline;

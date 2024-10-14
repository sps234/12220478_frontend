import Chart from 'react-apexcharts';  

interface VisitorsTimeSeriesChartProps {
    data: any[]; 
}

function VisitorsTimeSeriesChart({ data }: VisitorsTimeSeriesChartProps) {
    
    const chartData = data.map(item => ({
        date: new Date(`${item.arrival_date_year}-${item.arrival_date_month}-${item.arrival_date_day_of_month}`).toISOString(),
        visitors: Number(item.adults) + Number(item.children) + Number(item.babies), 
    }));

    const dates = chartData.map(item => item.date);
    const visitors = chartData.map(item => item.visitors);

    const options: ApexCharts.ApexOptions = {
        series: [{
            name: 'Number of Visitors',
            data: visitors,
        }],
        chart: {
            type: 'area',  
            stacked: false,
            height: 350,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true,
            },
            toolbar: {
                autoSelected: 'zoom',
            },
        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 0,
        },
        title: {
            text: 'Number of Visitors Over Time',
            align: 'left',
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100],
            },
        },
        yaxis: {
            labels: {
                formatter: function (val: number) {
                    return val.toFixed(0);
                },
            },
            title: {
                text: 'Visitors',
            },
        },
        xaxis: {
            type: 'datetime',
            categories: dates, 
        },
        tooltip: {
            shared: false,
            y: {
                formatter: function (val: number) {
                    return val.toFixed(0);
                },
            },
        },
    };

    return (
        <div id="chart">
            <Chart options={options} series={options.series} type="area" height={350} />
        </div>
    );
};

export default VisitorsTimeSeriesChart;

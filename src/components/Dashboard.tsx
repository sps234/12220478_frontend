import  { useEffect, useState } from 'react';
import DatePicker  from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';
import hotelData from '../utils/data';
import DailyVisitorsChart from './DailyVisitorsChart';
import VisitorsByCountryChart from './VisitorsByCountryChart';
import TotalVisitorsSparkline from './TotalVisitorsSparkline';
import '../App.css';


function Dashboard() { 

    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]); 
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);

    useEffect(() => {
        const formattedData = hotelData.map(item => ({
            ...item,
            adults: Number(item.adults),  
            children: Number(item.children), 
            babies: Number(item.babies), 
        }));

        setData(formattedData);
        setFilteredData(formattedData); 
    }, []);

    

    useEffect(() => {
        if (startDate && endDate) {
            const filtered = data.filter(item => {
                const arrivalDate = new Date(
                    `${item.arrival_date_year}-${item.arrival_date_month}-${item.arrival_date_day_of_month}`
                );
                return arrivalDate >= startDate && arrivalDate <= endDate;
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(data); 
        }
    }, [startDate, endDate, data ]);

    const totalAdultVisitors = filteredData.reduce((sum, item) => sum + item.adults, 0);
    const totalChildrenVisitors = filteredData.reduce((sum, item) => sum + item.children, 0);

    return (
        <div className="dashboard">
            <p className="text-sky-400">Hotel Dashboard</p>

            {/* Date Range Picker */}
            <div className="date-picker">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date ? date : undefined)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date ? date : undefined)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="End Date"
                />
            </div>

            {/* Charts Section */}
            <div className="charts">
                <DailyVisitorsChart data={filteredData} />
                <VisitorsByCountryChart title="Number of visitors per country" data={filteredData} />             
                <TotalVisitorsSparkline title="Adult Visitors" data={totalAdultVisitors} />
                <TotalVisitorsSparkline title="Children Visitors" data={totalChildrenVisitors} />
            </div>
        </div>
    );
};

export default Dashboard;

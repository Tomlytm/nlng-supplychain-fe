import { FC } from "react"; 
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
} from "recharts"; 

interface LineChartComponentProps { 
  dataValues: number[]; 
} 

const LineChartComponent: FC<LineChartComponentProps> = ({ dataValues }) => { 
  const data = [ 
    { name: "Jan", value: dataValues[0] }, 
    { name: "Feb", value: dataValues[1] }, 
    { name: "Mar", value: dataValues[2] }, 
    { name: "Apr", value: dataValues[3] }, 
    { name: "May", value: dataValues[4] }, 
    { name: "Jun", value: dataValues[5] }, 
    { name: "Jul", value: dataValues[6] }, 
    { name: "Aug", value: dataValues[7] }, 
    { name: "Sep", value: dataValues[8] }, 
    { name: "Oct", value: dataValues[9] }, 
    { name: "Nov", value: dataValues[10] }, 
    { name: "Dec", value: dataValues[11] }, 
  ]; 

  return ( 
    <div className="-ml-14"> 
      <ResponsiveContainer width="100%" height={150} > 
        <LineChart 
          data={data} 
          margin={{ top: 5, right: 0, left: 20, bottom: 5 }} 
        > 
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 8, fill: "#979797" }} // Set tick color and size 
            axisLine={false} // Remove the X axis line 
            tickLine={false} // Remove X axis tick lines 
          />{" "} 
          <YAxis 
            tickFormatter={(value) => `${value}K`} 
            domain={[0, 40]} // Y-axis range from 0 to 40 
            interval={0} // Show all ticks on the Y-axis
            tick={{ fontSize: 8, fill: "#363636", fontWeight: 500 }} // Set tick color and size 
            axisLine={false} // Remove the Y axis line 
            tickLine={false} // Remove Y axis tick lines 
          /> 
          <Tooltip /> 
          <CartesianGrid strokeDasharray="3 3" vertical={false} /> 
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#2268D1" 
            strokeWidth={1} 
            dot={false} 
          /> 
        </LineChart> 
      </ResponsiveContainer> 
    </div> 
  ); 
}; 

export default LineChartComponent; 

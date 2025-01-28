import { FC } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  TooltipProps,
} from "recharts";

const data = [
  { name: "Jan", value: 0 },
  { name: "Feb", value: 25 },
  { name: "Mar", value: 50 },
  { name: "Apr", value: 110 },
  { name: "May", value: 150 },
  { name: "Jun", value: 160 },
  { name: "Jul", value: 155 },
  { name: "Aug", value: 170 },
  { name: "Sep", value: 200 },
  { name: "Oct", value: 230 },
  { name: "Nov", value: 260 },
  { name: "Dec", value: 275 },
];

const AreaChartComponent: FC = () => {
  const renderTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      console.log(payload);
      return (
        <div className="bg-[#0B1739] text-white rounded-md p-3  w-[150px]">
          <p className="flex items-center gap-2">
            {`${payload[0].value}K`}{" "}
            <span className="bg-[#05C16833] px-1 rounded-sm text-[10px] flex border items-center border-sm text-[#14CA74] border-[#05C16833]">
              12.5%
              <svg
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_789_16456)">
                  <path
                    d="M1.38249 7.22852L6.71582 1.89518"
                    stroke="#14CA74"
                    stroke-width="0.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.71582 6.92383V1.89554H1.68754"
                    stroke="#14CA74"
                    stroke-width="0.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_789_16456">
                    <rect
                      width="8"
                      height="8"
                      fill="white"
                      transform="translate(0.0488281 0.5625)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </p>
          <p className="text-[10px] text-[#AEB9E1]">
            {payload[0].payload.name}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#d1b3ff" stopOpacity={0.8} />{" "}
            {/* Lighter purple */}
            <stop offset="95%" stopColor="#d1b3ff" stopOpacity={0} />{" "}
            {/* Lighter purple */}
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          tick={{ fontSize: 10, fill: "#363636", fontWeight: 500 }} // Set tick color and size
          axisLine={false} // Remove the X axis line
          tickLine={false} // Remove X axis tick lines
        />
        <YAxis
          tickFormatter={(value) => `${value}K`}
          domain={[0, 250]} // Y-axis range from 0 to 250K
          ticks={[0, 50, 100, 150, 200, 250]} // Set the intervals at 50k
          tick={{ fontSize: 12, fill: "#363636", fontWeight: 500 }} // Set tick color and size
          axisLine={false} // Remove the Y axis line
          tickLine={false} // Remove Y axis tick lines
        />
        <Tooltip content={renderTooltip} />
        <CartesianGrid
          strokeDasharray="0"
          strokeWidth={0.5}
          horizontal
          vertical={false}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#a855f7"
          fill="url(#color)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;

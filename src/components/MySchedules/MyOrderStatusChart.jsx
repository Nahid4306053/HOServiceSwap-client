import React, { PureComponent, useEffect, useRef, useState } from "react";
import { PieChart, Pie, Sector, Cell, Bar } from "recharts";

export default function MyOrderStatusChart({data}) {
  const [pending,setpeinding] = useState();                  
  const [progress,setprogress] = useState();                  
  const [completed,setcompleted] = useState();  

  const [pichartarea , setpichartarea] = useState({});

  const picahrtdata = [
    { name: "Pending", value: pending},
     { name: "Progress", value: progress },
     { name: "Completed", value: completed },
        ];                
  useEffect(()=>{
  if(data){
    const pend = data.filter(ele=> ele.status === 'pending');                 
    const prg = data.filter(ele=> ele.status === 'progress');                 
    const cmlet = data.filter(ele=> ele.status === 'completed');
    setpeinding(pend.length)                   
    setprogress(prg.length)                 
    setcompleted(cmlet.length)                 
  }
  },[data]);   
 

useEffect(() => {  
  const conatiner = document.getElementById("container");
  const handleResize = () => {
    if (conatiner) {
      const width = conatiner.clientWidth;

      if(width > 750){
        setpichartarea({
          width : width,
          height : 500,
          piarea: 200
        });
       
      } 
      else if(width > 500){
        setpichartarea({
          width : width,
          height : 600,
          piarea: 230
        });
        }   
        else{
          setpichartarea({
            width : width,
            height : 400,
            piarea: 150
          });
        }
    }
  };

  window.addEventListener("resize", handleResize);

  handleResize();
  return () => {
    window.removeEventListener("resize", handleResize);
  };

  
}, []);          
 
const COLORS = ["#FF444A", "#5f27cd", "#36D399"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius, 
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

  return (
     data && 
    <div id="container"  className=" conatiner w-full mx-auto">
    <div className="bg-green-100 fle rounded-lg pb-5 my-20">
    <PieChart className="flex font-Montserrat   justify-center" width={ Object.keys(pichartarea).length > 0 && pichartarea.width} height={Object.keys(pichartarea).length > 0 && pichartarea.height}>
      <Pie
        className="active:outline-none font-bold md:text-xl"
        data={picahrtdata} 
        cx="50%"
        cy="50%"
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={Object.keys(pichartarea).length > 0 && pichartarea.piarea}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>  
    <div className="bar my-10 flex  flex-col items-center justify-center w-full gap-5 ">
    <div className="total flex items-center gap-5 font-bold"><p >Pending Service Orders</p>
     <div className="bg-[#FF444A] h-[15px] w-[100px] "></div></div>   
     
     <div className="total flex items-center gap-5 font-bold"><p >Progress Service Orders</p>
     <div className="bg-[#5F27CD] h-[15px] w-[100px] "></div></div>  

     <div className="total flex items-center gap-5 font-bold"><p >Completed Service Orders</p>
     <div className="bg-[#00C49F] h-[15px] w-[100px] "></div>
     </div> 

     </div>           
    </div>
    
  </div>
  )
}

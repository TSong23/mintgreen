import React from 'react';
import { ReferenceLine, ResponsiveContainer, LineChart, Line, Tooltip, XAxis, YAxis } from 'recharts';


export default class StockChart extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchStockIntraday(this.props.match.params.ticker);
    console.log("api call made")
  }

  componentDidUpdate(prevProps){
    if (prevProps.match.params.ticker !== this.props.match.params.ticker){
      this.props.fetchStockIntraday(this.props.match.params.ticker);
      console.log("api call made")
    } else if(this.props.time !== "1d" && (this.props.time !== prevProps.time) ){
      this.props.fetchStockPastData(this.props.match.params.ticker, this.props.time);
      console.log("api call made")
    }
  }

  render() {
    
    let data = [];

    if(this.props.time === "1d"){
      Object.values(this.props.intraday).map(dayData => {
        if (dayData.close){
          data.push({ time: dayData.minute, Close: dayData.close })
        } 
      })
    }else {
      Object.values(this.props.historical).map(dayData => {
        if (dayData.close) {
          data.push({ time: dayData.date, Close: dayData.close })
        }
      })
    }
    
    return (
      <ResponsiveContainer width="100%" height="90%" >  
        <LineChart
          data={data}
          // width={500}
          // height={340}
          margin ={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <Tooltip/>
          <XAxis dataKey = 'time' tick={false} axisLine={false}/>
          <YAxis domain={['auto', 'auto']} tick={false} axisLine={false}/>
          <Line type="monotone" dataKey="Close" stroke="#21CE99" 
            strokeWidth={2} dot={false}/>
          {/* <ReferenceLine y={refData} stroke="gray" strokeDasharray="3 3" /> */}
        </LineChart>
      </ResponsiveContainer>

    );
  }
}

//domain: allows rescaling of y axis
//tick={false} axisLine={false}
// stroke = "#21CE99" strokeWidth = { 3}

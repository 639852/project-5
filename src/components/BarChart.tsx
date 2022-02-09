/** @jsxImportSource @emotion/react */

import { ResponsiveBar } from '@nivo/bar';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { barChartStyles } from '../style';

function BarChart() {
  const date = new Date().toDateString().slice(4);
  const time = new Date().toTimeString().slice(0, 5);
  const { dataBar } = useSelector((state: RootState) => state.barChart);

  return (
    <div css={barChartStyles} className="theme">
      <h2>Completed Trends</h2>
      <span className="date">{`as of ${date}, ${time}`}</span>
      <div style={{ height: 546 }}>
        <ResponsiveBar
          data={dataBar}
          keys={['High', 'Normal', 'Low']}
          indexBy="title"
          margin={{ top: 85, right: 0, bottom: 30, left: 30 }}
          padding={0.9}
          colors={{ scheme: 'set1' }}
          borderRadius={8}
          borderWidth={14}
          borderColor={{ from: 'color' }}
          enableGridY={false}
          enableLabel={false}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'top-left',
              direction: 'row',
              translateX: 7,
              translateY: -50,
              itemsSpacing: 10,
              itemWidth: 120,
              itemHeight: 20,
              itemOpacity: 0.85,
              symbolSize: 14,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
}

export default BarChart;

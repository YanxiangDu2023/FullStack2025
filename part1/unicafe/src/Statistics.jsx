import StatisticLine from './StatisticLine';

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total === 0 ? 0 : (good - bad) / total;
  const positivePercentage = total === 0 ? 0 : (good / total) * 100;

  if (total === 0) {
    return <p>No feedback given</p>;
  }





//   return (
//     <div>
//       <StatisticLine text="Good" value={good} />
//       <StatisticLine text="Neutral" value={neutral} />
//       <StatisticLine text="Bad" value={bad} />
//       <StatisticLine text="Total" value={total} />
//       <StatisticLine text="Average" value={average.toFixed(2)} />
//       <StatisticLine text="Positive" value={`${positivePercentage.toFixed(2)}%`} />
//     </div>
//   );
// };




  return (
    <table>
      <tbody>
        <tr>
          <td>Good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>Neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>Bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>Total</td>
          <td>{total}</td>
        </tr>
        <tr>
          <td>Average</td>
          <td>{average.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Positive</td>
          <td>{positivePercentage.toFixed(2)}%</td>
          {/* // toFixed(2) 是 JavaScript 中的一个方法，用来将数字格式化为保留两位小数。 */}
        </tr>
      </tbody>
    </table>
  );
};

export default Statistics;

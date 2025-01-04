import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  // new Array(anecdotes.length).fill(0) 创建了一个长度与 anecdotes 数组相同的新数组，并用 0 填充每个元素。
  // useState 使用 new Array(anecdotes.length).fill(0) 来初始化 votes 状态。votes：存储每条名言的投票数。例如：votes = [0, 0, 0, 0, 0, 0, 0];

  const handleNextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
   // Math.random()：生成 0 到 1 之间的随机数（不包括 1）。Math.floor：向下取整，确保索引是整数。randomIndex 的范围是 0 到 anecdotes.length - 1。
    setSelected(randomIndex);
  };

  ////////////////////////////////

  const handleVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  // votes 会随着投票的增加不断更新，每次调用 setVotes 更新状态时，都会用新的数据创建一个新的副本。以下是具体过程的讲解：




  const mostVotesIndex = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleNextAnecdote}>Next anecdote</button>

      <h1>Anecdote with most votes</h1>
      {votes[mostVotesIndex] > 0 ? (
        <div>
          <p>{anecdotes[mostVotesIndex]}</p>
          <p>Has {votes[mostVotesIndex]} votes</p>
        </div>
      ) : (
        <p>No votes yet</p>
      )}
    </div>
  );
};

export default App;

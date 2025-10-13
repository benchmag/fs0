import { useState } from "react";

const Button = ({ onClick, text }) => (
  <>
    <button onClick={onClick}>{text}</button>
  </>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [voted, setVoted] = useState(false);
  const [mostVotes, setMostVotes] = useState("");

  const findMostVotes = () => {
    const maxVotes = Math.max(...votes);
    const mostVotedAnecdote = anecdotes[votes.indexOf(maxVotes)];
    setMostVotes('The anecdote with most votes is: "' + mostVotedAnecdote + '" with ' + maxVotes + ' votes.');
  };

  const handleNext = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVote = () => {
    { console.log('vote clicked') }
    { console.log(votes) }
    //if (voted) return; // Prevent multiple votes
    setVoted(true);
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
    findMostVotes();
  };

  return (
    <div>
      {anecdotes[selected]}
      <br />
      <Button onClick={handleNext} text="next anecdote" />
      <Button onClick={handleVote} text="vote" />
      <br />
      <div>This anecdote has {votes[selected]} votes</div>
      <div>{mostVotes}</div>
      <br />
    </div>
  );
};

export default App;

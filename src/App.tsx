import React, { useEffect, useState } from 'react';
import Header from 'src/components/Header';
import './App.css';
import Home from 'src/page/Home';

function App() {
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || "Status")
  const [ordering, setOrdering] = useState(localStorage.getItem('ordering') || "Title")

  useEffect(() => {
    let orderingState = localStorage.getItem('ordering');
    let groupingState = localStorage.getItem('grouping');
    if (orderingState) {
      setOrdering(orderingState);
    } else {
      orderingState = "Title";
      setOrdering("Title");
    }
    if (groupingState) {
      setGrouping(groupingState);
    } else {
      setGrouping("Status");
      groupingState = "Status";
    }
    localStorage.setItem("ordering", orderingState);
    localStorage.setItem("grouping", groupingState);
  }, [])

  return (
    <>
      <Header setGrouping={setGrouping} setOrdering={setOrdering} />
      <Home grouping={grouping} ordering={ordering} />
    </>
  );
}

export default App;

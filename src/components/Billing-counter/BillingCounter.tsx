import { useState } from "react";
import "./BillingCounter.css";

export default function BillingCounter() {
  const [noOfCounters, setNoOfCounters] = useState("");

  const [noOfItems, setNoOfItems] = useState("");

  const [queues, setQueues] = useState([]);

  const handleCounters = () => {
    const counters = parseInt(noOfCounters);
    if (counters > 0) {
      setQueues(Array.from({ length: counters }, () => []));
    }
  };

  const handleCustomers = () => {
    const items = parseInt(noOfItems);

    if (isNaN(items) || items <= 0) return;

    let shortestIdx = noOfCounters;
    let minValue = Infinity;

    queues.forEach((q, idx) => {
      const totalValue = q.reduce((sum: number, curr: number) => sum + curr, 0);
      if (totalValue < minValue) {
        minValue = totalValue;
        shortestIdx = idx;
      }
      else if(totalValue === minValue) {
        shortestIdx = Math.min(shortestIdx,idx);
      }
    });

    const newQueues = [...queues];
    newQueues[shortestIdx] = [...newQueues[shortestIdx], items];
    setQueues(newQueues);
    setNoOfItems("");
  };

  const renderCounterInput = () => {
    return (
      <div className="input-section">
        <input
          type="number"
          className="billing-counter-input"
          placeholder="no of counters"
          value={noOfCounters}
          onChange={(e) => setNoOfCounters(e.target.value)}
        ></input>
        <button onClick={handleCounters} className="input-btn">Set of counters</button>
      </div>
    );
  };

  const renderCustomerInput = () => {
    return (
      <div className="input-section">
        <input
          type="number"
          className="billing-counter-input"
          placeholder="no of customer's item"
          value={noOfItems}
          onChange={(e) => setNoOfItems(e.target.value)}
        ></input>
        <button onClick={handleCustomers} className="input-btn">Add items</button>
      </div>
    );
  };

  const renderCounter = (customerList, idx) => {
    return (
      <div className="counter-wrapper">
        <div className="counter" key={idx}>
          <h4>Counter {idx + 1}</h4>
          {customerList.map((itm, cIdx) => (
            <div className="customer-box">
              <div key={cIdx} className="queue">
                {itm}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="billing-container" data-testid="billing-container">
        <h2 data-testid="heading">Billing Counter System</h2>
        {queues.length === 0 ? renderCounterInput() : renderCustomerInput()}
        {queues.map((customerList, idx) => renderCounter(customerList, idx))}
      </div>
    </>
  );
}

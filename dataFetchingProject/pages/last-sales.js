import React, { useEffect, useState } from "react";

const LastSalesPage = () => {
  const [sales, setSales] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(
      "https://nextjs-dummyproject-37a39-default-rtdb.firebaseio.com/sales.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const transformedSales = [];
        for (const key in data) {
          transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        setSales(transformedSales);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <p>Loading....</p>;
  }
  if (!sales) {
    return <p>No Sales data yet!</p>;
  }
  return (
    <div>
      <ul>
        {sales.map((sale) => (
          <li key={sale?.id}>
            {sale.username}-${sale.volume}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LastSalesPage;

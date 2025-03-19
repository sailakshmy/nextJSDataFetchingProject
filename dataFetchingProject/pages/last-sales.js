import React, { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalesPage = (props) => {
  const [sales, setSales] = useState(props.sales);
  //   const [loading, setLoading] = useState(false);

  const { data, error } = useSWR(
    "https://nextjs-dummyproject-37a39-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  //   useEffect(() => {
  //     setLoading(true);
  //     fetch(
  //       "https://nextjs-dummyproject-37a39-default-rtdb.firebaseio.com/sales.json"
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const transformedSales = [];
  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }
  //         setSales(transformedSales);
  //         setLoading(false);
  //       });
  //   }, []);
  //   if (loading) {

  if (error) {
    return <p>No Sales data yet!</p>;
  }

  if (!data && !sales) {
    return <p>Loading....</p>;
  }
  //   if (!sales) {
  //     return <p>No Sales data yet!</p>;
  //   }
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

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-dummyproject-37a39-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();

  const transformedSales = [];
  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }
  return {
    props: {
      sales: transformedSales,
    },
    // revalidate: 10,
  };
}

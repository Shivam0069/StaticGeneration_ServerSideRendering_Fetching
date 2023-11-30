import { useEffect, useState } from "react";
import useSWR from "swr";
const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
};
function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  //   const [isLoading, setIsLoading] = useState(false);

  const { data, error, revalidate } = useSWR(
    "https://nextjs-project-93525-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );
  console.log(data);
  useEffect(() => {
    if (data) {
      const transformedData = [];
      for (const key in data) {
        transformedData.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedData);
    }
  }, [data]);
  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch("https://nextjs-project-93525-default-rtdb.firebaseio.com/sales.json")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedData = [];
  //         for (const key in data) {
  //           transformedData.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }

  //         setSales(transformedData);
  //         setIsLoading(false);
  //       });
  //   }, []);
  if (error) {
    return <p>Failed to load.</p>;
  }
  if (!sales && !data) {
    return <p>Loading...</p>;
  }
  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username}-{sale.volume}
        </li>
      ))}
    </ul>
  );
}

export default LastSalesPage;

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-project-93525-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();
  const transformedData = [];
  for (const key in data) {
    transformedData.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }
  return {
    props: { sales: transformedData },
  };
}

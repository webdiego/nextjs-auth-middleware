import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
export default function CatsFact() {
  const [fact, setFact] = React.useState();

  React.useEffect(() => {
    axios
      .get('https://type.fit/api/quotes')
      .then((res) => {
        console.log(res);
        setFact(res.data[0].text);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="text-white w-full flex items-center justify-center min-h-screen">
      <h1 className="text-center">{fact}</h1>
    </div>
  );
}

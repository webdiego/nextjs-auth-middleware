import React from 'react';
import axios from 'axios';

export default function CatsFact() {
  const [fact, setFact] = React.useState();
  const logout = async () => {
    await axios
      .post('/api/auth/logout')
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    axios
      .get('https://catfact.ninja/fact')
      .then((res) => {
        setFact(res.data.fact);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="text-white w-full flex items-center justify-center h-xl border border-white">
      <h1 className="text-center">PROTECTED ROUTE</h1>
      <h1 className="text-center">{fact}</h1>
      <button className="button" onClick={() => logout()}>
        logout
      </button>
    </div>
  );
}

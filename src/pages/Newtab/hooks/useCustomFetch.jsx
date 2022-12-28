import React from 'react';

const useCustomFetch = (url) => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };
    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useCustomFetch;

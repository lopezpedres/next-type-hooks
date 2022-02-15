require("isomorphic-fetch");


type TFetcher= TUser|TIngredient|TSupplier|TProduct|any

export const fetcher = async (url: RequestInfo, data?:TFetcher) => {
    const response = await fetch(url, {
      method: data? "POST": "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    return response.json();
  };
require("isomorphic-fetch");
export const fetcher = async (url: RequestInfo, data?:TUser|TSupplier|TIngredient) => {
    const response = await fetch(url, {
      method: data? "POST": "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    return response.json();
  };
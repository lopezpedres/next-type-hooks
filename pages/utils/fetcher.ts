require("isomorphic-fetch");
export const fetcher = async (url: RequestInfo, data:TUser) => {
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    return response.json();
  };
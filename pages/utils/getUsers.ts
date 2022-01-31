require("isomorphic-fetch");
export const getUsers = async (url: RequestInfo) => {
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};


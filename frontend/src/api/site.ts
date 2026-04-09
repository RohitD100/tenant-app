import API from "./axios";

export const getSites = async () => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");
  const res = await API.get(`/sites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createSite = async (
  name: string,
  location: string,
  status: "active" | "inactive",
) => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await API.post(
    `/sites`,
    { name, location, status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const updateSite = async (
  name: string,
  location: string,
  status: "active" | "inactive",
  siteId: string,
) => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await API.put(
    `/sites/${siteId}`,
    { name, location, status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const deleteSite = async (siteId: string) => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await API.delete(`/sites/${siteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

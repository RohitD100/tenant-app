import API from "./axios";

export const getRoles = async () => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");
  const res = await API.get(`/roles`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createRole = async (name: string, permissions: string[]) => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await API.post(
    `/roles`,
    { name, permissions },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const updateRole = async (
  name: string,
  permissions: string[],
  roleId: string,
) => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await API.put(
    `/roles/${roleId}`,
    { name, permissions },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const deleteRole = async (roleId: string) => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) throw new Error("No token found");

  const res = await API.delete(`/roles/${roleId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

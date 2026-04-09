import Site from "../models/Site";

export const createSite = async (data: { name: string; location: string }) => {
  return Site.create(data);
};

export const getSites = async () => {
  return Site.find();
};

export const updateSite = async (
  id: string,
  data: Partial<{ name: string; location: string; status: string }>,
) => {
  return Site.findByIdAndUpdate(id, data, { new: true });
};

export const deleteSite = async (id: string) => {
  return Site.findByIdAndDelete(id);
};

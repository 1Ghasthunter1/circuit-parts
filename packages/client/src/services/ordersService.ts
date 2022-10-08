export const fetchOrders = async (assemblyId: string) => {
  const { data } = await axios.get<Assembly>(
    `${apiBaseUrl}/assemblies/${assemblyId}`
  );
  return data;
};

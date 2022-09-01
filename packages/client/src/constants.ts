type NODE_ENV_TYPES = "development_vm" | "development_local" | "production";

const getApiBaseUrl = () => {
  switch (import.meta.env.VITE_NODE_ENV as NODE_ENV_TYPES) {
    case "production":
      return "/api";
    case "development_local":
      return "/api";
    case "development_vm":
      return "http://localhost:3001/api";
    default:
      throw new Error(
        `VITE_NODE_ENV is not configured directly. It should be 'development_vm', 'development_local', or 'production', not ${import.meta.env.VITE_NODE_ENV as NODE_ENV_TYPES}`
      );
  }
};
export const apiBaseUrl = getApiBaseUrl();

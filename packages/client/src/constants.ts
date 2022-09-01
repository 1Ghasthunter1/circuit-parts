const getApiBaseUrl = () => {
  switch (import.meta.env.MODE) {
    case "production":
      return "/api";
    case "development":
      return `${import.meta.env.BASE_URL}api`;
    default:
      console.log(import.meta.env.MODE);
      break;
  }
};
export const apiBaseUrl = getApiBaseUrl();

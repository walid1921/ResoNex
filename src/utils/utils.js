const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
  
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };
  
export const hasChartBeenUpdatedToday = () => {
    const lastUpdateDate = localStorage.getItem("lastUpdateDate");
    const currentDate = getCurrentDate().split(" ")[0];
  
    return lastUpdateDate === currentDate;
  };
  
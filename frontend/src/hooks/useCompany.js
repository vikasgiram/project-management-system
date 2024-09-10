const url="api/company";

const getDashboardData = async () => {
    try {
        const response = await fetch(`${url}/dashboard`);
        const data = await response.json();
        
        if(data.error){
            console.error(data.error);
            return alert(data.error);
        }
        return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  export { getDashboardData };
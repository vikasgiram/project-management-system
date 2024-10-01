import { useState, useEffect } from "react";
import { getCustomers } from "../../../../../hooks/useCustomer";
import { updateProject } from "../../../../../hooks/useProjects";

import toast from "react-hot-toast";

const GaintchartPoup = ({ handleDetails, selectedProject }) => {



    // const [customers, setCustomers] = useState([]);

    // const [projects, setProjects] = useState(selectedProject);



    // useEffect(() => {
    //     const fetchData = async () => {
    //         const data = await getCustomers();
    //         // console.log(data);
    //         if (data) {
    //             setCustomers(data.customers || []);
    //             // console.log(employees,"data from useState");
    //         }
    //     };

    //     fetchData();
    // }, []);

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setProjects((prevProjects) => ({ ...prevProjects, [name]: value }));
    // };


    // const handleProjectUpdate = async () => {
    //     try {
    //         await updateProject(projects);
    //         handleUpdate();
    //     } catch (error) {
    //         toast.error(error);
    //     }
    // };


    return (
        <>
            <div className="modal fade show" style={{ display: "flex", alignItems: 'center', backgroundColor: "#00000090" }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content p-3">
                    
                  
                    </div>
                </div>
            </div>

        </>);
}

export default GaintchartPoup;
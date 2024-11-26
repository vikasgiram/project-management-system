import { useState, useEffect } from "react";
import { getDepartment } from "../../../../../hooks/useDepartment";
import toast from "react-hot-toast";
import { updateDesignation } from "../../../../../hooks/useDesignation";
import { RequiredStar } from "../../../RequiredStar/RequiredStar";

const UpdateDesignationPopup = ({ handleUpdate, selectedDes }) => {

  const [getDepartments, setGetDepartments] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [designation, setDesignation] = useState(selectedDes);


    
  // const DependentCheckboxes = () => {
  //   const [checkboxes, setCheckboxes] = useState({
  //     parent: false,
  //     childA: false,
  //     childB: false,
  //   });
  
  //   // Handler for Parent checkbox
  //   const handleParentChange = () => {
  //     const newParentValue = !checkboxes.parent;
  //     setCheckboxes({
  //       parent: newParentValue,
  //       childA: newParentValue,
  //       childB: newParentValue,
  //     });
  //   };
  
  //   // Handler for individual child checkboxes
  //   const handleChildChange = (childName) => {
  //     setCheckboxes((prevState) => ({
  //       ...prevState,
  //       [childName]: !prevState[childName],
  //     }));
  //   };}
 

  // Fetch departments
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDepartment();
      if (data) {
        setGetDepartments(data.department || []);
      }
    };
    fetchData();
  }, []);



  // const handlePermissionChange = (permission, isChecked) => {
  //   setPermissions(prevPermissions => {
  //     // Create a copy of the existing permissions
  //     let newPermissions = [...prevPermissions];
  
  //     if (isChecked) {
  //       // Add the permission if checked
  //       if (!newPermissions.includes(permission)) {
  //         newPermissions.push(permission);
  //       }
  
  //       // Add dependencies when permission is checked
  //       switch (permission) {
  //         case 'createEmployee':
  //         case 'updateEmployee':
  //           if (!newPermissions.includes('viewDesignation')) {
  //             newPermissions.push('viewDesignation');
  //           }
  //           if (!newPermissions.includes('viewDepartment')) {
  //             newPermissions.push('viewDepartment');
  //           }
  //           break;
  
  //         case 'createProject':
  //         case 'updateProject':
  //           if (!newPermissions.includes('viewCustomer')) {
  //             newPermissions.push('viewCustomer');
  //           }
  //           break;
  
  //         case 'createTaskSheet':
  //           if (!newPermissions.includes('viewDepartment')) {
  //             newPermissions.push('viewDepartment');
  //           }
  //           if (!newPermissions.includes('viewEmployee')) {
  //             newPermissions.push('viewEmployee');
  //           }
  //           break;
  
  //         case 'createDesignation':
  //         case 'updateDesignation':
  //           if (!newPermissions.includes('viewDepartment')) {
  //             newPermissions.push('viewDepartment');
  //           }
  //           break;
  
  //       }
  //     } else {
  //       // Remove the permission if unchecked
  //       newPermissions = newPermissions.filter(p => p !== permission);
  //       // console.log(newPermissions,"unchecked");
  
  //       switch (permission) {
  //         case 'createEmployee':
  //         case 'updateEmployee':
  //           newPermissions = newPermissions.filter(p => p !== 'viewDesignation' && p !== 'viewDepartment');
  //           break;
  
  //         case 'createProject':
  //         case 'updateProject':
  //           newPermissions = newPermissions.filter(p => p !== 'viewCustomer');
  //           break;
  
  //         case 'createTaskSheet':
  //           newPermissions = newPermissions.filter(p => p !== 'viewDepartment' && p !== 'viewEmployee');
  //           break;
  
  //         case 'createDesignation':
  //         case 'updateDesignation':
  //           newPermissions = newPermissions.filter(p => p !== 'viewDepartment');
  //           break;
  
  //       }
  //     }
  
  //     return newPermissions;
  //   });
  // };
  
  const handleInputChange = (event) => {
    const { name, value,type, checked } = event.target;
    setDesignation((prevDesignation) => ({
        ...prevDesignation,
        [name]: value,
        permissions: checked
        ? [...prevDesignation.permissions, name]
        : prevDesignation.permissions.filter((permission) => permission !== name),
    }));}

  

  // Handle role addition
  const handleUpdateDesignation = async () => {
   try{
    await updateDesignation(designation);
    handleUpdate();
   }catch(error){
    toast.error(error.response.data.error);
   }
  };


  return (
    <>
      <div className="modal fade show" style={{ display: "flex", alignItems: 'center', backgroundColor: "#00000090" }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content p-3">
            <form>
            <div className="modal-header pt-0">
              <h5 className="card-title fw-bold" id="exampleModalLongTitle">
                Update Designation
              </h5>
              <button
                onClick={() => handleUpdate()}
                type="button"
                className="close px-3"
                style={{ marginLeft: "auto" }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">

              <div className="row modal_body_height">
               
                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label label_text">
                      Designation Name <RequiredStar />
                    </label>
                    <input
                      type="text"
                      value={designation.name}
                      onChange={handleInputChange}
                      className="form-control rounded-0"
                      id="name"
                      name="name"
                      required
                      aria-describedby="roleNameHelp"
                    />
                  </div>
                </div>

                {/* Department Selection */}
                <div className="col-12 col-lg-6 my-3">
                  <div className="mb-3">
                    <label htmlFor="Department" className="form-label label_text">
                      Department <RequiredStar />
                    </label>
                    <select
                      className="form-select rounded-0"
                      id="department"
                      name="department"
                      value={designation.department._id}
                      onChange={handleInputChange}
                    >
                      {/* <option value="" >{designation.department.name}</option> */}
                      {getDepartments.map((department) => (
                        <option key={department._id} value={department._id}>
                          {department.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div class="col-10 col-lg-12">

                <label htmlFor="permissions" className="form-label label_text">
                    Permissions
                  </label>

                  <div className="table-responsive">
                    <table className="table table-striped table-class" id="table-id">

                      <tr className="th_border" >
                        <th >Form Level Details</th>
                        <th >Add</th>
                        <th >View</th>
                        <th>Update</th>
                        <th >Delete</th>
                      </tr>
                      <tbody>
              
                        <tr>
  <td>Employee</td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        id="permissions"
        name="createEmployee"
          checked={designation.permissions.includes('createEmployee')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        name="viewEmployee"
        id="permissions"
          checked={designation.permissions.includes('viewEmployee')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        id="permissions"
        name="updateEmployee"
          checked={designation.permissions.includes('updateEmployee')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        id="permissions"
        name="deleteEmployee"
          checked={designation.permissions.includes('deleteEmployee')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
</tr>

<tr>
  <td>Customer</td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        id="permissions"
        name="createCustomer"
          checked={designation.permissions.includes('createCustomer')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        id="permissions"
        name="viewCustomer"
          checked={designation.permissions.includes('viewCustomer')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        id="permissions"
        name="updateCustomer"
          checked={designation.permissions.includes('updateCustomer')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        id="permissions"
        name="deleteCustomer"
          checked={designation.permissions.includes('deleteCustomer')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
</tr>

                      
                        <tr>
  <td>Project</td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
          id="permissions"
          name="createProject"
          checked={designation.permissions.includes('createProject')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        id="permissions"
        name="viewProject"
          checked={designation.permissions.includes('viewProject')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        id="permissions"
        name="updateProject"
          checked={designation.permissions.includes('updateProject')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        id="permissions"
        name="deleteProject"
          checked={designation.permissions.includes('deleteProject')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td>Task Name</td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        id="permissions"
        name="createTask"
          checked={designation.permissions.includes('createTask')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        id="permissions"
        name="viewTask"
          checked={designation.permissions.includes('viewTask')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        id="permissions"
        name="updateTask"
          checked={designation.permissions.includes('updateTask')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        id="permissions"
        name="deleteTask"
          checked={designation.permissions.includes('deleteTask')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td>Task Sheet</td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        id="permissions"
        name="createTaskSheet"
          checked={designation.permissions.includes('createTaskSheet')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        id="permissions"
        name="viewTaskSheet"
          checked={designation.permissions.includes('viewTaskSheet')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        id="permissions"
        name="updateTaskSheet"
          checked={designation.permissions.includes('updateTaskSheet')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        id="permissions"
        name="deleteTaskSheet"
          checked={designation.permissions.includes('deleteTaskSheet')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td>Department</td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        id="permissions"
        name="createDepartment"
          checked={designation.permissions.includes('createDepartment')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        id="permissions"
        name="viewDepartment"
          checked={designation.permissions.includes('viewDepartment')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        id="permissions"
        name="updateDepartment"
          checked={designation.permissions.includes('updateDepartment')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        id="permissions"
        name="deleteDepartment"
          checked={designation.permissions.includes('deleteDepartment')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
</tr>
<tr>
  <td>Designation</td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        id="permissions"
        name="createDesignation"
          checked={designation.permissions.includes('createDesignation')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        id="permissions"
        name="viewDesignation"
          checked={designation.permissions.includes('viewDesignation')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        id="permissions"
        name="updateDesignation"
        checked={designation.permissions.includes('updateDesignation')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
  <td>
    <div>
      <label className="toggler-wrapper style-22">
        <input type="checkbox"
        name="deleteDesignation"
        id="permissions"
          checked={designation.permissions.includes('deleteDesignation')}
          onChange={handleInputChange}
        />
        <div className="toggler-slider">
          <div className="toggler-knob"></div>
        </div>
      </label>
    </div>
  </td>
</tr>




                      </tbody>
                    </table>
                  </div>
                </div>


                <div className="col-12 pt-3 mt-2">
                  <button
                    type="submit"
                    onClick={handleUpdateDesignation}
                    className="w-80 btn addbtn rounded-0 add_button m-2 px-4"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="w-80 btn addbtn rounded-0 Cancel_button m-2 px-4"
                  >
                    Cancel
                  </button>
                </div>

              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateDesignationPopup;
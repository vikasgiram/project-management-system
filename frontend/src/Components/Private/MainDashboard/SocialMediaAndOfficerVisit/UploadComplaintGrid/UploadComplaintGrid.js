import { useTranslation } from "react-i18next";
import { Header } from "../../Header/Header";
import { Sidebar } from "../../Sidebar/Sidebar";
import { useState } from "react";
import Select from 'react-select'
import UploadComplaintSharePopup from "./Modal/UploadComplaintSharePopup";

export const UploadComplaintGrid = () => {
    const { t } = useTranslation()
    const [isopen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isopen);
    };

    // delete

    const [deletePopUpShow, setdeletePopUpShow] = useState(false)

    const handelDeleteClosePopUpClick = () => {
        setdeletePopUpShow(false)
    }


    // add
    // const [addPopUpShow, setaddPopUpShow] = useState()
    const [SharePopUpShow, setSharePopUpShow] = useState(false)

    const handleShare = () => {
        setSharePopUpShow(!SharePopUpShow)
    }


    const [Language, setLanguage] = useState({
        DDL: [],
        ID: 0,
        Label: sessionStorage.getItem('LanguageChange')
    })


    const [DDLID, setDDLID] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const options = [
        { id: 1, value: 1, label: '1' },
        { id: 2, value: 2, label: '2' },
    ]


    return (
        <>
            <div className="container-scroller">
                <div className="row background_main_all">
                    <Header
                        Language={Language}
                        setLanguage={setLanguage}
                        toggle={toggle} isopen={isopen} />
                    <div className="container-fluid page-body-wrapper">
                        <Sidebar isopen={isopen} active="dashboard" />
                        <div className="main-panel" style={{ width: isopen ? "" : "calc(100%  - 120px )", marginLeft: isopen ? "" : "125px" }}>
                            <div className="content-wrapper ps-3 ps-md-0 pt-3">
                                <div className="row">
                                    <div className="col-12">
                                        {/* Upload Complaint */}
                                        <h5 className="text-white fw-bold ps-3">{t('EncroachmentDashboard.Uploadcomplaint')}
                                            {/* <span className="float-end add_btn">Add</span> */}
                                            {/* <span className="add_btn  float-end cursor-pointer" onClick={() => {
                                                handleAddDepartment(true)
                                            }}
                                                title="Add">
                                                <i class="fa-solid fa-plus pe-1"></i> Add
                                            </span> */}
                                        </h5>
                                    </div>
                                </div>
                                <div className="row ps-3 py-3 table_styles" >

                                    <div class="col-12 col-lg-3 pt-3">

                                        <label for="fname" className=" pb-2">{t('EncroachmentDashboard.FromDate')}</label><br />
                                        <input type="date" placeholder="" name="date" className="form-control" id="email" required />
                                    </div>

                                    <div class="col-12 col-lg-3 pt-3">

                                        <label for="fname" className=" pb-2">{t('EncroachmentDashboard.ToDate')}</label><br />
                                        <input type="date" placeholder="" name="date" className="form-control" id="email" required />
                                    </div>


                                    <div class="col-12 col-lg-3 pt-3">
                                        <label for="fname" className=" pb-2">{t('EncroachmentDashboard.ZoneName')}</label><br />
                                        <Select
                                            id='DDLID'
                                            isClearable={false}
                                            // isRtl={isRtl}
                                            isSearchable
                                            maxMenuHeight={130}
                                            value={{ value: DDLID.ID, label: DDLID.Label }}
                                            onChange={(e) => {
                                                e ?
                                                    setDDLID({ ...DDLID, ID: e.value, Label: e.label })
                                                    :
                                                    setDDLID({ ...DDLID, ID: 0, Label: "Select..." })

                                            }}
                                            options={options}
                                        />
                                    </div>

                                    <div className="row" >
                                        <div className="col-12  " >
                                            <div className="table-responsive pt-3">
                                                <table className="table table-striped table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th className="w-6 text-center">{t('EncroachmentDashboard.SrNo')}</th>
                                                            <th className="text-center">{t('EncroachmentDashboard.UploadComplaintDate')}</th>
                                                            <th className="text-center">{t('EncroachmentDashboard.ZoneName')}</th>
                                                            <th className="text-center">{t('EncroachmentDashboard.UploadComplaintPhoto')}</th>
                                                            <th className="text-center">{t('EncroachmentDashboard.Action')}</th>
                                                        </tr>

                                                    </thead>
                                                    <tbody>

                                                        <tr>
                                                            <td className="py-1" align="center">1</td>
                                                            <td className="text-center"></td>
                                                            <td className="text-center"></td>
                                                            <td className="text-center">
                                                                <span className="view_button">
                                                                    {t('EncroachmentDashboard.View')}
                                                                </span>
                                                            </td>

                                                            <td className="text-center">

                                                                {/* <span className="" onClick={() => {
                                                                    handleAddDepartment()
                                                                }}
                                                                    title="Edit">
                                                                    <i className="fa-solid fa-pen-to-square mx-2 text-success cursor-pointer"></i>
                                                                </span> */}

                                                                <span className="" 
                                                                onClick={() => {
                                                                    handleShare()
                                                                }}
                                                                    title="Share">
                                                                    <i className="fa-solid fa-share-from-square mx-2 text-success cursor-pointer"></i>
                                                                </span>



                                                                {/* <i className="fa-solid fa-trash mx-2 text-danger fs-7 cursor-pointer"
                                                                    onClick={() => {
                                                                        setdeletePopUpShow(true)
                                                                    }}
                                                                    title="Delete">

                                                                </i> */}
                                                            </td>

                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* {deletePopUpShow ?
                <DeletePopUP
                    message={"Are you sure! Do you want to Delete ?"}
                    cancelBtnCallBack={handelDeleteClosePopUpClick}
                    // confirmBtnCallBack={handelDeleteClick}
                    heading="Delete"
                /> : <></>
            } */}

            {SharePopUpShow ?
                <UploadComplaintSharePopup
                    message="Add"
                    handleShare={handleShare}
                    // heading="Forward"
                    // cancelBtnCallBack={handleAddDepartment}
                /> : <></>
            }
        </>
    )
}


import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import ServicesBanner from "../src/images/ServicesBanner.jpg";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { useContext, useEffect, useState } from "react"
import AdminContext from "../src/context/AdminContext";

export default function Services() {
    const adminContext = useContext(AdminContext);
    const isAdminLoggedIn = adminContext.loggedIn; 
    const [servicesList, setServicesList] = useState([]);
    const [slChanged, setSLChanged] = useState(true);
    const [muaServicesList, setMuaServicesList] = useState([]);
    const [estiServicesList, setEstiServicesList] = useState([]);
    const servicesType = ['Makeup Services','Esthetician Services'];

    useEffect(() => {
        getServicesList();
    }, [slChanged]);
    
    async function getServicesList() {
        
        const response = await fetch("http://localhost:3000/cakedByKim/getServicesList", {
                method: "GET",
                headers: {
                    'Content-Type': "application/json"
                }
            });

        const data = await response.json();
  console.log('data', data)
        setServicesList(data);
        setMuaServicesList(data.filter(x => x.servicesListType === servicesType[0]));
        setEstiServicesList(data.filter(x => x.servicesListType === servicesType[1]));
        setSLChanged(false);
        
    }

    const handleEdit = (e, servicesListNum) => {
        
        const textId = servicesListNum;
        const editId = 'edit_s' + servicesListNum;
        const deleteId = 'delete_s' + servicesListNum;
        const saveId = 'save_s' + servicesListNum;
        const cancelId = 'cancel_s' + servicesListNum;

        document.getElementById(textId).contentEditable = "true";
        document.getElementById(textId).focus();
        document.getElementById(editId).style.display = "none";
        document.getElementById(deleteId).style.display = "none";
        document.getElementById(saveId).style.display = "inline";
        document.getElementById(cancelId).style.display = "inline";

    }

    const handleSave = async (e,servicesListNum) => {
        
        const textId = servicesListNum;
        const editId = 'edit_s' + servicesListNum;
        const deleteId = 'delete_s' + servicesListNum;
        const saveId = 'save_s' + servicesListNum;
        const cancelId = 'cancel_s' + servicesListNum;
        const newValue = document.getElementById(textId).innerText;
        const oldValue = (servicesList.filter(x => x.servicesListNum == textId)[0]).servicesListHeading;
        
        if (oldValue != newValue)
        {
            const body = {servicesListNum: textId, servicesListHeading: newValue};

            const response = await fetch("http://localhost:3000/cakedByKim/saveServicesList", {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': "application/json"
                }
            });
        
            const data = await response.json();

            if (data.message == "Services List NOT Saved!")
            {
                alert("An Error Occurred: Update Was Not Saved.");
            }
            else
            {
                setSLChanged(true);
            }    

        }
        
        document.getElementById(textId).contentEditable = "false";
        document.getElementById(saveId).style.display = "none";
        document.getElementById(cancelId).style.display = "none";
        document.getElementById(editId).style.display = "inline";
        document.getElementById(deleteId).style.display = "inline";
    }

    const handleCancel = (e,servicesListNum) => {
        
        const textId = servicesListNum;
        const editId = 'edit_s' + servicesListNum;
        const deleteId = 'delete_s' + servicesListNum;
        const saveId = 'save_s' + servicesListNum;
        const cancelId = 'cancel_s' + servicesListNum;
        const oldValue = (servicesList.filter(x => x.servicesListNum == textId)[0]).servicesListHeading;

        document.getElementById(textId).contentEditable = "false";
        document.getElementById(textId).innerText = oldValue;
        document.getElementById(cancelId).style.display = "none";
        document.getElementById(saveId).style.display = "none";
        document.getElementById(editId).style.display = "inline";
        document.getElementById(deleteId).style.display = "inline";
    }

    const handleDelete = async (e,servicesListNum) => {

        const textId = servicesListNum;
        const editId = 'edit_s' + servicesListNum;
        const deleteId = 'delete_s' + servicesListNum;
        
        const body = {servicesListNum: textId};

        const response = await fetch("http://localhost:3000/cakedByKim/deleteServicesList", {
            method: "DELETE",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': "application/json"
            }
        });
    
        const data = await response.json();
        if (data.message == "Services List NOT Deleted!")
        {
            alert("An Error Occurred With Delete.");
        }
        else
        {
            setSLChanged(true);
        }

        document.getElementById(textId).style.display = "none";
        document.getElementById(editId).style.display = "none";
        document.getElementById(deleteId).style.display = "none";
    }

    const handleAdd = (e,slType) => {
        const textId = "newTextId_" + slType;
        const saveId = "addsave_s" + slType;
        const cancelId = "addcancel_s" + slType;
        
        // console.log(`ADD: TextId: ${textId}, SaveId: ${saveId}, CancelId: ${cancelId}`);

        document.getElementById(textId).style.display = "inline";
        document.getElementById(textId).contentEditable = "true";
        document.getElementById(textId).focus();
        document.getElementById(saveId).style.display = "inline";
        document.getElementById(cancelId).style.display = "inline";

    }

    const handleSaveAdd = async (e,servicesListType) => {
        
        const textId = 'newTextId_' + servicesListType;
        const saveId = 'addsave_s' + servicesListType;
        const cancelId = 'addcancel_s' + servicesListType;
        const newValue = document.getElementById(textId).value;
        const maxValue = Math.max(...servicesList.map(x => x.servicesListNum), 0)+1;
        const slType = servicesListType == "MUA" ? servicesType[0] : servicesType[1];
        // console.log('MaxValue',maxValue);
        // console.log('newValue',newValue);
        // console.log('slType',slType);
        document.getElementById(textId).contentEditable = "false";
        document.getElementById(textId).style.display = "none"; 
        document.getElementById(saveId).style.display = "none";
        document.getElementById(cancelId).style.display = "none";
        
        const body = {servicesListNum: maxValue, servicesListHeading: newValue, servicesListType: slType};
        const response = await fetch("http://localhost:3000/cakedByKim/saveServicesList", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': "application/json"
            }
        });
    
        const data = await response.json();

        if (data.message == "Services List NOT Saved!")
        {
            alert("An Error Occurred: Update Was Not Saved.");
        }
        else
        {
            setSLChanged(true);
        }    
}

    const handleCancelAdd = (e,servicesListType) => {
        
        const textId = 'newTextId_' + servicesListType;
        const saveId = 'addsave_s' + servicesListType;
        const cancelId = 'addcancel_s' + servicesListType;
        
        // console.log(`CANCEL Add: CancelId: ${cancelId} saveId: ${saveId} editId: ${editId} deleteId: ${deleteId}, textid: ${textId}, oldValue: ${oldValue}`)
        document.getElementById(textId).value = "";
        document.getElementById(textId).contentEditable = "false";
        document.getElementById(textId).style.display = "none";
        document.getElementById(cancelId).style.display = "none";
        document.getElementById(saveId).style.display = "none";
    }

    return (
        <>
        <Box
            sx={{
                
                width: '100%',
                height: '250px',
                overflow: "hidden",
                my: '16px',
                backgroundImage: `url(${ServicesBanner})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 5
            }}
        > 
        <Typography variant="h2" color="primary" ml={8}>Services</Typography>
        </Box>
        { 
                muaServicesList.length > 0 && 
                <>
                <Typography variant="h4" color="secondary" ml={8}>{servicesType[0]}
                    {isAdminLoggedIn && 
                    <Tooltip title="Add New">
                    <IconButton color="secondary"  onClick={(e) => handleAdd(e, "MUA")}>
                        <AddIcon id={"add_sMUA"} fontSize="medium" sx={{stroke: "darkgray", strokeWidth: 2, ml: 1}}/>
                    </IconButton>
                    </Tooltip>}
                </Typography> 
                </>
        }
        <List>
        {
            muaServicesList.length > 0 && muaServicesList.map((muaService) => {
                return <ListItem key={muaService._id} disableGutters> 
                        <ListItemText key={muaService._id + "_lti"} sx={{mx:10, px:2, pb:1}}> 
                        {isAdminLoggedIn && 
                        <>
                        <Tooltip title="Delete">
                        <IconButton color="secondary" sx={{float:"right"}} onClick={(e) => handleDelete(e, muaService.servicesListNum)}>
                            <DeleteIcon id={"delete_s" + muaService.servicesListNum} fontSize="medium"/>
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                        <IconButton color="secondary" sx={{float:"right"}} onClick={(e) => handleEdit(e, muaService.servicesListNum)}>
                            <EditIcon id={"edit_s" + muaService.servicesListNum} fontSize="medium"/>
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel">
                        <IconButton id={"ibcancel_s" + muaService.servicesListNum} color="secondary" sx={{float:"right"}} onClick={(e) => handleCancel(e, muaService.servicesListNum)}>
                            <ClearIcon id={"cancel_s" + muaService.servicesListNum} fontSize="medium" sx={{display: "none", stroke: "darkgray", strokeWidth: 2}} />
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Save">
                        <IconButton id={"ibsave_s" + muaService.servicesListNum} color="secondary" sx={{float:"right"}} onClick={(e) => handleSave(e, muaService.servicesListNum)}>
                            <CheckIcon id={"save_s" + muaService.servicesListNum} fontSize="medium" sx={{display: "none", stroke: "darkgray", strokeWidth: 2}}/>
                        </IconButton>
                        </Tooltip>
                        </>}
                            <div id={muaService.servicesListNum} style={{width: 400}}>
                                <span id={'Heading_' + muaService.servicesListNum}>{muaService.servicesListHeading}</span>
                                <span id={'Description_' + muaService.servicesListNum}>{muaService.servicesListDescription}</span>
                                <span id={'SubHeading_' + muaService.servicesListNum}><ul>{muaService.servicesListSubHeadings.map((subhead) => {<li>{subhead}</li>})}</ul></span>
                            </div> 
                        </ListItemText>
                        </ListItem>
            })        
        }
        <ListItem key="newMUAId" disableGutters> 
        <ListItemText key="newMUAId_lti" sx={{mx:10, px:2, pb:1}}> 
        <Tooltip title="Cancel">
        <IconButton id={"ibaddcancel_sMUA"} color="secondary" sx={{float:"right"}} onClick={(e) => handleCancelAdd(e, "MUA")}>
            <ClearIcon id={"addcancel_sMUA"} fontSize="medium" sx={{display: "none", stroke: "darkgray", strokeWidth: 2}} />
        </IconButton>
        </Tooltip>
        <Tooltip title="Save">
        <IconButton id={"ibaddsave_sMUA"} color="secondary" sx={{float:"right"}} onClick={(e) => handleSaveAdd(e, "MUA")}>
            <CheckIcon id={"addsave_sMUA"} fontSize="medium" sx={{display: "none", stroke: "darkgray", strokeWidth: 2}}/>
        </IconButton>
        </Tooltip>
        <input type="text" id="newTextId_MUA" style={{display: "none", width: 500, padding: 2,margin: 4, size: 10}}/>
        </ListItemText>
        </ListItem>
        </List>
        {
                estiServicesList.length > 0 && 
                <Typography variant="h4" color="secondary" ml={8}>{servicesType[1]}
                {isAdminLoggedIn && <Tooltip title="Add New">
                    <IconButton color="secondary"  onClick={(e) => handleAdd(e, "ESTI")}>
                        <AddIcon id={"add_sESTI"} fontSize="medium" sx={{stroke: "darkgray", strokeWidth: 2, ml: 1}}/>
                    </IconButton>
                </Tooltip>}
                </Typography>
                
        }
        <List>
        {
            estiServicesList.length > 0 && estiServicesList.map((estiService) => {
                return <ListItem key={estiService._id} disableGutters> 
                        <ListItemText key={estiService._id + "_lti"} sx={{mx:10, px:2, pb:1}}>
                        {isAdminLoggedIn && 
                            <>
                            <Tooltip title="Delete">
                            <IconButton color="secondary" sx={{float:"right"}} onClick={(e) => handleDelete(e, estiService.servicesListNum)}>
                                <DeleteIcon id={"delete_s" + estiService.servicesListNum} fontSize="medium"/>
                            </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                            <IconButton color="secondary" sx={{float:"right"}} onClick={(e) => handleEdit(e, estiService.servicesListNum)}>
                                <EditIcon id={"edit_s" + estiService.servicesListNum} fontSize="medium"/>
                            </IconButton>
                            </Tooltip>
                            <Tooltip title="Cancel">
                            <IconButton id={"ibcancel_s" + estiService.servicesListNum} color="secondary" sx={{float:"right"}} onClick={(e) => handleCancel(e, estiService.servicesListNum)}>
                                <ClearIcon id={"cancel_s" + estiService.servicesListNum} fontSize="medium" sx={{display: "none", stroke: "darkgray", strokeWidth: 2}} />
                            </IconButton>
                            </Tooltip>
                            <Tooltip title="Save">
                            <IconButton id={"ibsave_s" + estiService.servicesListNum}  color="secondary" sx={{float:"right"}} onClick={(e) => handleSave(e, estiService.servicesListNum)}>
                                <CheckIcon id={"save_s" + estiService.servicesListNum} fontSize="medium" sx={{display: "none", stroke: "darkgray", strokeWidth: 2}}/>
                            </IconButton>
                            </Tooltip>
                            </>
                        }
                            <div id={estiService.servicesListNum} style={{width: 400}}>{estiService.servicesListHeading}</div> 
                        </ListItemText>
                 </ListItem>
            })        
        }
        <ListItem key="newESTIId" disableGutters> 
        <ListItemText key="newESTIId_lti" sx={{mx:10, px:2, pb:1}}> 
        <Tooltip title="Cancel">
        <IconButton id={"ibaddcancel_sESTI"} color="secondary" sx={{float:"right"}} onClick={(e) => handleCancelAdd(e, "ESTI")}>
            <ClearIcon id={"addcancel_sESTI"} fontSize="medium" sx={{display: "none", stroke: "darkgray", strokeWidth: 2}} />
        </IconButton>
        </Tooltip>
        <Tooltip title="Save">
        <IconButton id={"ibaddsave_sESTI"} color="secondary" sx={{float:"right"}} onClick={(e) => handleSaveAdd(e, "ESTI")}>
            <CheckIcon id={"addsave_sESTI"} fontSize="medium" sx={{display: "none", stroke: "darkgray", strokeWidth: 2}}/>
        </IconButton>
        </Tooltip>
        <input type="text" id="newTextId_ESTI" style={{display: "none", width: 500, padding: 2,margin: 4, size: 10}}/>
        </ListItemText>
        </ListItem>
        </List>
        </>
    )
}
import Typography from "@mui/material/Typography";
import { Box, Paper } from "@mui/material";
import ServicesBanner from "../src/images/ServiceBanner.jpg";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import { useContext, useEffect, useState } from "react"
import AdminContext from "../src/context/AdminContext";
import {Fragment} from "react"


export default function Services() {
    const adminContext = useContext(AdminContext);
    const isAdminLoggedIn = adminContext.loggedIn; 
    const [servicesList, setServicesList] = useState([]);
    const [slChanged, setSLChanged] = useState(true);
    const servicesType = [{abbrev: "MUA", type: "Makeup Services"},{abbrev: "ESTI", type: "Esthetician Services"}];

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
        
        setServicesList(data);
        setSLChanged(false);

    }

    const handleEdit = (e, servicesListNum) => {
        
        const textId = servicesListNum;
        const editId = 'edit_s' + servicesListNum;
        const deleteId = 'delete_s' + servicesListNum;
        const saveId = 'save_s' + servicesListNum;
        const cancelId = 'cancel_s' + servicesListNum;

        document.getElementById("SH_" + textId).contentEditable = "true";
        document.getElementById("SD_" + textId).contentEditable = "true";
        document.getElementById("SSH_" + textId).contentEditable = "true";
        document.getElementById("SH_" + textId).style.outline = "2px solid blue";
        document.getElementById("SD_" + textId).style.outline = "2px solid blue";
        document.getElementById("SD_" + textId).style.marginTop = "15px";
        document.getElementById("SSH_" + textId).style.outline = "2px solid blue";
        document.getElementById("SSH_" + textId).style.marginTop = "15px";
        document.getElementById("SH_" + textId).focus();
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
        const newValueSH = document.getElementById("SH_" + textId).innerText;
        const newValueSD = document.getElementById("SD_" + textId).innerText;
        const newValueSSH = document.getElementById("SSH_" + textId).innerText;
        const newSSH = newValueSSH.split('\n');
        
        const body = {servicesListNum: textId, servicesListHeading: newValueSH, servicesListDescription: newValueSD, servicesListSubHeadings: newSSH};

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

        document.getElementById("SH_" + textId).contentEditable = "false";
        document.getElementById("SD_" + textId).contentEditable = "false";
        document.getElementById("SSH_" + textId).contentEditable = "false";
        document.getElementById("SH_" + textId).style.outline = "none";
        document.getElementById("SD_" + textId).style.outline = "none";
        document.getElementById("SSH_" + textId).style.outline = "none";
        document.getElementById(saveId).style.display = "none";
        document.getElementById(cancelId).style.display = "none";
        document.getElementById(editId).style.display = "inline";
        document.getElementById(deleteId).style.display = "inline";
        window.location.reload();
    }

    const handleCancel = () => {
        window.location.reload();
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

        document.getElementById(editId).style.display = "none";
        document.getElementById(deleteId).style.display = "none";
    
    }

    const handleAdd = (e,abbrev) => {
        
        const formId = "newFormId_" + abbrev;
        const saveId = "addsave_s" + abbrev;
        const cancelId = "addcancel_s" + abbrev;
        
        // console.log(`ADD: TextId: ${textId}, SaveId: ${saveId}, CancelId: ${cancelId}`);
        
        document.getElementById(formId).style.display = "inline";
        document.getElementById(saveId).style.display = "inline";
        document.getElementById(cancelId).style.display = "inline";

    }

    const handleSaveAdd = async (e,abbrev,type) => {
        
        const formId = "newFormId_" + abbrev;
        const textSHId = 'newIdSH_' + abbrev;
        const textSDId = 'newIdSD_' + abbrev;
        const textSSHId = 'newIdSSH_' + abbrev;
        const saveId = 'addsave_s' + abbrev;
        const cancelId = 'addcancel_s' + abbrev;
        const newSHValue = document.getElementById(textSHId).value;
        const newSDValue = document.getElementById(textSDId).value;
        const newSSHValue = document.getElementById(textSSHId).value;
        const newSSH = newSSHValue.split('\n');
        const maxValue = Math.max(...servicesList.map(x => x.servicesListNum), 0)+1;

        document.getElementById(formId).style.display = "none";
        document.getElementById(saveId).style.display = "none";
        document.getElementById(cancelId).style.display = "none";
        
        const body = {servicesListNum: maxValue, servicesListHeading: newSHValue, servicesListDescription: newSDValue, servicesListSubHeadings: newSSH, servicesListType: type};

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

    const handleCancelAdd = (e,abbrev) => {
        
        const formId = "newFormId_" + abbrev;
        const textSHId = 'newIdSH_' + abbrev;
        const textSDId = 'newIdSD_' + abbrev;
        const textSSHId = 'newIdSSH_' + abbrev;
        
        const saveId = 'addsave_s' + abbrev;
        const cancelId = 'addcancel_s' + abbrev;
        
        // console.log(`CANCEL Add: CancelId: ${cancelId} saveId: ${saveId} editId: ${editId} deleteId: ${deleteId}, textid: ${textId}, oldValue: ${oldValue}`)

        document.getElementById(textSHId).value = "";        
        document.getElementById(textSDId).value = "";
        document.getElementById(textSSHId).value = "";
        document.getElementById(formId).style.display = "none";
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
        <Typography variant="h2" color="secondary" ml={8}>Services</Typography>
        </Box>
        {servicesType.map((item, index) => {
            return <Fragment key={index}>
            <Typography variant="h4" color="secondary" ml={8} key={index}>{item.type}
            {isAdminLoggedIn && 
            <Tooltip title="Add New">
            <IconButton color="secondary"  onClick={(e) => handleAdd(e, item.abbrev)}>
                <AddIcon id={"add_s"+ item.abbrev} fontSize="medium" sx={{stroke: "darkgray", strokeWidth: 2, ml: 1}}/>
            </IconButton>
            </Tooltip>}
            </Typography>
            {servicesList.length > 0 && servicesList.filter(sl => sl.servicesListType == item.type).map((service) => 
                    <ListItem key={service._id} disableGutters> 
                    <ListItemText key={service._id + "_lti"} sx={{mx:10, px:2, pb:1}}>
                        {isAdminLoggedIn && 
                        <>
                        <Tooltip title="Delete">
                        <IconButton color="secondary" sx={{float:"right"}} onClick={(e) => handleDelete(e, service.servicesListNum)}>
                            <DeleteIcon id={"delete_s" + service.servicesListNum} fontSize="medium"/>
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Service">
                        <IconButton color="secondary" sx={{float:"right"}} onClick={(e) => handleEdit(e, service.servicesListNum)}>
                            <EditIcon id={"edit_s" + service.servicesListNum} fontSize="medium"/>
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel">
                        <IconButton id={"ibcancel_s" + service.servicesListNum} color="secondary" sx={{float:"right"}} onClick={handleCancel}>
                            <ClearIcon id={"cancel_s" + service.servicesListNum} fontSize="medium" sx={{display: "none", stroke: "darkgray", strokeWidth: 2}} />
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Save">
                        <IconButton id={"ibsave_s" + service.servicesListNum} color="secondary" sx={{float:"right"}} onClick={(e) => handleSave(e, service.servicesListNum)}>
                            <CheckIcon id={"save_s" + service.servicesListNum} fontSize="medium" sx={{display: "none", stroke: "darkgray", strokeWidth: 2}}/>
                        </IconButton>
                        </Tooltip>
                        </>} 
                        <div id={"SH_" + service.servicesListNum} key={"SH_" + service.servicesListNum} style={{width: 400}}>
                        <Typography id={'Heading_' + service.servicesListNum} key={'Heading_' + service.servicesListNum} sx={{pb:1, fontSize: "1.2em"}}>{service.servicesListHeading}</Typography>
                        </div>
                        <div id={"SD_" + service.servicesListNum} key={"SD_" + service.servicesListNum} style={{width: 400}}>
                            <Typography id={'Description_' + service.servicesListNum} key={'Description_' + service.servicesListNum} sx={{sm: "75%", fontWeight: "italic"}} >{service.servicesListDescription}</Typography>
                        </div>
                        <div id={"SSH_" + service.servicesListNum} key={"SSH_" + service.servicesListNum} style={{width: 400}}>
                            <List>
                            {service.servicesListSubHeadings.map((subhead, index) => <ListSubheader sx={{my:0, height: 40, fontSize: "1em"}} key={"sh_" + index}>{subhead}</ListSubheader>)}    
                            </List>
                        </div>
                        </ListItemText>
                    </ListItem>
                    )
                }
            {isAdminLoggedIn && 
            <>
            <Paper id={"newFormId_" + item.abbrev} sx={{ display: "none", mb: 5}} >
            <form method="post"  style={{width: 400, color: "GrayText"}}>
            <fieldset style={{ marginLeft: "40%", marginRight: "40%", marginBottom: 25, alignContent: "center", width: 400, p: 25}}>
                <legend>New Entry:</legend>
                <label htmlFor={"newIdSH_"+ item.abbrev}>Heading:</label><br/>
                <input type="text" id={"newIdSH_"+ item.abbrev} name="heading" style={{width: 400, padding: 2, margin: 4}}/><br/><br/>
                <label htmlFor={"newIdSD_"+ item.abbrev}>Description:</label><br/>
                <textarea type="text" id={"newIdSD_"+ item.abbrev} name="description" style={{height: 75, width: 400, padding: 2, margin: 4}}/><br/><br/>
                <label htmlFor={"newIdSSH_"+ item.abbrev}>SubHeading:</label><br/>
                <textarea type="text" id={"newIdSSH_"+ item.abbrev} name="subheading" style={{height: 100, width: 400, padding: 2, margin: 4}}/><br/><br/>
                <Tooltip title="Cancel">
                <IconButton color="secondary" sx={{float:"right"}} onClick={(e) => handleCancelAdd(e, item.abbrev)}>
                    <ClearIcon id={"addcancel_s" + item.abbrev} fontSize="medium" sx={{stroke: "darkgray", strokeWidth: 2}} />
                </IconButton>
                </Tooltip>
                <Tooltip title="Save">
                <IconButton color="secondary" sx={{float:"right"}} onClick={(e) => handleSaveAdd(e, item.abbrev, item.type)}>
                    <CheckIcon id={"addsave_s" + item.abbrev} fontSize="medium" sx={{stroke: "darkgray", strokeWidth: 2}}/>
                </IconButton>
                </Tooltip>
            </fieldset>
            </form>
            </Paper>
            </>
            }
        </Fragment>
                })  
        }

        </>
    )
}
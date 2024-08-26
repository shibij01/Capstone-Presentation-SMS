
import { Container, TextField, Typography, Autocomplete, FormControl, Button, Box } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



export function InquiryBox() {
    return (
        <Autocomplete
            disablePortal
            id="inquiryBox"
            name="inquiryType"
            options={InquiryOptions}
            sx={{ 
                width: '60vw',
                alignItems: "center",
            }}
            renderInput={(params) => <TextField {...params} label="Inquiry Type" variant="standard" required/>}
            />
        )
    }

    const InquiryOptions = [
        { label: "Wedding"},
        { label: "Photoshoot"},
        { label: "Other"}
    ];
    
    
    export function EventDateCalendar() {
        return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            label="Event Date"
            name='eventDate'
            slotProps={{
                textField: {
                    required: true,
                    variant: 'standard',
                }
            }}
            />
    </LocalizationProvider>
    );
}


export default function Inquire() {
    const url = "https://cakedbykim-capstone-presentation-sms.onrender.com";
    
    async function handleSubmit(e) {
        e.preventDefault();

        const inquiryType = e.target[0].value;
        const firstName = e.target[3].value;
        const lastName = e.target[4].value;
        const email = e.target[5].value;
        const phoneNumber = e.target[6].value;
        const numberNeedingMakeup = e.target[7].value;
        const eventDate = e.target[8].value;
        const readyLocation = e.target[10].value;
        const venueLocation = e.target[11].value;
        const timeToComplete = e.target[12].value;
        const needATrial = e.target[13].value;
        const howDidYouHear = e.target[14].value;
        const detailsQuestionsNotes = e.target[15].value;
        
        const body = {
            inquiryType: inquiryType,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            numberNeedingMakeup: numberNeedingMakeup,
            eventDate: eventDate,
            readyLocation: readyLocation,
            venueLocation: venueLocation,
            timeToComplete: timeToComplete,
            needATrial: needATrial,
            howDidYouHear: howDidYouHear,
            detailsQuestionsNotes: detailsQuestionsNotes
        }
        
        const response = await fetch(url+"/cakedByKim/createInquiry", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type' : 'application/json'
            }
        });
        
        if (response.status !== 200) {
            alert("An error occurred submitting your request.");
        } else {
            alert("Request Submitted! We will be reaching out shortly.");
        }
        
        
    }
    
    return (
        <>
        <Container>
            <Typography variant="h2" color="secondary" ml={8}>Inquire</Typography>

            <Box component='form' onSubmit={(e) => {
                handleSubmit(e)
                }}>
        <FormControl
        
        sx={{
            width: '60vw',
            ml: 8
        }}

        >
            

            <InquiryBox/>            
            <TextField variant="standard" label="First Name" name="firstName" required/>
            <TextField variant="standard" label="Last Name" name="lastName" required/>
            <TextField variant="standard" label="Email Address" name="email" required/>
            <TextField variant="standard" label="Phone Number" name="phoneNumber" required/>
            <TextField variant="standard" label="How Many People Need Makeup?" name="numberNeedingMakeup" required/>
            <EventDateCalendar/>
            <TextField variant="standard" label="Getting Ready Location" name="readyLocation" required/>
            <TextField variant="standard" label="Event Venue" name="venueLocation" required/>
            <TextField variant="standard" label="Time Makeup Needs To Be Completed" name="timeToComplete" required/>
            <TextField variant="standard" label="Will You Need A Trial?" name="needATrial" required/>
            <TextField variant="standard" label="How Did You Hear About Me?" name="howDidYouHear"/>
            <TextField variant="standard" label="Details, Questions, Notes" name="detailsQuestionsNotes"/>
            <Button 
                color="secondary" 
                sx={{
                    display: 'flex',
                    border: '2px solid #A9A9A9',
                    width: 'auto',
                    my: '2vw',
                    mx: '10vw',
                }}
                type="submit"
                >Submit</Button>
            
        </FormControl>
        </Box>
        </Container>
        </>
    )
}
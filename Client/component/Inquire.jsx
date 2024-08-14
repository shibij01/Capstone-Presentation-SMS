
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
                width: '40vw',
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

    async function handleSubmit(e) {
        e.preventDefault();

        const inquiryType = e.target.inquiryType.value;
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const email = e.target.email.value;
        const phoneNumber = e.target.phonenumber.value;
        const numberNeedingMakeup = e.target.numberNeedingMakeup.value;
        const eventDate = e.target.eventDate.value;
        const readyLocation = e.target.readyLocation.value;
        const venueLocation = e.target.venueLocation.value;
        const timeToComplete = e.target.timeToComplete.value;
        const howDidYouHear = e.target.howDidYouHear.value;
        const detailsQuestionsNotes = e.target.detailsQuestionsNotes.value;

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
            howDidYouHear: howDidYouHear,
            detailsQuestionsNotes: detailsQuestionsNotes
        }

        const response = await fetch("http://localhost:3000/createInquiry", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        if (response.status !== 201) {
            alert("Error Occurred Creating Inquiry");

        }

    }


    return (
        <>
        <Container>
            <Typography variant="h2">Inquire</Typography>

            <Box component='form' onSubmit={handleSubmit}>
        <FormControl
        
        sx={{
            width: '40vw'
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
            >Submit</Button>
            
        </FormControl>
        </Box>
        </Container>
        </>
    )
}
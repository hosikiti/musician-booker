# Musician Booker

Musician Booker is a simple web platform that allows music creators / administrators to book sessions with top-notch musicians.

## Technologies Used

- Next.js for efficiently serviing both front-end UIs and back-end APIs at the same time
- Tailwind CSS for efficient styling and organized components
- Prisma (ORM) + SQLite for local database and easy data manipulation
- React Query for effectively handling API states (loading, error, success) and caching
- Axios for making and handling REST API requests, including error handling
- React Hook Form for quick and meticulous form validation
- DaisyUI for decent UI components, including drawer and avatar
- date-fns for date & hour formatting
- React Hot Toast for easily noticable error messages

## Getting Started

1. `npm install` to install dependencies
1. `npm run initdb` to initialize database with sample data
1. `npm run dev` to start the development server
1. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Architecture 

## Testing Strategy

The project includes unit testing for complex logic and components using Jest and React Testing Library. For now, the following elements are tested:

- `/src/app/musicians/components/BookingForm.tsx` for ensuring form validation logic
- `/src/lib/date.ts` for ensuring date array conversion logic

## What changed from the original design? 

The following changes are made to improve the original design:

- Instead of a panel, I used a drawer to show the booking form to avoid breaking the layout
- Instead of showing musician's blocked time slots in the form, I showed only the available ones for clarity
- Instead of showing all booked sessions, I changed it to show only the recent 5 sessions to avoid the list being too long

## What features are added?

The following features are added to enhance the functionality of this platform:

- Validating the booking form values
- Displaying selected musician's name and avatar in the booking form
- Displaying date labels in addition to times for booking
- Showing a musician not available message when no available schedule is found
- Showing Loading and error states for each API request
- Supporting responsive design for both desktop and mobile

## Known Issues

- Musician list could be very long and the "Session booked by people" section would be out of the screen easily. Making both sections fixed height and scrollable would be one possible workaround. However, it could decrease the visibility/usability of musician information, degrading user experience. In my opinion, "Session booked by people" should be shown in a modal or a separate page to avoid this issue.

## Features to be considered in the future

- Authentication to allow only authorized users to book sessions
- Musicians list pagination to avoid list being too long and slow
- Sorting and filtering musicians list by name, instrument, and availability
- A default instrument for each musician to display in the list (currently, the first instrument is displayed, but it may not be the main instrument for the musician)
- Using CDNs for dynamically resizing avatar images for better performance
- Multi-language support for international users
- Dark mode support for better user experience

## Check List  

- [x] add unit tests
- [x] API error handling
- [x] refactor the code
- [x] add more comments
- [ ] write README

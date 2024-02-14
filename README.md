# Musician Booker

Musician Booker is a simple web platform that allows music creators / administrators to book sessions with top-notch musicians.

## Technologies Used

- Next.js for efficiently serviing both front-end UIs and back-end APIs at the same time
- Tailwind CSS for efficient styling and organized components
- Prisma (ORM) + SQLite for local database and easy data manipulation
- React Query for effectively handling API states (loading, error, success) and caching
- Axios for making API calls
- React Hook Form for quick and meticulous form validation
- DaisyUI for decent UI components, including drawer and avatar
- date-fns for date & hour formatting
- React Hot Toast for quick and easy error messages

## Getting Started

1. `npm install` to install dependencies
1. `npm run migrate` to create the database
1. `npm run seed` to insert initial data
1. `npm run dev` to start the development server

## changed 

- used a drawler to show the booking form without breaking the layout
- supported responsive design
- added "date" in addition to "time" for booking
- changed "Sessions booked by people" to only show the recent 5 sessions to avoid the list being too long

## Check List  

- [x] add unit tests
- [ ] API error handling
- [ ] refactor the code
- [ ] add more comments
- [ ] write README

## todo in the future

- who use this app? musicians or customers? or both?
- a musician might want to specify an instrument to display as the default in the list
- recent bookings may be displayed somewhere else because the musicians list could be come very long and the recent bookings may be out of the screen easily.
- authentication should be added
- each musician's timezone needs to be considered
- multi language support
- dark mode support

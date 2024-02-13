# Musician Booker

## Technologies Used

- Next.js for both front-end and back-end APIs
- Tailwind CSS for efficient styling and organized components
- Prisma (ORM)
- SQLite
- React Query
- Axios
- React Hook Form
- DaisyUI for decent UI components, including drawer and avatar.
- date-fns for date format & manipulation

## Getting Started

1. `npm install` to install dependencies
1. `npm run migrate` to create the database
1. `npm run seed` to insert initial data
1. `npm run dev` to start the development server

## changed 

- used a drawler to show the booking form without breaking the layout
- supported responsive design
- added "date" in addition to "time" for booking

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

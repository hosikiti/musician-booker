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
2. `npx prisma migrate dev --name init` to create the database
2. `npm run seed` to insert initial data

## changed 

- use a drawler to show the booking form for better usability
- responsive design
- added "date" in addition to "time" for booking

## todo for me 

- [ ] add tests
- [ ] API error handling
- [ ] refactor the code
- [ ] add more comments
- [ ] write README

## todo in the future

- a musician might want to specify an instrument to display as the default in the list
- recent bookings may be displayed somewhere else because the musicians list could be come very long and the recent bookings may be out of the screen easily.
- authentication should be added
- each musician's timezone needs to be considered
- multi language support
- dark mode support

# Sports Leagues
How to run: npm install && npm run dev (Node >= 20)
How to test: npm run test

## Design decisions
- React + TS + Vite (I decided to use my main stack)
- Tanstack Query, staleTime Infinity: one cache per league, no repeat calls
- Velvet which is my own design system for components; css modules for layout
- Selected League expands and shows the seasons and their badges if there is not badge if shows a placeholder
- I decided to list all seasons so it's easier for the user to visualize all of them
- Search with debounce with name and alt name

## Api notes
- Free key 3 returns 5 leagus all of them beign soccer and no alt name.
- Free key returns only 5 seasons per league
- Same leagues with no badges

## AI notes
- Claude code
- **Planning**: Planning session that created ADR documents and Jira tickets.
- **Checking the real API**: Checked the API response.
- **Design decisions**: generated HTML mock up to visualize the best flow for the UI.
- **Code review**: Code review while coding
- **Written by AI at my request**: The css modules, the component test of te leaguelist.test.tsx
- **Not delegated**: Coding, Architecture, state management and main design

## App is deployed on Vercel
- https://sporty-league-list.vercel.app
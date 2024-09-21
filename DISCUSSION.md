# Discussion

What a fun exercise. Overall, I optimized for speed, while focusing on functionality and visuals. Let me know what you think, happy to hear feedback!

## Things to flesh out/consider further if I had more time:

### Multiple PRs
        Apologies in advance if a single diff is hard to review. In practice I would have liked to break this up into multiple, smaller PRs for easier review. Hopefully the comments I've left in code are helpful. I've used tools like [Graphite](https://graphite.dev/) to assist with a stacked workflow. I probably should have broken this up into multiple commits as well.

### Search API
        Figure out how to search within a Postgres array. I tried multiple things but couldn't quite get it to work, so ended up shifting away focus onto other things.
        
        Have the frontend debounce requests. Right now, there's a pretty glaring performance issue where on every keystroke, an API call is made. We could use utilities like `lodash#debounce` to help cull intermediate search requests.

        First time Drizzle user here! I'm honestly not sure if the way I interpolated my query params are safe against SQL injections, but that's something I'll look up after I submit the assignment :)
        
### Search UX
        While some fields on an advocate lend themselves nicely to fuzzy search (like name or city), others might be better suited for explicit UI components. For example, a years of experience component that presents multiple ranges, or similarly a specialties dropdown where users can distinctively select what they have in mind.

        Adding in sorting capabilities would have been nice, but maybe not super necessary if the datasets are already limited.

        Handling loading state on pagination, or any network errors would have been nice.

### Responsiveness
        Did not consider mobile. That's something to consider if that's a common form factor for our users.    

### Accessibility

### Tests
        Write some basic tests to cover flows like initial load, searching, pagination, search reset. I've used tools like Cypress in the past for end-to-end tests.

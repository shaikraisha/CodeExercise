# HubSpot Web Team Exercise - Instructions

## Welcome to the HubSpot Web Team's coding exercise 🎉

<br />

> **Make sure you read these instructions carefully before you start**.  If you have any questions please reach > out to your recruiting specialist.

<br />

The goal of this exercise is to create a simple web application. Follow the instructions below and once you have finished please leave any comments or feedback in the `submission.md` file included in the repo.

 This is your chance to tell us what you thought about the exercise and any ideas or issues you may have had. It's a good way for us to get to know you and your process. _We want to hear from you!_

**Happy coding and good luck!**

<br />

---

<br />

## Setup

1. Clone or download this repository (*please do not fork it*)

2. Install [node.js](https://nodejs.org/en/download/), and then run `npm install` in your project directory. We've included some recommended packages in `package.json` for you to use, but feel free to add or remove packages as needed.

3. By default, the project uses [Parcel](https://parceljs.org/) - simply run `npm run start` to start the local dev server. Parcel includes live reloading by default so any changes you make should appear automatically.

<br />

> **Note** - you're free to replace `Parcel` with your preferred bundler (e.g. Webpack, Rollup, Gulp). The only requirement we ask is that running `npm install` from the command line compiles your project and running `npm run start` from the command line starts a local server where we can view your project at `localhost`.


<br />

---

<br />

## Instructions

<!-- Create the following interface using HTML, CSS & Javascript:

![exercise 2](./exercise-2.gif)

Close up of dropdown:

![exercise 2 - dropdown](https://cdn2.hubspot.net/hubfs/53/web_team/web-team-test/dropdown.png) -->


**Requirements:**

- all of the metadata and images in the mockup can be retrieved from this [endpoint](https://raw.githubusercontent.com/HubSpotWebTeam/CodeExercise/main/src/js/data/data.json) in `JSON` format. You must use this api to retrieve the data.

- the grid items should be sorted alphabetically by `Title` by default.

- the `Movies` / `Books` radio buttons should be cleared by default, but once selected can only be toggled between one another. They should be cleared by the `CLEAR FILTERS` button.

- the `GENRE` / `YEAR` dropdowns should match the mockup. If multiple check-boxes are checked, items from **all** checked categories should appear. E.g. if `action` and `comedy` are both selected, the list should show items with **either** of those tags.

- `CLEAR FILTERS` should clear all filters and return the list to it's original default state.

- The `search` field should filter by `Title`. It should be case insensitive.

- the design must be responsive - use whatever number of breakpoints you think are necessary. You're free to choose whatever breakpoint values you think work best.

- do not use CSS frameworks (e.g. Bootstrap). You can (and we encourage you to) use pre-processors like SASS or SCSS.

- _Have fun!_ If you get stuck don't worry, just do as much as you can.

**Bonus Points:**

- Anything that improves the experience for the user

- Use modern JavaScript (ES6+), but be wary of browser support (see the **FAQ** section below for a list of browsers we'll check support for)

- Use a Javascript framework, e.g. React, Angular, Vue etc

- Use linting/prettify for neater code

- Add fuzzy search to the search field

- Any efforts towards accessibility

<br />

> **Note** - if you have any issue retrieving the data from the endpoint, we've included the JSON data locally in `/src/js/data/data.json`. If you end up using this instead of the API, please explain why in the `submission.md` file.

<br />

---

<br />

## How to Submit

**Fill out the `submission.md` file before submitting.** If you deviated from the instructions or have any feedback, that's the place to let us know.

Once complete, email either `(a)` **a zip of your work or** `(b)` **a link to your GitHub repository** to your recruiting specialist so they can forward it to the web team.

> **Note** - if you're going to host your project online, awesome! Please include that link in your submission - but don't forget to provide the zip/repository link so that we can take a look at your code

<br />

---

<br />

## FAQs

<br />

### **When is the assessment due?**

Please submit your exercise within four days of receiving it. If you need extra time please contact your recruiting specialist.

<br />

### **Which browsers should I support?**

We'll look for compatibility with the following browsers:

- **Google Chrome** (latest version)
- **Apple Safari** (latest version)
- **Mozilla Firefox** (latest version)
- **Microsoft Edge** (latest version)

<br />

### **What color values should I use?**

The exact color values don't matter; just try to get as close to the mockup as you can

<br />

### **I'm running out of time, may I skip some of the requirements?**

If you aren't able to finish on time, focus on the main requirements, and not the bonus tasks. Then give us some insight as to what you would have done in the `submission.md` file.

<br />

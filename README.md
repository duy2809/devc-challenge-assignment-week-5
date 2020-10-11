# Google News 📰 🗞️

Assignment week 5 of React Native DevC 💻 📱

**Demo:**

![Demo](demo.gif)

GIF created with [LiceCap](http://www.cockos.com/licecap/).

**Time spent:** 6 hours spent in total

**Completed Features 🎯🥇🏆:**

- [x] The user can see a list of news articles loaded from an API.
- [x] For each article the user sees a title, source, link to read more, and hero image.
- [x] The user can see how long ago the story was published in a human-friendly format; e.g. "15 minutes ago".
- [x] The user can see the total number of articles they've fetched from the API.
- [x] When the user scrolls to the end of the list, the app automatically fetches more articles and appends them to the list of current articles(adds them to the bottom of our list).
- [x] If the user pushes the "read more" button then the app opens up the article in the phones default browser.
- [x] If the api request fails, the app should prompt the user.
- [x] If the app is fetching additional articles, the user should be prompted accordingly.
- [x] If the api has no more articles to fetch, the app should not make unnecessary api requests.
- [x] If the user has fetched all the articles, the user should be prompted accordingly.

**Completed Rockets 🚀:**

- [ ] User can see a list of individual publishers.
- [ ] User can see how many articles each publisher has made.
- [ ] User can search articles by title.

## How to test this app

**1. Make sure npm and expo have already been installed:**

```sh
npm install expo-cli --global
```

**2. Clone the folder app:**

```sh
git clone https://github.com/duy2809/devc-challenge-assignment-week-5.git
```

**3. Change directory and install all the needed node_modules package using:**

```sh
cd devc-challenge-assignment-week-5
npm install
```

**4. Run app:**

```sh
expo start
```

**5. Notes:**
After the app runs successfully, you can test either on the stimulator or your own smartphone by scanning the QR code on Expo Metro Bundler.

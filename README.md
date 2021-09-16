# Apollo tutorial

This is a project following the tutorial: [Apollo tutorial](http://apollographql.com/docs/tutorial/introduction.html). 🚀

## File structure

The app is split out into two folders:

- `start`: Project

Within the `start`directory, there are two folders (one for `server` and one for `client`).

## Installation

To run the app, run these commands in two separate terminal windows from the root:

```bash
cd start/server && npm i && npm start
```

and

```bash
cd start/client && npm i && npm start
```

## Description

Data about rocket launches is retrieved from [the spaceX API](https://api.spacexdata.com/v2/).
The application is storing some data about users information and booked launches in a sqlite database.

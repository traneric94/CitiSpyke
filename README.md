## Predyct - Predicting BikeShare Availability

### Background and Overview

Predyct is a bikeshare information application that assesses spikes in usage of bikes to accurately predict the availability of bikes at a future time.

While all ridesharing applications provide current/realtime data, for the benefit of the user, there is no bearing on future data predictions based on historical data.

For instance, a user can see the number of bikes currently available at a station, but cannot see the number of bikes that will be available in 30 minutes. This can result in frustration when expecting a bike available at the time of arrival to the bike station.

For starters, we can assume a linear trend for the current time, a previous time, and the future time prediction desired.

An iterative improvement could be to use a polynomial prediction using several past points.

Alternatively, we could use linear regression on several past points to determine a future prediction.


### Functionality & MVP  

In Predyct, users will be able to:

- [ ] Select location of bike station and start time.
- [ ] See pop-up which displays detailed bike information at each pin.
- [ ] Will be able to see the availability of bikes.
- [ ] See an initial modal describing the basic purpose and functionality.

### Wireframes

This app will have one screen, with the main focus being the map and options that render the map.

The two options will be departure time and location.

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript for overall structure and data processing logic.
- GoogleMaps API for map rendering and main user interaction.
- Axios for api requests.
- Webpack to bundle and serve up the various scripts.

### Implementation Timeline

**Over the weekend**:
- [x] Skeletal setup
- [x] Get necessary data from FordGoBike API and GoogleMaps API
- [x] Render GoogleMaps pins with data from FordGoBike API.

**Day 1**:
  Goals for the day: Incorporate detailed modals with bike information on each map pin. Flesh out backend structure to store FordGoBike data overtime.

- [ ] Database initialization.
- [ ] Set interval to request data, to serve as seed for predictive analysis.
- [ ] Polishing frontend of maps to render current availability of bikes at each station.

**Day 2**:
  Focus on frontend experience, and the math involved to predict bikeshare availability.

- [ ] Flesh out dropdowns and options for time and location.
- [ ] Information on each pin will correctly adjust given time and location.
- [ ] Refamiliarize with polynomial functions and linear regression for the purpose of predictive analysis.

**Day 3**:
  First fully function implementation of product.

- [ ] Implement necessary functions for predictive analysis (polynomial or linear regression)
- [ ] Incorporate data from the previous day into application.
- [ ] Ensure smooth and functional user interface.

**Day 4**:
  Algorithm adjustments and polishing user interface

- [ ] Implement iterative improvements to prediction algorithm
- [ ] Styling

### Bonus features

- [ ] Expand the concept of bike availability to include all rideshare apps. ie. when to avoid Uber surge pricing.
- [ ] Classification considerations pertaining weather conditions and holidays.
- [ ] Implementing a recurrent neural network as a predictive model.

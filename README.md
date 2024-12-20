> ## 🛠 Status: In Development
>
> Afriwork Bidding is currently in development. So we encourage you to use it and give us your feedback, but there are things that haven't been finalized yet and you can expect some changes.
>
> See the list of Known Issues and TODOs, below, for updates.

## Overview

A bidding app backend challenge for Afriwork.

## Getting Started

# License: MIT

# TODOs

## Setup and Configuration

- [ ] Initialize backend project
- [ ] Set up Database
    - [x] Design Database Schema
    - [x] Create Database Models
    - [ ] Create The Seeder script
- [ ] Set up Docker and Reverse Proxy

## Authentication and Authorization

- [ ] Implement JWT Authentication
- [ ] Implement User Registration and Login

## API Development

### Listing bids

- [ ] Create endpoints for:
    - [ ] Listing all bids (filter by status).
        - [ ] Listing bids by user(owner).
        - [ ] Listing bids by category.
        - [ ] show total bids on the listing page
    - [ ] Viewing a single bid.
    - [ ] Creating a new bid.
    - [ ] Updating a bid (by owner).
    - [ ] Closing a bid (by owner).

### Bidding

- [ ] Create endpoints for:
    - [ ] Viewing a single bid.
    - [ ] Placing a bid on a listing.
    - [ ] Updating a bid (by bidder).
- [ ] Implement logic to:
    - [ ] It should check if the amount is greater than the current bid and starting amount, if not return an error message.
    - [ ] It should check if the bid is closed, if it is return an error message.
    - [ ] It should check if the bid is owned by the bidder, if it is return an error message.

### Notifications

- [ ] Implement notifications for:
    - [ ] New bids on a listing, to the owner and bidders except the bidder who placed the bid.
    - [ ] Bid updates, to the owner and bidders except the bidder who placed the bid.
    - [ ] Bid closing, to the bidder who placed the bid.

### Real-time Updates

- [ ] Implement real-time updates for:
    - [ ] New bids on a listing.
    - [ ] Bid updates.
    - [ ] Bid closing.

## Testing

- [ ] Write unit tests for:
    - [ ] write unit tests for the most simple function like "hello()" upto the biggest one
    - [ ] write test that check every use case of the business logic and edge cases

## Security

- [ ] Test on common security vulnerabilities
- [ ] Test any business logic security vulnerabilities

## Documentation

- [ ] API endpoints (try using Swagger or any other API documentation tool).
- [ ] Database Schema.
- [ ] Project Structure.
- [ ] Environment Variables.
- [ ] Usage.
- [ ] Deployment Process.
- [ ] Tools and Libraries Used.

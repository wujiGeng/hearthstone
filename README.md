# HearthstoneCards
  -by Wuji Geng & Zhuoming Zhang

This is a website designed for hearthstone users, helping them to check all the cards in the game, as well as selecting their own card deck and favorite cards.

# Visit our site

To visit our site, please go to the link --> https://pacific-waters-57643.herokuapp.com/

If the link is not working, please download the project, and do the following steps in your command line:

1.change direction to this project file (by using cd)

2.npm start

3.open your browser and visit http://localhost:8000/

# Functions & Workflow

-From the home page, users may choose to either search and view the cards, or creat a card deck.

-In the search & view page, different filters are available to check sorted cards. Users can also input a text to search for specific card (cards).
 Details for the shown cards are accessible by clicking "detail" button under the card.
 Users may add cards as their favorite cards and view them later in the favorite page.

-In the deck page, users will first select a class of Hero, and then creat their own card deck. Sorted card deck information and bar chart are available.

-Users may also view the cards in the deck or in the favorite list by clicking on the related button at the top bar.

# Notice

-The deck and favorites are saved in local cookies, not in the account.

-In the "search for cards" page, buttons in the filters need to be clicked onto the exact number.

-If the picture of a card is shown as a black block, or a transparent block, then it is probably because the rest API we use does not provide proper card picture for that card.

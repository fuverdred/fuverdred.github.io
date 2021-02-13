---
layout: post
author: Fred Cook
title: Crossword Theme Fitting
image: /assets/img/crossword_filler/xw.png
---

It is common for the Guardian cryptic crossword to include a theme, sometimes clearly referred to, sometimes waiting to be discovered as the answers are filled in. For good examples see [Maskarade](https://www.theguardian.com/crosswords/crosswords+profile/maskarade). When I decided I wanted to set some themed crosswords I didn't fancy spending ages filling out a grid with theme words by hand, let alone checking that once a theme word was in place, the rest of the grid could still be filled. As I couldn't find a program to achieve this goal I wrote one.<br/><br/>

The best way to look at my current method is through an example. Take a theme of chocolate bars (in no particular order):

| MARS | DOUBLEDECKER |
| DAIM | BOUNTY |
| MILKYWAY | YORKIE |
| GALAXY | TWIRL |
| AERO | BOURNEVILLE |
| FUDGE | LION |
| TOPIC | PICNIC |
| PENGUIN | BOOST |
| CHOMP | TOFFEE |
| CRISP | CRUNCH |
| NUTS | SNICKERS |

We will refer to these as the theme dictionary from now on. How many can be fitted into a crossword grid, while still allowing the rest of the grid to be filled out with words.

### Grid Choice

The first question is which grid? It is tempting to think a custom grid could be made for any given set to optimise the number of fitted theme words. However, there are constraints on what a grid can look like. They must have some form of symmetry. In fact, there are [~60 standard grids](/grids) the Guardian uses, four examples are shown below.

<table>
  <tr>
    <td>{% include crossword_grids/grid_12.html %}</td>
    <td>{% include crossword_grids/grid_11.html %}</td>
  </tr>
  <tr>
    <td>{% include crossword_grids/grid_1.html %}</td>
    <td>{% include crossword_grids/grid_2.html %}</td>
  </tr>
</table>

Limiting ourselves to these ~60 grids, it makes sense to only consider grids which have the most spaces matching the theme dictionary word lengths. Let's re-arrange the theme dictionary by word length using a ```defaultdict```.

| 4 | MARS, DAIM, AERO, LION, NUTS |
| 5 | TWIRL, FUDGE, TOPIC, BOOST, CHOMP, CRISP |
| 6 | BOUNTY, YORKIE, GALAXY, PICNIC, TOFFEE, CRUNCH |
| 7 | PENGUIN |
| 8 | MILKYWAY, SNICKERS |
| 11 | BOURNEVILLE |
| 12 | DOUBLEDECKER |

This is a test to see if gulp is needed to compile all files.

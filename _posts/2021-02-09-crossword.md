---
layout: post
author: Fred Cook
title: Crossword Theme Fitting
image: /assets/img/crossword_filler/Example.png
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

Then score each grid by multiplying the number of positions with length _n_ by the number of words of length _n_ in the theme dictionary. A good match is shown below, with plenty of spaces for 4, 5, and 6 letter words.

{% include crossword_grids/grid_19.html %}

### Permutations

How many possible ways are there to fit the theme dictionary into the grid? We can use permutations from combinatorics, _<sup>n</sup>P<sub>r</sub>_. As an example, let's say we have two theme words which can fit into four possible positions in the grid. There are _<sup>4</sup>P<sub>2</sub>=12_ permutations if both positions are filled, plus _<sup>4</sup>P<sub>1</sub>=4_ permutations if only one positions is filled, plus the possibility of no positions being filled, for a total of 17 permutations. That last permutation may sound trivial, but it is relevant when filling out a whole grid, although one can be subtracted at the end, as an entirely empty grid is definitely not of interest. Also, if the above example were reversed and there were four possible theme words and two possible spaces the number of combinations remains the same.

```
length |  words |    pos |  combs
-------+-------+-------+-------
4      |      5 |      6 |   1237
5      |      6 |      8 |  28961
6      |      6 |      4 |    517
7      |      1 |      4 |      5
8      |      2 |      4 |     17
-------+-------+-------+-------
TOTAL  | 1574318946365
```

There are ~1.6 trillion possible permutations. Of course, many of these would be invalid due to letter clashes, however a first approach would require checking them to find these clashes. 

---
layout: post
title: Themed Crossword Filler
date: 2021-07-01
github: https://github.com/fuverdred/Crossword-Filler
---

It is common for the Guardian cryptic crossword to include a theme, sometimes clearly referred to, sometimes waiting to be discovered as the answers are filled in. For good examples see [Maskarade](https://www.theguardian.com/crosswords/crosswords+profile/maskarade). When I decided I wanted to set some themed crosswords I didn't fancy spending ages filling out a grid with theme words by hand, let alone checking that once a theme word was in place, the rest of the grid could still be filled. As I couldn't find a program to achieve this goal I wrote one.

{% include crossword_grids/grid_59.html %}

It is written in Python, with a TKinter GUI to help with filling out the rest of the grid once as many theme words as possible have been inserted. The best way to look at my current method is through an example. Take a theme of chocolate bars (in no particular order):

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

The first question is which grid? It is tempting to think a custom grid could be made for any given set to optimise the number of fitted theme words. However, there are constraints on what a grid can look like. They must have some form of symmetry, at least two-fold rotational. The reason for symmetry is historical and uncertain, but a symmetrical grid is certainly more pleasing to look at. In fact, the Guardian uses a set number of grids (~60 when not reducing for handedness/90 degree rotational symmetry).

Limiting ourselves to these ~60 grids, it makes sense to only consider grids which have the most spaces matching the theme dictionary word lengths. Let's re-arrange the theme dictionary by word length using a ```defaultdict```.

| 4 | MARS, DAIM, AERO, LION, NUTS |
| 5 | TWIRL, FUDGE, TOPIC, BOOST, CHOMP, CRISP |
| 6 | BOUNTY, YORKIE, GALAXY, PICNIC, TOFFEE, CRUNCH |
| 7 | PENGUIN |
| 8 | MILKYWAY, SNICKERS |
| 11 | BOURNEVILLE |
| 12 | DOUBLEDECKER |

Then score each grid by multiplying the number of positions with length _n_ by the number of words of length _n_ in the theme dictionary. This is an easy way to find the grid with the most ways to fit the theme words in, increasing the chances of finding theme words which interlock with each other, increasing the density. A good match is shown below, with plenty of spaces for 4, 5, and 6 letter words.

{% include crossword_grids/grid_19.html %}

Although in the actual method it is good to look at the top 10 grids, otherwise the trend will always be towards grids with the most possible spaces.

### Permutations

How many possible ways are there to fit the theme dictionary into the grid? We can use permutations from combinatorics, _<sup>n</sup>P<sub>r</sub>_. As an example, let's say we have two theme words which can fit into four possible positions in the grid. There are _<sup>4</sup>P<sub>2</sub>=12_ permutations if both positions are filled, plus _<sup>4</sup>P<sub>1</sub>=4_ permutations if only one positions is filled, plus the possibility of no positions being filled, for a total of 17 permutations. That last permutation may sound trivial, but it is relevant when filling out a whole grid, although one can be subtracted at the end, as an entirely empty grid is definitely not of interest. Also, if the above example were reversed and there were four possible theme words and two possible spaces the number of permutations remains the same. If we have _a_ words and _b_ positions of a given length, then the total number of permutations for that length is
```
perms = 0
for i in range(min(a, b) + 1):
    perms += nPr(max(a, b), i)
```
However, when we iterate over all of the length words/positions which are available the permutations are multiplied together instead of added. For the previous example grid this gives

```
length |  words |    pos |  combs
-------+--------+--------+--------
4      |      5 |      6 |   1237
5      |      6 |      8 |  28961
6      |      6 |      4 |    517
7      |      1 |      4 |      5
8      |      2 |      4 |     17
-------+--------+--------+--------
TOTAL  | 1574318946365
```

There are ~1.6 trillion possible permutations. Of course, many of these would be invalid due to letter clashes, however a first approach would require checking them to find these clashes. This doesn't take into account checking if the grid is still fillable from a much larger dictionary of words/phrases.

### Fitting

Programs to fill crossword grids can work by letter or by word. Working by letter makes sense when using a large dictionary, as individual letters at intersecting points determine the number of possible words which will fit. However, in the case of a small dictionary it makes the most sense to fit by word. Although, optimisations can be made by caching which letters have already been tried at intersecting positions.

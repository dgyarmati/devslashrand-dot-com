---
layout: post
title:  "Python Generators Primer"
date:   2020-07-17 03:28:52 +0200
categories: python features
---
### Preamble

All right dudes and dudettes, today we'll take a brief look at a mysterious, useful, and vaguely functional programming-ish feature of Python: generators!
Let's start with a definition: a generator is a function that returns an iterator. The iterator is a separate topic by itself, but to get a cursory understanding of generators, you really only need to know three things about it:

1. it's an object which can be iterated upon, much like a list
2. therefore, it can be used in loops
3. to get the next piece item from an iterator, you can call `next(iterator)`.

With that out of the way, let's discuss generators.

### How generators work?
Normally, when a function is called, it returns some value, then stops executing<sup>1</sup>. 
Generators circumvent this behavior, working kind of like a deep freezer: when used, they 'freeze' the state of the function, so when it returns something, its execution doesn't stop: you can do whatever with the returned value, then get back to the 'frozen' state, and get the next value from it, and the next, and the next, until it runs out... or not (more on that later).

### Syntax
It's simple, really: instead of `return`, use `yield` in your function, and voilá - you created a generator function!<sup>2</sup> <sup>3</sup>
It helps if you think of `yield` as a `return` statement, after which you can jump back to where you were in the function.

### Use case
Now that we mentioned iterators, a very obvious use case for generators is when we need a sequence of values - especially so when the sequence has to be infinite. 
But instead of a lengthy discussion, I think the concept is best explained through...

### Contrived code examples
Let's say that you are assigned to the engineer crew of a New Order star destroyer. One day, you are tasked with writing a brand new software to replace the out of date controls of the plasma cannons. You enthusiastically take up the challenge, starting with trying to make the damn thing fire actual plasma beams. 
You come up with this code pretty quickly:

{% highlight python %}
class StarDestroyer():
    blast = "POW!"

    def fire_plasma_cannon(self):
        return self.blast

star_destroyer = StarDestroyer()
{% endhighlight %}

When you call `print(star_destroyer.fire_plasma_cannon(), end=" ")` to test it, however, you get this result:

`$ POW!`

Your supervisor obviously won't be happy with that: though the cannon works perfectly, it only fires one beam at a time, which won't be enough to deal with those pesky rebels - also, you don't want the gun crew to all get tendonitis from repeatedly mashing the fire button during a space battle, do you? So you refactor the code to look like this:

{% highlight python %}
class StarDestroyer():
    blast = "POW!"

    def fire_plasma_cannon(self):
        while True:
            return self.blast

star_destroyer = StarDestroyer()
{% endhighlight %}

Yay, now it's a repeater! Or at least it should be - but something is wrong: during the test, the cannon still fires only one beam before stopping! Turns out that despite the clever loop you put in there, the function returns after the first call, which ends to loop. Desperate for solutions, you contemplate collecting the beams in an array, to be released when a flag turns `True` or something similar, but then you hear about generators and how they are supposedly able to generate an endless sequence of beams for you, should you want it. A bit dubious, you look up the documentation, and write a test to see how it works:

{% highlight python %}
class StarDestroyer():
    blast = "POW!"

    def fire_plasma_cannon(self):
        yield self.blast

star_destroyer = StarDestroyer()
{% endhighlight %}

The test results after calling `print(next(star_destroyer.fire_plasma_cannon()), end=" ")` are the same as before, but after you refactor the whole thing to use a loop like so:

{% highlight python %}
class StarDestroyer():
    blast = "POW!"

    def fire_plasma_cannon(self):
        while True:
            yield self.blast

star_destroyer = StarDestroyer()
{% endhighlight %}

and test it with

{% highlight python %}
for blast in star_destroyer.fire_plasma_cannon():
    print(blast, end=" ")
{% endhighlight %}

, aand it works!

`$ POW! POW! POW! POW! POW! POW! POW! POW! ...`

You have a repeater! Now your only problem is how to stop it from repeating, but before you could fix that infinite loop in `fire_plasma_cannon()`, you are arrested and summarily executed because you accidentally gunned down an entire platoon of storm troopers in the hangar during your last experiment. A shame, really - you didn't even have time to explain to the chief engineer that there is no sound in space, and anyway, firing a plasma cannon shouldn't sound like Batman beating the crap out of the Joker...

### Wrapping up

So that's all about generators in Python for today, folks - hope you got a rudimentary picture about their devious ways, and I piqued your interest enough that you start to experiment with them a little. Stay tuned for the next post, where we dive a bit deeper into this very same Python feature, and remember: don't try to build a plasma cannon at home!

---

1: If there is no explicit return value, it simply returns `None`.

2: Generators and generator functions are actually separate things, but they go hand in hand - when you're writing a generator function, you will use generators.

3: A generator function can have both `yield` and `return` statements.
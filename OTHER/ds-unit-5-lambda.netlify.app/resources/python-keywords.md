Python Keywords
===============

In the Beginning were Python’s Keywords <span id="in-the-beginning-were-python-s-keywords"></span>
--------------------------------------------------------------------------------------------------

Let’s face it, learning to *write* computer programs is *hard*. Doing so involves picking up a lot of specialized skills and jargon, most of which is unfamiliar, and it also means cultivating a mental approach to the world that, at first, might seem downright *alien*. It’s a long journey, but fluency starts with learning how to *read* computer programs, and that *really* shouldn’t be so hard.

> Programs must be written for people to read, and only incidentally for machines to execute.Harold Abelson

One of the defining traits of the Python programming language is that it’s *designed* to be readable by humans. For the most part it fulfills that promise, however, after several years of helping others understand Python, I’ve come to realize that there’s an important caveat to that statement; it’s really only true for someone with a *significant* and *specialized* English-language vocabulary.

The truth is you need enough mastery of the “rules” of English grammar and wordplay to recognize and understand, at a glance, words *written* in English that *are not* actually words you’ll find in an English dictionary. Nonstandard terms like **def** (a *contraction*[1](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#fn:1)), **elif** (a *portmanteau*) and **nonlocal** (a *neologism*) all abound, so even for those with quite advanced *native* English fluency the task of learning Python is very much like trying to learn a foreign language that’s *slightly* related to their native tongue. For those without that fluency learning Python is like learning a foreign language *inside* a foreign language, and is therefore *far* more difficult.

To make that task a little easier I’m going to try, in this post and the ones that follow, to shed some light on the meaning of – and a *little* of the etymological history behind – the fundamental units of Python fluency. In this first part we will start with the most basic of those units, Python’s 35 *reserved keywords*[2](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#fn:2).

That’s right; the core vocabulary of Python you actually *need* to know to start to do meaningful work is just 35 keywords. It’s not the smallest language, but it’s *far* from the largest, and just compare it to the roughly 10,000 words required to achieve basic *native* fluency in a non-programming language.

### First, Some Conventions <span id="first-some-conventions"></span>

Python is what is known as a *statement*-oriented language; but what *is* a statement? Well, for the purposes of this article we’re just going to say that in Python a statement is a *single* line of code that does *something*. *What* it does, specifically, depends on the building blocks of that statement.

But what are those building blocks? Well, let’s define them quickly and *very* roughly, since we’ll go into more detail about them in later posts. I’ll use UPPERCASE letters to make it easier to visually distinguish these abstract forms from the specific instances we’ll talk about later.KEYWORDA reserved *word* the meaning of which *cannot* be changed by the user. We will visit all 35 of these in the next section of this article.OPERATORA reserved *symbol* that indicates an action to be performed. For example, `=` is the *assignment* OPERATOR and `+` is the *addition* OPERATOR. There are quite a few others, but we’ll save them for the next post. A small number of KEYWORDs behave like OPERATORs, and I’ll point those out below.

These are both provided by Python and you can’t directly change their meaning, which means that they’re somewhat inflexible. To do most work you’ll need something more flexible, which is why Python gives you the ability to represent *anything*.OBJECTAn individual *thing* you can interact with. Unlike KEYWORDs and OPERATORs, you can directly manipulate these, though the degree to which you can manipulate them depends on what *type* of OBJECT they are. You can also use KEYWORDs to define entirely new *types*, which makes them a very expressive way of building new *things* of your own. So expressive, in fact, that practically speaking *everything* you interact with in Python will be an OBJECT.

That can be a bit abstract and hard to wrap your head around at this point, though. For now just know that OBJECTs tend to fall into three main categories.VALUEAn OBJECT that represents a single, concrete *thing*; for the purposes of this discussion what that thing actually *is* is irrelevant, but as an example, `4` is a VALUE of the [**int**](https://docs.python.org/3/library/functions.html#int) (short for *integer*) type and `hello` is a VALUE of the [**str**](https://docs.python.org/3/library/functions.html#func-str) (short for *string*) type. These are both examples of *primitive* types, which have a single meaningful value, but there are also *composite* types for describing things the meaning of which is defined by more than one *attribute*. A real-world example would be a rectangle, which cannot be defined without both height and width. As you’ll see below three special KEYWORDs all behave like VALUEs, though as before you cannot change their meaning.COLLECTIONAn OBJECT that groups together or contains other OBJECTs; there are *many* different types of COLLECTIONs in Python, but for the moment all we care about is that a COLLECTION *contains* zero or more OBJECTs. For example the statement `[2, 3, 4]` creates a COLLECTION of the type [**list**](https://docs.python.org/3/library/stdtypes.html#list) that holds three VALUEs inside of it. A COLLECTION can contain *any* OBJECT, so you can *nest* a COLLECTION inside another COLLECTION.CALLABLEAn OBJECT that represents some action to perform: it performs that action when you call it with some number of *arguments* then it *returns* (or gives back) an OBJECT. For instance [**sum**](https://docs.python.org/3/library/functions.html#sum) is a CALLABLE and when we call it using `sum([2, 3, 4])` it gives us back the VALUE `9`. There are several different kinds of CALLABLE, and we’ll touch on them in more detail below.

It wouldn’t be very efficient to type out the same OBJECT every time you needed to refer to it, though. It’s often very helpful to be able to refer to things *indirectly*.NAMEAny word that *is not* a KEYWORD, and that is used as an *alias* to *refer to* some specific OBJECT. Unlike a KEYWORD the meaning of a NAME *may* change over the course of a program, which is why these are often – if a little incorrectly – thought of as *variables*. There are several ways to create new NAMEs (and one to destroy them), as we’ll see below, but as a simple example in `number = 2` the *assignment* OPERATOR **=** creates the NAME **number** and assigns it to refer to the VALUE **2**. When later that is followed by `number += 2`, however, the *augmented assignment* OPERATOR **+=** will re-assign **number** to refer to **4**.

Now we’ve got all the simple building blocks defined and we can start organizing them into composite structures.EXPRESSIONAny composite form of one or more of the above that can be *evaluated* to an OBJECT. For example, `4`, `2 + 2`, `1 * 3 + 1` and `sum([1, 1, 1, 1])` are all EXPRESSIONs that evaluate to `4`. The EXPRESSION represents the smallest discrete unit of work in Python.STATEMENTAny single line of code that is composed of at least one of the above. These can get quite complex, but to *do* anything they’ll usually need to include KEYWORDs and/or OPERATORs plus EXPRESSIONs. You’ve already met a *useful* STATEMENT in `number = 2`. If you read each STATEMENT in a program out in turn you can track the program as it does its work.

That covers any given *line* of code, but there are also a couple of higher level structures we need to define for the moment:BLOCKAt least two STATEMENTs that are bound together; the first STATEMENT will end in a **:** character and indicates the start of the BLOCK. The second and all further STATEMENTs inside that BLOCK will be indented further right than the initial STATEMENT, to indicate that they *belong* to the same BLOCK. The last such indented STATEMENT represents the end of the BLOCK.MODULEA single Python .py file; it’s composed of some number of STATEMENTS. All Python programs are comprised of at least one MODULE. As you’ll see below we write all of our functionality inside MODULEs, and we use KEYWORDs and NAMEs to *import* functionality from other MODULEs.

There are many other concepts you’ll need to become familiar with, but with these building blocks we can investigate all 35 words in Python’s relatively small vocabulary, and thus understand the skeleton of any Python program.

On to the Keywords <span id="on-to-the-keywords"></span>
--------------------------------------------------------

### One That Does Nothing <span id="one-that-does-nothing"></span>

[pass](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#pass)[docs](https://docs.python.org/3/tutorial/controlflow.html?highlight=pass#pass-statements)A placeholder; technically known as Python’s *null operation*, [`pass`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#pass) does nothing whatsoever; it exists solely to allow you to write a syntactically valid BLOCK.

The general meaning here comes from a Middle English verb borrowed via Old French from the Latin ***passus*** that implies *“to move by \[a place, without stopping\]”*. More specifically the meaning in Python is borrowed from its use in sequential-play card games such as Bridge, where if you do not wish to do anything on your turn you ***pass*** control of the game to the next player, doing nothing.

The need for this is simple; once you begin a BLOCK in Python it *must* contain *at least one* indented STATEMENT to be considered valid syntax. The [`pass`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#pass) statement exists to allow you to write a valid BLOCK structure *before* you’re ready to start writing meaningful statements.

    STATEMENT:
        pass

Because it’s mainly used early on when building the rough structure of a program you’ll rarely, if ever, see [`pass`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#pass) in working code, but it’s good to know it exists.

### Three That Are Objects <span id="three-that-are-objects"></span>

The next three keywords are specialized because they each behave like a primitive VALUE. This means they can be assigned to a NAME, kept within a COLLECTION, and can be the result of evaluating an EXPRESSION. They’re also the only keywords that start with a capital letter, which makes them easy to distinguish.

**boolean values**

These two are used in most, if not all, programs, and are essential whenever performing [Boolean logic](https://en.wikipedia.org/wiki/Boolean_algebra).[True](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true)[docs](https://docs.python.org/3.7/library/stdtypes.html#boolean-values)Indicator of logical *truth* and the opposite of [`False`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#false) ; behaves like the *integer* `1`, except that it will always be displayed as [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) .

From the Old English adjective ***triewe***, which has German roots; the general meaning is of being “worthy of trust” and “consistent with fact”. In logic, though, the specific meaning is really just “that which is not false”, and in computer programming it’s usually a proxy for the binary digit 1.[False](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#false)[docs](https://docs.python.org/3.7/library/stdtypes.html#boolean-values)Indicator of logical *untruth* and the opposite of [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) ; behaves like the *integer* `0`, except that it will always be displayed as [`False`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#false) .

From late Old English, borrowed via the Old French ***faus*** from the Latin ***falsus***; the general meaning is of “fake, incorrect, mistaken, or deceitful”. In logic the meaning is not so sinister, it just means “that which is not true”, and in computer programming it’s usually a proxy for the binary digit 0.

In some lower-level languages you would probably just use `1` and `0` for these, but in Python they’ve been given special keywords to make it obvious that you’re working with the *logical* meaning instead of the *numerical* one.

It’s important to understand that in Python *every* OBJECT (hence ever VALUE and COLLECTION, and therefore every EXPRESSION), has a *logical* value, in that it’s considered to be logically equivalent to either True or False. Testing the state of that logical value is known as [truth-value testing](https://docs.python.org/3/library/stdtypes.html#truth-value-testing), and as you’ll see below keywords like [`and`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#and) , [`or`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#or) , and [`if`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#if) all rely on truth-value testing for their operation.

I will go into deeper detail about the specifics of truth-value testing in later articles, but for now you just need to know that most things are considered [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) by default, except for “no value” VALUEs like `0`, [`None`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#none) , and `False` itself, as well as “no content” COLLECTIONs like `[]`.

**the null value**

This is most commonly used to represent the absence of any other VALUE.[None](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#none)[docs](https://docs.python.org/3/library/stdtypes.html#the-null-object)A special name for nothing whatsoever; technically Python’s *null object*; it’s considered equivalent to [`False`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#false) for truth-value testing, but essentially represents no value at all. Is very commonly used in Python, and will always appear as [`None`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#none) .

A Middle English pronoun from the Old English ***nan***, meaning “not one” or “not any”. The meaning in programming, however, relates more to ***null***, which means “not \[any\] thing” or just “nothing”. Python chose to use ***none*** because it’s a more commonly familiar word. It also helps to distinguish it from the use of the special value NULL in the C programming language, which has a similar meaning but behaves in a *very* different way.

The notion of making *something* that explicitly represents *nothing* might seem a little odd, at first, but the need for [`None`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#none) becomes obvious when you start building *useful* code.

### Three for Making Decisions <span id="three-for-making-decisions"></span>

Being able to tell if something is considered [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) or [`False`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#false) isn’t very useful unless you have the means to take different actions based on that knowledge. For that *most* programming languages have some notion of *conditional operations*. In Python there are three keywords dedicated to conditional tasks.[if](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#if)[docs](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement)Starts a conditional BLOCK by checking the *truth-value* of the EXPRESSION that follows it; the STATEMENT(s) indented underneath the [`if`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#if) will be executed only if the EXPRESSION is considered [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) .

A Middle English conjunction from the Old English ***gif*** which means, “in the event” or “whether” or, oddly, just “***if***”. Has many Scandinavian/Germanic relatives, and possibly arrives via an Old Norse term for “doubt, hesitation”. The general use is to make one word or phrase conditional on another being true, as in “*if* it is raining, open your umbrella”. The sense in computing is more formal but essentially the same; “*if* \[this condition is true\], then \[do some action\].[elif](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#elif)Optionally *continues* a conditional by adding another BLOCK; if present it *must* follow either the initial [`if`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#if) or another [`elif`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#elif) . Behaves exactly like an [`if`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#if) , except that its conditional EXPRESSION will only be evaluated when no previous [`if`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#if) /[`elif`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#elif) STATEMENT has evaluated as [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) .

Not a proper English word, but instead a [portmanteau](https://en.wikipedia.org/wiki/Portmanteau) that contracts ***else*** and ***if*** into a single artificial word, ***elif***. Together it means “otherwise, if” or “as an alternative, if”, both of which imply that the action controlled by the ***elif*** is contingent on the outcome of some previous test or tests. So, in computing, “***else*** \[after checking some prior condition\] ***if*** \[this other condition is True\], then \[do some other action\]“.[else](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#else)Optionally *terminates* a conditional by adding a final BLOCK; if present it *must* follow the last [`if`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#if) /[`elif`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#elif) in the BLOCK. If no previous [`if`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#if) /[`elif`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#elif) STATEMENT evaluated to [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) then the indented STATEMENT(s) below [`else`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#else) will be run.Can also be used to terminate blocks started with other KEYWORDs; see [`for`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#for) , [`while`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#while) , and [`try`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#try) below.

An adverb from the Old English ***elles***, meaning “\[to do\] instead of \[some other action\]” or “as an alternative”, or just “otherwise”. In computing it means “\[check if any prior condition is true\] ***else*** \[perform some final action\]“. It is used to take some default or fallback action when no better, more specific action should be taken.

Conditionals are key to a lot of Python programming, and are needed to better explain some of the keywords that follow, so I’ll provide a few examples of how they work.

Sometimes you only want to take *any* action if some condition is met; this is the simplest form:

    if EXPRESSION:
        STATEMENT

Many situations are binary, though, and so you’ll always want to take some fallback action if the condition is *not* met:

    if EXPRESSION:
        STATEMENT_A
    else:
        STATEMENT_B

In complex cases you may need to have any number of alternative actions based on mutually exclusive conditions, as well as a fallback:

    if EXPRESSION_A:
        STATEMENT_A
    elif EXPRESSION_B:
        STATEMENT_B
    else:
        STATEMENT_C

For the middle, “either/or” case there’s another form you will sometimes see, known as the *ternary operator* form. This is useful mainly because, unlike a standard [`if`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#if) conditional, it behaves like an EXPRESSION, and the value it evaluates to can be directly assigned to a NAME:

    NAME = STATEMENT_A if EXPRESSION else STATEMENT_B

Which is a much shorter way of writing:

    if EXPRESSION:
        NAME = STATEMENT_A
    else:
        NAME = STATEMENT_B

We’ll find this useful when we look at the OPERATOR-like keywords below.

### Five That Are Operators <span id="five-that-are-operators"></span>

The next five keywords all behave like an OPERATOR to denote actions performed on OBJECTs and/or EXPRESSIONS.

**boolean logic operators**

These are used for making meaningful comparisons between things based on their *truth-value*.[not](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#not)[docs](https://docs.python.org/3/library/stdtypes.html#boolean-operations-and-or-not)A *unary* OPERATOR that inverts the *truth-value* of whatever follows it, as in `not EXPRESSION`.Can be used to invert the meaning of another KEYWORD; see [`is not`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#is) and [`not in`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#is-in) below.

A Middle English adverb from the Old English ***nawiht***, implying “nothing” or “zero”. The general meaning today negates (or flips) the meaning of the word or phrase that follows it. Compare “I do have apples” to “I do ***not*** have apples”. In programming, however, the specific meaning comes from [logical negation](https://en.wikipedia.org/wiki/Negation), and thus ***not*** negates true to false, and vice versa.

This is Python’s *Boolean negation* OPERATOR, used whenever you need the opposite of the truth-value of a thing. It is *unary*, which means that it acts on whatever is to its immediate right.

The usage of [`not`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#not) is straightforward:

    not EXPRESSION

If `EXPRESSION` is considered [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) then `not EXPRESSION` evaluates to [`False`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#false) and otherwise it evaluates to [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) .

That can be easier to understand if you think of [`not`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#not) as working like the following *ternary* [`if`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#if) :

    False if EXPRESSION else True

[and](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#and)[docs](https://docs.python.org/3/library/stdtypes.html#boolean-operations-and-or-not)A *binary* OPERATOR that checks the *truth-value* of two things, evaluating to the thing on the left if it tested [`False`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#false) , otherwise to the thing on the right.

An ancient Old English conjunction with Germanic roots vaguely meaning “thereupon” or “next \[to\]” and used to combine two words or phrases, as in “coffee ***and*** tea”. The meaning in Python, however, comes entirely from [logical conjunction](https://en.wikipedia.org/wiki/Logical_conjunction), and implies that either *both* things it combines are true or the whole combination is false.

This is Python’s *Boolean conjunction* OPERATOR; used whenever you need to test if *both* sides of the [`and`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#and) are considered [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) . It is a *short-circuiting* operation; if the left-hand EXPRESSION is considered [`False`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#false) the entire operation is considered [`False`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#false) and the right-hand side will never be evaluated at all. And unlike [`not`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#not) it does not necessarily evaluate to either [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) or [`False`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#false) , evaluating instead to either the left side (if considered [`False`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#false) ) or the right side.

Thus the usage:

    EXPRESSION_A and EXPRESSION_B

Can be thought of as working like the following *ternary* [`if`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#if) :

    EXPRESSION_B if EXPRESSION_A else EXPRESSION_A

Which is why you may one day find yourself surprised to find that `True and 1` evaluates to `1` while `1 and True` evaluates to [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) .[or](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#or)[docs](https://docs.python.org/3/library/stdtypes.html#boolean-operations-and-or-not)A *binary* OPERATOR that checks the *truth-value* of two things, evaluating to the thing on the left if it tested [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) , otherwise to the thing on the right.

Derived from the Old English conjunction ***oþþe***, meaning “either”, and implying that either of the ideas conjoined are acceptable, as in “coffee ***or*** tea”. In Python the meaning comes from [logical disjunction](https://en.wikipedia.org/wiki/Logical_disjunction), and implies that either *one* of the things it combines is true or the whole combination is false.

This is Python’s *Boolean disjunction* OPERATOR; used whenever you need to test if *either* side of the [`or`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#or) is considered [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) . It is a *short-circuiting* operation; if the left-hand EXPRESSION is considered [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) the entire operation is considered [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) and the right-hand side will never be evaluated at all. Also, unlike [`not`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#not) it does not necessarily evaluate to either [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) or [`False`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#false) , evaluating instead to either the left side (if considered [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) ) or the right side.

Thus the usage:

    EXPRESSION_A or EXPRESSION_B

Can be thought of as working like the following *ternary* [`if`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#if) :

    EXPRESSION_A if EXPRESSION_A else EXPRESSION_B

This subtlety can catch you out when you find that `True or 1` evaluates to [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) but `1 or True` evaluates to `1`.

**identity checking operator(s)**

[is](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#is)[docs](https://docs.python.org/3/reference/expressions.html#is)A *binary* OPERATOR that tests if the OBJECT on the left has the same [identity](https://en.wikipedia.org/wiki/Identity_%28object-oriented_programming%29) as the OBJECT on the right and then evaluates to either [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) or [`False`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#false) .Can be inverted by [`not`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#not) to become the [`is not`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#is) operator.

An Old English verb from the Germanic stem ***\*es-***; it’s the third person singular present indicative form of the word ***be***, so it generally means “to be \[a thing\]“. In Python its meaning is specific to *identity*, and implies something more like “to be \[some unique thing\]“.

The usage is straightforward:

    EXPRESSION_A is EXPRESSION_B

And the usage with [`not`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#not) is:

    EXPRESSION_A is not EXPRESSION_B

The notion of *identity* is a little abstract, but think of it like this: Tom and Bob are twins, they’re the same height, age, and weight, and they share the same birthday, but they *do not* have the same identity. Tom is Tom, and Bob is Bob, but Tom is not Bob.

In most implementations of Python the identity of an OBJECT can be thought of as its unique address in memory, and since *every* OBJECT you work with will have its own unique address, [`is`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#is) is usually only useful for telling if a NAME refers to a specific OBJECT:

    NAME is OBJECT
    NAME is not OBJECT

Or for testing if two different NAMEs refer to the same OBJECT in memory.

    NAME is OTHER_NAME
    NAME is not OTHER_NAME

There *are* however some special cases: for instance, [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) , [`False`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#false) , and [`None`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#none) are all [singletons](https://en.wikipedia.org/wiki/Singleton_pattern) in memory, meaning there is only *ever* one copy of [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) in *any* Python program. For the most part this is just a space-saving detail you don’t need to worry about, but it explains why in Python we use `VALUE == True` and *not* `VALUE is True` when checking if something is considered *equivalent* to [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) . Testing *identity* is *not* the same as testing *value*.

For this reason the uses of [`is`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#is) are limited and specific, which is why you’ll only rarely see [`is`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#is) and [`is not`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#is) used in practice.

**membership testing operator(s)**

[in](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#in)[docs](https://docs.python.org/3/reference/expressions.html#membership-test-operations)A *binary* OPERATOR that tests if the OBJECT on the left is a member of the COLLECTION on the right and then evaluates to either [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) or [`False`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#false) . Also known as Python’s *inclusion operator*.Can be inverted by [`not`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#not) to become the [`not in`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#in) *exclusion operator*.Also used with [`for`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#for) , see below.

A Middle English merger of the Old English words ***in***, meaning “among”, and ***inne***, meaning “within” or “inside”. The merged word has many usages and meanings, but the general sense here is from the prepositional form, which implies that some thing is contained within or inside some larger thing, as in “a page ***in*** a book” or “a book ***in*** a library”. In Python it is specifically used for *membership testing*, when checking if an item is contained within a group of items.

The usual usage of [`in`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#in) is to test if an OBJECT is a member of a specific CONTAINER:

    OBJECT in CONTAINER

Or to test if OBJECT is [`not`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#not) a member of CONTAINER:

    OBJECT not in CONTAINER

It can be tempting to think you can use [`is`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#is) with [`in`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#in) , but that’s invalid syntax. It helps to remember that since [`is`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#is) , [`is not`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#is) , [`in`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#in) , and [`not in`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#in) are all binary OPERATORs they *must* have either an OBJECT or EXPRESSION on either side, *not* another KEYWORD.

### Four Used to Loop <span id="four-used-to-loop"></span>

The above keywords give you everything you need to perform simple decision making and to take basic actions, but they’re useless whenever you need to do something *repeatedly*; that’s where *looping* comes in. In Python the following four keywords give you everything you need to do that.

**starting a loop**

There are two ways to start a loop in Python, and they’re conceptually pretty similar, but your choice of which depends a great deal on exactly what you need to do with that loop.

**looping until some condition is reached**

[while](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#while)[docs](https://docs.python.org/3/reference/compound_stmts.html#the-while-statement)Starts a loop BLOCK by testing a the truth-value of an EXPRESSION; will iterate continuously until EXPRESSION evaluates to False.

From the Old English word ***hwile*** for “a duration of time”, but here we’re using the conjunctive form which implies “\[during the\] time \[that something is true\]” or “for as long as \[something is true\]“. In programming languages the keyword is always associated with something to *test* and something to *do*, so the meaning becomes “***while*** \[the test is true\], \[do something\]“.

The form of a [`while`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#while) loop BLOCK is always the same:

    while EXPRESSION:
        STATEMENT

If the EXPRESSION evaluates as [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) then STATEMENT will be reached and executed. When the end of the indented BLOCK is reached, control returns immediately to the top, then EXPRESSION is tested again, and so on. So long as EXPRESSION evaluates as [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) the entire indented BLOCK will be run again and again.

The [`while`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#while) loop can also *optionally* be terminated by an [`else`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#else) BLOCK:

    while EXPRESSION:
        [...]
    else:
        STATEMENT

In this case the STATEMENT inside the [`else`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#else) block will executed if the [`while`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#while) loop runs all the way to completion (its test evaluates to [`False`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#false) ) *without* encountering [`break`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#break) . This can be useful when there is some cleanup action that needs to occur when a [`while`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#while) loop has exited naturally.

The [`while`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#while) is the most basic form of loop, but it’s a little dangerous if not used with care. This is because any EXPRESSION that *always* evaluates as [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) will run *forever*. For this reason it’s generally important to design the EXPRESSION so that it will *eventually* evaluate to [`False`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#false) .

**looping through the members of a collection**

[for](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#for)[docs](https://docs.python.org/3/reference/compound_stmts.html#the-for-statement)Starts a loop BLOCK that will iterate *once* over a COLLECTION, visiting every item in it.Can also be marked with [`async`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#async) , to start an [`async for`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#async) loop, see below.

An Old English word via the German ***für*** with a great many meanings; the general meaning is taken from a prepositional sense of “\[performing an action\] on behalf of \[some thing\]“. In computing, though, the meaning is actually taken from the contraction of the word ***for*** with either ***every*** (meaning “each \[item\] in a group”) or ***each*** (meaning “all \[of a group\]“) to form ***for every*** or ***for each***, both of which mean “\[to perform an action\] on behalf of each item \[in a group\]“. In programming languages that descend from ALGOL [***for***](https://en.wikipedia.org/wiki/For_loop) has traditionally been the most common name for such a loop, with ***do*** used in a smaller number of languages. Python takes the name from the traditional usage in ALGOL via C, however it is more accurate to describe Python’s version as a [***foreach***](https://en.wikipedia.org/wiki/Foreach_loop) loop, because there is no explicit counter and the thing being looped over must be [*iterable*](https://en.wikipedia.org/wiki/Iteration).

The usage of [`for`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#for) consistently involves assigning a user-assigned NAME to every OBJECT [`in`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#in) a COLLECTION.

    for NAME in COLLECTION:
        STATEMENT

Thus [`for`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#for) every item in the COLLECTION the NAME will refer to that item *inside* the scope of the BLOCK; this allows the STATEMENT to use NAME to act on that thing.

This can be a little easier to grasp if you think of [`for`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#for) as a specialized form of [`while`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#while) loop:

    while [items remain in COLLECTION to visit]:
        NAME = [increment to the next item]
        STATEMENT

But obviously the [`for`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#for) loop is much simpler to work with, as you don’t need to worry about implementing the machinery necessary to track the start and stop conditions of the loop. You’ll find that you can, and usually should, use a [`for`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#for) loop whenever you’re visiting the individual contents of a COLLECTION, rather than risk a runaway [`while`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#while) loop.

The [`for`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#for) loop can also *optionally* be terminated by an [`else`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#else) BLOCK:

    for NAME in COLLECTION:
        [...]
    else:
        STATEMENT

In this case the STATEMENT inside the [`else`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#else) block will executed if the [`for`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#for) loop has run to completion *without* encountering [`break`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#break) . This can be useful when there is some cleanup action that needs to occur when a `for` loop has exited naturally.

**controlling a loop**

You don’t always want to simply run the loop to completion; there may be good reason to exit early, or to skip a round of the loop.[break](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#break)[docs](https://docs.python.org/3/reference/simple_stmts.html#the-break-statement)Used to immediately interrupt the current loop iteration, ending the BLOCK it is found within. For this reason must *only* be used within a loop BLOCK.

From the Old English word ***brecan***, which has several forms and meanings. The noun form generally means “to damage, destroy, or render unusable”, as in “to ***break*** a leg”. Here, however, we use the alternative meaning “to interrupt \[a continuous sequence\]“, as in “to ***break*** an electrical circuit”. In programming it specifically means to interrupt a loop from inside that loop.

The [`break`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#break) statement always forms a line of its own, and it *must* be used in either a [`for`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#for) or [`while`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#while) loop. The most common use is to stop a loop immediately if some particular condition is reached:

    while True:
        if EXPRESSION:
            break
        STATEMENT

    for NAME in COLLECTION:
        if EXPRESSION:
            break
        STATEMENT

This is particularly useful if there’s some situation that warrants stopping the loop before it would normally be completed.[continue](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#continue)[docs](https://docs.python.org/3/reference/simple_stmts.html#the-continue-statement)Immediately skips the rest of the current loop BLOCK, allowing the loop to continue on to the next iteration. For this reason must *only* be used within a loop BLOCK.

A Middle English verb borrowed via the Old French ***continuer*** from the Latin ***continuare***. The general meaning used here is to “go forward or onward”, “carry on”, or “proceed”. In programming it means to cause a loop to start executing the next iteration, skipping any instructions that follow it.

The [`continue`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#continue) statement always forms a line of its own, and it must be used in either a [`for`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#for) or [`while`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#while) loop. The most common use is to skip to the next iteration of a loop immediately when some particular condition is reached:

    while True:
        if EXPRESSION:
            continue
        STATEMENT

    for NAME in COLLECTION:
        if EXPRESSION:
            continue
        STATEMENT

This is particularly useful if there’s some situation that warrants skipping the current loop; for example if you only wanted to act on every second iteration.

### Three for Importing Other Things <span id="three-for-importing-other-things"></span>

All of the above, plus the *builtin* functions we’ll talk about in a later article, are sufficient to let you start using Python as a *scripting* language, where you glue together things others have written with your own code to do some task you want to accomplish. But you need to be able to access those “things others have written” to do so. That’s what Python’s *import mechanism* is for.[import](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#import)[docs](https://docs.python.org/3/reference/simple_stmts.html#the-import-statement)Used to bring the functionality of an external MODULE into your own code.

A verb from the Middle English ***importen***, via the Old French from the Latin ***importare***. The general meaning is to “bring/carry \[goods into this country\] from abroad”. In computing it means to bring or ***import*** some functionality *exported* by another program written in the same language into the current program.

The most common usage is very simple, the keyword is followed by the MODULE you want to access:

    import MODULE

You can also import multiple MODULEs separated by commas:

    import MODULE_A, MODULE_B

And for organizational purposes you can put parentheses around them as well:

    import (MODULE_A, MODULE_B)

Any NAME inside the imported MODULE(s) can then be accessed within your own program using the *dot access* pattern in the form MODULE.NAME. So, for instance, if you wanted to get the circumference of a circle:

    import math

    radius = 3
    circumference = math.tau * radius

Usually you’ll find all the [`import`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#import) usage at the top of a MODULE, which makes it pretty easy to determine where such functionality comes from.[from](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#from)Modifies [`import`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#import) to allow you to import specific NAMEs from within an external MODULE.Can also be used with [`raise`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#raise) and [`yield`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#yield) , see below.

A Middle English word from the Old English ***fram***, here we use the preposition form, with a general sense of “departure or movement away \[from something\]“; in computing we use a more specific sense of “taken ***from*** a source”.

It’s used to modify [`import`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#import) to import a specific NAME from a MODULE, rather than the *entire* MODULE:

    from MODULE import NAME

If you wish to import more than one NAME they can be separated by commas:

    from MODULE import NAME_A, NAME_B

And for organizational purposes you can put parentheses around them as well:

    from MODULE import (NAME_A, NAME_B)

In all cases you can then use the imported NAME directly, so for instance if you want the area of a circle:

    from math import tau

    radius = 3
    area = tau * radius ** 2 / 2

The main reason for [`from`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#from) is to remove the need to have many references to a MODULE peppered throughout your code, but it’s best reserved for when the MODULE has many NAMEs that it exports and you want to just use one or two.[as](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#as)Modifies [`import`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#import) to create an alternative NAME (or alias) for an imported NAME.Can also be used with [`except`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#except) and [`with`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#with) , see below.

From the Old English ***eallswā*** meaning “just so” or simply “all so”, which makes it a reduced form of ***also***. The usage here comes from the adverb form meaning “\[to act\] in the manner or role \[of some other thing\]“. In Python it very specifically means “\[from here on refer to this thing\] ***as*** \[this instead\]“.

Because [`from`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#from) exists there are two forms of usage:

    import MODULE as MODULE_ALIAS
    from MODULE import NAME as NAME_ALIAS

The point of [`as`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#as) is to allow you to [`import`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#import) some MODULE or NAME but refer to it by some other name. This is useful if the original name is particularly long, would conflict with one already in use in your code, or could simply use some extra information in context.

    from math import pi as half_as_good_as_tau

### Five for Exceptional Situations <span id="five-for-exceptional-situations"></span>

Now that you’ve got the basics down, you’re getting into more complicated territory. What happens if you find yourself reaching a point in the code where you’re in an obvious error state and you don’t want to continue? This is where the notion of [exception handling](https://en.wikipedia.org/wiki/Exception_handling) come into play. We’ll go into more detail on the standard Exceptions in later articles, but for now let’s just say that an EXCEPTION is a special type of VALUE that signifies a specific issue that has come up in your program. That issue *might* be an *error*, in which case you might want to crash out of the program, or it might be a signal that something *unusual* but expected has occurred. Either way you need to be able to emit those signals from your own code, as well as catch and react to such signals emitted by other code.

**to signal that there’s a problem**

[raise](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#raise)[docs](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement)Used to raise a specified EXCEPTION, which will cause the program to stop immediately and exit if not handled by an [`except`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#except) BLOCK.If used without an argument inside an [`except`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#except) or [`finally`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#finally) BLOCK, re-raises the EXCEPTION being handled by the BLOCK.

A Middle English word with *many* meanings, but in this case it comes from the verb form meaning “to lift upright, build, or construct” or “to make higher”. The meaning in computing is more specifically from a newer sense of “to mention \[a question, issue, or argument\] for discussion”, as in “to ***raise*** attention \[to an issue\]“. In several other programming languages ***throw*** is used with similar meaning.

The usage is *usually* going to be:

    raise EXCEPTION

Quite rarely you might see the *chained* form:

    raise EXCEPTION from OTHER_EXCEPTION

Which is used to indicate that the EXCEPTION being raised was *caused by* (or *came from*) some other EXCEPTION. This isn’t used often, but sometimes is useful when you attempt to handle an exception raised by other code but somehow cannot do so.

Lastly *inside* an [`except`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#except) BLOCK you can simply:

    raise

Which will re-raise whatever EXCEPTION is currently being handled inside that BLOCK.

**to signal that a particular condition is not met**

[assert](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#assert)[docs](https://docs.python.org/3/reference/simple_stmts.html#the-assert-statement)Used to test if some EXPRESSION is considered True, and if not raise an AssertionError.

From the Latin ***assertus***, with the general sense of “declared, protected, or claimed”. In programming it specifically means to specify that a condition must be met at a particular point in the code, and to error if it is not.

The usage of [`assert`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#assert) is usually going to be in the form:

    assert EXPRESSION

Which will simply [`raise`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#raise) an AssertionError if EXPRESSION does not evaluate as [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) .

An alternative form allows you to specify a message:

    assert EXPRESSION, "something is wrong!"

And this message will be incorporated into the AssertionError.

The [`assert`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#assert) statement exists for you to test the things that *must* be [`True`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#true) for your program to continue to work (we call these your *invariants*). This can be very helpful when developing and debugging, but should not be relied on, *at all*, in production code, as the person running your program can elect to disable all [`assert`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#assert) statements by passing the `-O` command line option to Python. Basically you can imagine that [`assert`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#assert) works like:

    if [the -O command line flag was not passed]:
        if not EXPRESSION:
            raise AssertionError

… except that if the `-O` flag was passed the [`assert`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#assert) statement will simply be replaced by [`pass`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#pass) and nothing whatsoever will happen.

**to catch a signal and react to it**

With both [`raise`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#raise) and [`assert`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#assert) in your toolkit you know how to signal an EXCEPTION, but how do you catch and react to (or ignore) one? This is where [Python’s exception handling](https://docs.python.org/3/tutorial/errors.html#handling-exceptions) mechanism comes into play.[try](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#try)[docs](https://docs.python.org/3/reference/compound_stmts.html#the-try-statement)Starts an exception handler BLOCK; *must* be followed either an [`except`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#except) BLOCK, an [`else`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#else) block or a [`finally`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#finally) BLOCK in order to be valid syntax.

A verb borrowed from the Old French word ***trier***, meaning to “test”, “experiment”, or “attempt to do”. The meaning in Python is essentially the same, “\[start a\] test \[of something that *may* error\]“.[except](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#except)Optionally *continues* an exception handler BLOCK by catching EXCEPTIONs; can (and *should*) be limited to specific types of EXCEPTION. More than one of these can follow a [`try`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#try) and each will be checked in turn until either the EXCEPTION is handled or no more [`except`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#except) statements remain.

A verb borrowed from the Middle French ***excepter*** and Latin ***exceptus***; the original meaning is “to receive”, but the more general uses it to “exclude \[something\]” or “object to \[something\]“, as in “every fruit except apples”. The meaning in Python is a little vague, but can be thought of as “catch, capture, or trap \[an exception\]“. In fact in many other languages ***catch*** is used for the same purpose; Python’s ***except*** is the exception to that rule.[finally](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#finally)Optionally *cleans up* an exception handler BLOCK to provide a means of *always* performing some action whether or not the EXCEPTION was handled. *Must* follow any [`except`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#except) BLOCKS that are present, as well as the optional [`else`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#else) BLOCK if that is also present. If no [`except`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#except) BLOCK is present then [`finally`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#finally) *must* terminate the exception handler.

From the Middle English ***fynaly*** meaning “at the end or conclusion” or just “lastly”. It implies the very last thing to do in a sequence, which is the meaning here as well.

Exception handling is the first circumstance you’ve encountered in which one BLOCK *must* be followed by another, and the rules are somewhat more complicated than anything you’ve yet seen. For instance there are *two* different *minimal syntactically valid* forms of exception handler:

    try:
        BLOCK
    finally:
        STATEMENT

This form does not actually handle any EXCEPTION raised within BLOCK, it merely ensures that STATEMENT is run in all circumstances. Any EXCEPTION not handled will continue to “raise up” until it is either handled or crashes your program. This is useful for situations in which you want to do the same action (such as closing a file or database connection) whether or not there has been an error.

The second form *does* handle an EXCEPTION:

    try:
        BLOCK
    except:
        STATEMENT

**Note**: because this form will catch *any* EXCEPTION, including several that are used by Python to perform critical operations, you should, practically speaking, **never** use the above form. Instead use the *minimum safe* form:

    try:
        BLOCK
    except EXCEPTION:
        STATEMENT

This ensures that the exception handler *only* handles the EXCEPTION *type* specified. The [hierarchy of built-in exceptions](https://docs.python.org/3/library/exceptions.html#exception-hierarchy) in Python is complex and touches on concepts we can’t cover in this article, but for now just know that `except Exception` is the *least* specific [`except`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#except) statement you should ever use in production code.

That minimum safe form, however, isn’t particularly useful, because the STATEMENT can’t actually know what EXCEPTION it’s handling. Most of the time you’ll see something like this:

    except EXCEPTION as NAME:
        STATEMENT

Which uses [`as`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#as) to provide an alias NAME that can be used to inspect the actual EXCEPTION that was raised. This can be very helpful for seeing precisely what went wrong, which will help you decide if you can ignore the problem or need to respond in some way.

You can also specify multiple different types of EXCEPTION to catch, which can be helpful if you want to respond to any of those forms in the *same* way:

    except (EXCEPTION_A, EXCEPTION_B, EXCEPTION_C) as NAME:
        STATEMENT

And if you want to respond to them each in a *different* way you can just stack [`except`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#except) BLOCKS:

    except EXCEPTION_A as NAME:
        STATEMENT_A
    except EXCEPTION_B as NAME:
        STATEMENT_B

You can also optionally use [`else`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#else) with an exception handler, so long as at least one [`except`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#except) statement is used, and as long as the [`else`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#else) is positioned *before* any [`finally`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#finally) :

    try:
        BLOCK_A
    except EXCEPTION as NAME:
        BLOCK_B
    else:
        STATEMENT

However this is relatively rare, because the STATEMENT indented under [`else`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#else) will *only* be executed when no EXCEPTION was raised inside the [`try`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#try) BLOCK *and* no [`break`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#break) , [`continue`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#continue) , or [`return`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#return) statements were encountered within it.

As you’ve seen exception handling has some fairly dense syntax compared to the rest of Python. A fully fleshed out exception handler in a program that does something fairly complex, like interacting with a database, might involve all these parts.

    try:
        [connect to database]
        [query the database]
    except ConnectionError as error:
        [log the error]
    else:
        [log success]
    finally:
        [close the connection]

But, thankfully, it’s often not that complex, and you usually only have to deal with exception handling when something truly exceptional has happened.

### Four for Writing Functions <span id="four-for-writing-functions"></span>

Now that you’ve got all the structures you need to write an arbitrarily complex program, with the ability to make decisions, loop, and handle errors, your biggest problem is going to be organizing those structures into re-usable units. For instance you don’t want to type out a complex exception handler for every single time you connect to and query a database, as that would quickly lead to an unmanageable amount of repetition.

One of the key mantras of programming is [Don’t Repeat Yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) (aka **DRY**); the less boilerplate, the better, and so you want to be able to create [subroutines](https://en.wikipedia.org/wiki/Subroutine), which are the most basic form of *code re-use*. In Python the most common form of subroutine is the *function*, which comes in two primary forms.

**anonymous (unnamed) functions**

A lot of people teaching (and learning) Python tend to skip over anonymous functions, or treat them as an advanced feature, but that’s really just because they’re poorly named. The “anonymous” part just means the function isn’t given a specific name at creation time. That might not sound like the easiest thing to re-use – and you’re right – but it’s useful to understand them before we head on to *named* functions because they’re fundamentally simpler and more constrained.

Unfortunately the powers that be decided that anonymous functions, already saddled with a bad and confusing name, should *definitely* get a worse name in Python.[lambda](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#lambda)[docs](https://docs.python.org/3/reference/expressions.html#lambda)Used to define a CALLABLE [anonymous function](https://en.wikipedia.org/wiki/Anonymous_function) and its *signature*.

The 11th letter of the Classical Greek alphabet, ***λ***; it has no general meaning in English. In Python it is used because anonymous functions are a fundamental unit of [Alonzo Church’s Lambda Calculus](https://en.wikipedia.org/wiki/Lambda_calculus), which provides much of the mathematical underpinnings of modern computation. As an honor, that’s nice; in reality ***lambda*** would be used more often if it had a more fun name.

Despite the name a [`lambda`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#lambda) is actually the conceptually simplest form of function in Python, because you can think of it as a just a way of creating a delayed-evaluation EXPRESSION that’s stated with a specific form:

    lambda : EXPRESSION

Which evaluates to a CALLABLE that will evaluate the EXPRESSION that comes *after* the colon only when the CALLABLE is itself called. To call it you use the *call syntax* that is common to all Python CALLABLEs, however since the [`lambda`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#lambda) is itself an EXPRESSION you need to surround it with parentheses to do that.

    (lambda : EXPRESSION)()

And *voila*, everything you’ve just written will instantly be replaced by whatever the inner EXPRESSION evaluates to.

Thus all three of these are entirely identical:

    x = (lambda : 2 + 2)()
    x = 2 + 2
    x = 4

But just delaying an EXPRESSION isn’t really the most useful tool. So the [`lambda`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#lambda) introduces the idea of a *function signature*: you can add a NAME to the left side of the colon and the thing that NAME refers to will able to be used inside the inner EXPRESSION when it evaluates. This name is known as a *parameter* of the function.

Here’s a [`lambda`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#lambda) with a single parameter:

    lambda NAME: EXPRESSION

And here’s one with two parameters:

    lambda NAME_A, NAME_B: EXPRESSION

And when we want to use the [`lambda`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#lambda) we just call it, passing in a concrete VALUE for every parameter in the signature:

    (lambda NAME_A, NAME_B: EXPRESSION)(VALUE_A, VALUE_B)

Which you can imagine can be useful if we want to calculate the area of a rectangle:

    lambda width, height: width * height

But, again, we’re going to end up writing that a lot if we don’t assign it to a NAME:

    area = lambda width, height: width * height
    square = area(2, 2)
    rectangle = area(3, 5)

Great! The `square` is now `4` and `rectangle` is `15`; we’ve got the basis of code re-use!

But [`lambda`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#lambda) is going to get pretty nasty when the EXPRESSION starts to get long. And beyond that there are some pretty significant limitations, since we actually *cannot* execute many kinds of STATEMENT within a [`lambda`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#lambda) , much less an arbitrary BLOCK. They have their place, but maybe there’s a better and more flexible way?

Since we’ve just gone and assigned what is supposed to be an *anonymous* (which means “has no name”) function to a NAME, let’s look at how we should *usually* write functions in Python.

**named functions**

The *named* function builds on the ideas of the [`lambda`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#lambda) but take them to a *much* more flexible place, allowing you to re-use large chunks of code quite easily. They’re a little more subtle to master too, because they don’t evaluate exactly like an EXPRESSION. In fact by default they’ll always evaluate to [`None`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#none) unless you explicitly tell them to do otherwise.[def](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#def)[docs](https://docs.python.org/3/reference/compound_stmts.html#function-definitions)Used to define a *named* function and its *signature*, the indented BLOCK that follows can then be re-used by calling that NAME using the `function()` syntax.If used inside a [`class`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#class) defines a named *method* instead, which is called using the `class.method()` syntax.Can also be marked with [`async`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#async) , to start an [`async def`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#async) , see below.

A contraction of the word ***define***, which comes via the Middle English ***deffinen*** from Old French and Latin roots. It’s a verb that means “to specify or fix \[the meaning of a word or phrase\]“. In Python it is used specifically to create a named subroutine. In other languages ***define***, ***fn***, ***fun***, ***func***, ***function***, and ***let*** are often used instead.

Because [`def`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#def) can be used to create arbitrarily complex CALLABLEs, it’s going to require some explanation. Essentially it’s used to create a new NAME that refers to a CALLABLE. In fact, from now on let’s just use FUNCTION to mean exactly that:

    def FUNCTION():
        STATEMENT

This defines a FUNCTION that can be called using `FUNCTION()`, which will then execute every STATEMENT inside the indented BLOCK. As you can see it’s conceptually equivalent to the “named” [`lambda`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#lambda) form you saw earlier. Compare these two forms:

    def FUNCTION(NAME_A, NAME_B): STATEMENT
    FUNCTION = lambda NAME_A, NAME_B : STATEMENT

And you’ll see they’re *very* similar, except that the [`def`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#def) version can run an arbitrary number of STATEMENTs[3](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#fn:3).

These STATEMENTs will be executed within the *local scope* of the function, meaning that *any* NAME assigned *inside* the function cannot be *directly* seen or accessed by any code *outside* the function. In this example there are no such names, but there will be as soon as we change the *signature* of the function:

    def FUNCTION(NAME):
        STATEMENT

And just as with [`lambda`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#lambda) we can have multiple parameters:

    def FUNCTION(NAME_A, NAME_B):
        STATEMENT

Which let’s us build the `area` function we made before with a [`lambda`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#lambda) :

    def area(width, height):
        width * height

    square = area(2, 2)
    rectangle = area(3, 5)

Except, wait a minute … didn’t I say just above that [`def`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#def) functions evaluate to [`None`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#none) when called? Yep, right now both `square` and `rectangle` are assigned to [`None`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#none) . We’ve calculated two areas, but then discard them again as soon as the *local scope* of `area` is closed. Now, how the heck do we get the area *out* of `area`, anyway?

**stop the function and give back a value**

[return](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#return)[docs](https://docs.python.org/3/reference/simple_stmts.html#the-return-statement)Used to immediately give up control and end execution of the function at the point at which it is encountered. If followed by an EXPRESSION, that is evaluated first and the resulting OBJECT is given back to the caller of the function. If no EXPRESSION is present [`None`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#none) is returned instead. Has no meaning outside a function, thus if present at all it *must* be inside a BLOCK that follows a [`def`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#def) .

A Middle English verb from the Old French ***retourner***, meaning “to turn back” or “to go back \[to a former position\]“. In computing it has two meanings:

1.  The intransitive meaning is “to give back (or relinquish) control \[to the calling procedure\]“, as in “when the function exits it will ***return*** control”.
2.  The transitive meaning is “to pass \[some data\] back to the calling procedure”, as in “this function will ***return*** the current time”.

In Python both meanings are combined, since a function will always ***return*** both control *and* data to the caller.

The most basic usage of [`return`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#return) immediately ends the function and returns [`None`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#none) to the caller:

    return

This form is relatively rarely used; as mentioned before a function *always* evaluates to [`None`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#none) by default; thus you can imagine that [`return`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#return) is the implicit last line of *every* function.

Because of that it is much more common to see:

    return EXPRESSION

Which immediately evaluates the EXPRESSION and returns the resulting OBJECT back to the caller.

You can also use [`return`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#return) to pass back more than one OBJECT:

    return EXPRESSION_A, EXPRESSION_B

This evaluates each EXPRESSION in turn, ends the function, and returns a [**tuple**](https://docs.python.org/3/library/functions.html#func-tuple) (a type of fixed-length COLLECTION) containing one OBJECT for each EXPRESSION.

This multiple form is also relatively rare, as it can be a bit of a surprise to the user of the code, and so requires a bit more effort in documentation, but it can be convenient for internal functions that you don’t intend to be used by others.

What you’ll notice is that [`return`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#return) *terminates* a function at the moment it’s evaluated. Anything below that point in the function essentially doesn’t exist (with one exception, the [`finally`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#finally) block inside an exception handler). So how would you handle situations in which you needed to give back data, but continue to work afterwards?

**pause the function and give back a value**

[yield](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#yield)[docs](https://docs.python.org/3/reference/simple_stmts.html#the-yield-statement)Used to immediately pause execution and temporarily give up control at the point at which it is encountered. If followed by an EXPRESSION, that is evaluated first and the resulting OBJECT is yielded back to the caller of the function; if no EXPRESSION is present [`None`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#none) is yielded instead. Has no meaning outside a function, thus if present at all it *must* be used inside a BLOCK that follows a [`def`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#def) .Can be modified by [`from`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#from) to form [`yield from`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#yield) , see below.

Etymologically the oddest word in this list; derives from the Middle English ***yielden*** and the Old English ***gieldan***, both of which mean “to pay”, and share their root with the Old Norse ***gjald*** and the German ***geld***, both of which mean “money”. Today ***geld*** means an ancient form of compelled tax or ransom, but it also means “to castrate”. Historically the Dangeld was a tax raised on the English by their king. This tax was raised to pay waves of Danish Vikings to, presumably, not castrate the English (or, at the very least, their king). None of this is directly important here, but might explain a little of why the meaning in computing derives from both “to give way and relinquish control”, as in “***yield*** to oncoming traffic”, and “to give back \[a result or return on investment\]” as in “the fund has a ***yield*** of 5% per year”. In both cases the implication is that the situation is not yet final, and is likely recurring: you ***yield***, then you wait, then you ***yield*** again.

In Python it helps to remember an allegory: [`return`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#return) is Death, and comes exactly once, while [`yield`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#yield) is Taxes, and may only end when Death arrives.

The usage of [`yield`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#yield) is similar to [`return`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#return) :

    yield

    yield EXPRESSION

    yield EXPRESSION_A, EXPRESSION_B

However *any* function that uses [`yield`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#yield) actually returns a special kind of COLLECTION known as a GENERATOR when called. Unlike a normal COLLECTION a GENERATOR does not hold all of its items in memory simultaneously, but instead “generates” each item as required by running through the function until [`yield`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#yield) is encountered and it gives forth an item. The GENERATOR pauses execution at that point, allowing the code using the GENERATOR to work with that item. When desired it can request the next item, at which point the GENERATOR continues running to the next [`yield`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#yield) , and so on until there are no more [`yield`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#yield) statements left to run or a [`return`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#return) is encountered.

This is what allows the next form:

    yield from GENERATOR

Which is a specialized use case that allows you to write a GENERATOR that will [`yield`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#yield) every item, in turn, from *another* GENERATOR.

A thorough explanation of GENERATORs is outside the scope of this series of articles, as they’re a fairly advanced topic. For now it’s sufficient to know that if you encounter [`yield`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#yield) you’re looking at a GENERATOR.

### Three for Manipulating Namespaces <span id="three-for-manipulating-namespaces"></span>

Now that you understand the basics of function, you’ll need to know about [namespaces](https://en.wikipedia.org/wiki/Namespace), as they become very important when you start building more complex programs.

At its simplest a namespace is essentially just the place where Python stores any NAME you create, so they’re used whenever Python needs to look up the OBJECT referred to by that NAME. Each namespace has a *scope*, which limits how long the namespace “lives” and whether or not any NAME within it is *readable* and/or *writable* by a given STATEMENT. Namespaces form a hierarchy, however, so the rules can be a bit tricky to remember.

In any given namespace a STATEMENT can:

1.  both *read* and *write* any NAME defined in its own namespace
2.  *read*, but not *write*, any NAME defined in an enclosing *parent* namespace
3.  neither *read* nor *write* any NAME defined in a *sibling* or *child* namespace

At the top level is Python’s own namespace, which contains all the *builtin* NAMEs that Python provides for you. This namespace *cannot* be written to, and any NAME in it essentially lives forever.

Next comes the *global* namespace, which is the namespace of the MODULE you’re working in; it becomes the parent of all other namespaces created within that MODULE. Any NAME defined here *usually* lives for the duration your program is running.

Next, each CALLABLE you create gets its own unique *local* namespace *when it is called*; any NAME created here lives only as long as the CALLABLE is running, and when it finishes both the NAME and the OBJECT it refers to will be destroyed, unless either [`return`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#return) or [`yield`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#yield) is used to pass it back to the calling scope.

Since you can define a CALLABLE that is nested *inside* another CALLABLE you can build a namespace hierarchy of arbitrary depth, so any given NAME might exist in any number of namespaces further and further removed from where you’re actually trying to use that NAME. This can get unwieldy to think about pretty quick, though, which is why we *try* to limit the amount of nesting we do in practical code.

The assignment of a new NAME is pretty straightforward: unless modified by one of the keywords below a NAME is *always* assigned in the scope in which the assignment STATEMENT occurs.

But the *use* of a NAME is a little less obvious: when used in a STATEMENT Python first searches for the NAME in the immediate *local* scope. If it cannot find the NAME then it searches the immediate parent (known as the *nonlocal*) scope, and then it keeps searching each successive parent scope until it either finds the NAME or cannot resolve it and errors.

All of this usually somewhat invisible machinery exists to allow you to write code using NAMEs that are appropriate and clear to the scope in which you’re working. So long as it isn’t a keyword and you don’t *need* to use the NAME from an ancestor’s scope you can use whatever NAME you want locally and not worry about it overwriting anything *outside* its own scope.

*Most* of the time you don’t want to fool around with that machinery, but every so often there’s a good reason to. Or a bad one that’s gotten you confused.

**write to the top from anywhere**

In *extremely rare* circumstances you want to directly manipulate the *global* namespace in a way you wouldn’t normally be allowed.[global](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#global)[docs](https://docs.python.org/3/reference/simple_stmts.html#the-global-statement)Used to declare a NAME as part of the *global* namespace; the NAME *cannot* have been used previously in the same namespace. In effect this allows a *local* STATEMENT to both create and assign to a *global* NAME it otherwise could only read. *Can* be used within the global namespace, but has no effect.

An adjective borrowed from the French, with the general meaning of “worldwide” and “universal”. In computing the meaning is specifically “\[a NAME that is\] accessible by all parts of a program”. In Python it is both the top-most *namespace*, which is *readable* from within all functions and methods, but is also a keyword that binds a *local* NAME into the ***global*** namespace, allowing it to be *writable* from within that *local* namespace.

The usage is quite simple; the main restriction is that it cannot appear *after* the NAME has been used:

    global NAME
    NAME = EXPRESSION

You should be aware that the use of [`global`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#global) is an *immediate* [code smell](https://en.wikipedia.org/wiki/Code_smell), as its use is *almost always* an indication of bad coding habits, because it *usually* can – and almost certainly *should* – be replaced with *argument passing* and *return values*. There are data structures and dynamic code generation tasks that would be impossible to build without it, but the *odds* are if you’re thinking about using it, **don’t**.

**write to the parent from the child**

Slightly more often there’s a need for the child to tell the parent what to do.[nonlocal](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#nonlocal)[docs](https://docs.python.org/3/reference/simple_stmts.html#the-nonlocal-statement)Used exclusively inside *nested* functions / methods (also known as *closures*) to bind a *pre-existing* NAME in the *parent*’s namespace. This allows a STATEMENT in the child to have write access to a NAME defined in its parent. *Must* appear before any reference to that NAME in the local scope.

An adjective formed by combining the prefix ***non-*** (“not”) and ***local*** (“pertaining to a particular place”). This is a primarily scientific and technical *neologism* (literally “new word”) that has no true general meaning, only specific meanings within specific fields. In programming it signifies a [non-local variable](https://en.wikipedia.org/wiki/Non-local_variable), meaning “\[a NAME that is\] accessible in neither the *local* nor the *global* namespace”. In Python it very specifically applies to the namespace of the enclosing function from the point of view of a nested function, and is also a keyword that binds a *local* NAME within that nested function into the ***nonlocal*** namespace, allowing it to be *writable* from within the nested function.

Because it is *only* of use inside a nested function, usage will always involve some enclosing structure:

    def OUTER_FUNCTION():
        NAME = VALUE
        def INNER_FUNCTION():
            nonlocal NAME
            NAME = EXPRESSION
        INNER_FUNCTION()

The key thing to understand is that [`nonlocal`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#nonlocal) is used in a *similar* fashion to [`global`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#global) , but with the more limited goal of making a variable in the parent of a nested function writable. It has similar caveats as well, though the fact that its impact isn’t felt by the *entire* program makes it inherently less dangerous. Still, its uses are *very* narrow and *relatively* few, so try not to abuse it when argument passing will do.

**kill it with fire**

So far you’ve seen how to *add* a NAME to a namespace, but how do you *remove* a NAME from a namespace?[del](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#del)[docs](https://docs.python.org/3/reference/simple_stmts.html#the-del-statement)Used to delete a NAME (or NAMEs) from a namespace; if no other references exist to the OBJECT that NAME referred to, the underlying OBJECT is deleted as well.Can also be used to delete an attribute of an OBJECT or a member (or members) of a COLLECTION *if* the specific type has allowed this operation.

A contraction of ***delete***, which is in turn a verb derived from the Latin ***deletus***. Its general meaning is to “destroy or eradicate”, “erase or smudge out”, and “utterly remove”, and while the specific meaning in computing is a little less violent it has similar effect. In Python the meaning is a little indirect: ***del*** is used to delete a *reference* that the *user* directly controls, which *may* indirectly trigger deletion of the thing referred to from process memory, which the *interpreter* controls.

The most common usage is to provide a single NAME:

    del NAME

However it is also valid to provide multiple NAMEs, comma separated:

    del NAME_A, NAME_B, NAME_C

In either case Python will proceed left to right, deleting each NAME from the namespace in which the [`del`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#del) invocation has occurred.

Because the effect is limited to the *closest* namespace, you have to use [`global`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#global) or [`nonlocal`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#nonlocal) to delete a NAME outside the local namespace:

    global NAME
    del NAME

You can also use [`del`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#del) to delete attributes of OBJECTs and member(s) of COLLECTIONs, however what actually happens depends on the type of the OBJECT / COLLECTION involved. The **list** COLLECTION, for instance, allows you to use [`del`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#del) to delete both individual *indices* and *slices* of its contents:

    test = [1, 2, 3]
    del test[0]         # deletes the first item
    del test[:]         # deletes all items

We’ll leave a further exploration of this for when we discuss the *builtin* types in later articles. In the meantime, let’s finally meet the keyword that will let you start defining such type-specific behaviors for yourself.

### One for Defining New Types of Object <span id="one-for-defining-new-types-of-object"></span>

Up until this point I’ve been pretty vague about what an OBJECT actually is. In the [Object-Oriented Programming](https://en.wikipedia.org/wiki/Class_%28computer_programming%29) paradigm, also known as OOP, an object is, basically, a *thing* that has both *state* (in the form of named *attributes*) and *behavior* (in the form of callable *methods*). Two individual things of the same *type* may have different specific values for those attributes – we call them different *instances* of the same *type* – but they share the same overall *interface*. However there’s a bit more to it than that; the programmer should be able to define partial interfaces, which we’ll call *traits*, that types with similar needs can implement in different ways, such that they all share some common attributes and behaviors (a property known as [*polymorphism*](https://en.wikipedia.org/wiki/Polymorphism_%28computer_science%29)). Additionally these traits should be able to be passed from more generic types to more specific types via an [inheritance](https://en.wikipedia.org/wiki/Inheritance_%28object-oriented_programming%29) mechanism, much as a parent passes on traits to their children.

You can take an example from nature; a duck is a type of bird, and it inherits certain traits it shares will all birds. All birds are a type of animal, and thus inherit certain traits shared will all animals. An animal is a type of life, and so on. Thus Howard, a specific duck, has all the attributes and behaviors of life, animals, birds, and ducks, all rolled up nicely in one instance of the duck type.

In fact it is from just such an example of biological *classification* that Python takes the keyword it uses for defining new types of OBJECT.[class](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#class)[docs](https://docs.python.org/3/reference/compound_stmts.html#class-definitions)Used to define a template for a new type of OBJECT.

A noun borrowed via the French ***classe*** from the Latin ***classis***, which meant “a division, army, fleet”, “the people of Rome under arms”, and, oddly specifically, “any one of the six orders into which Servius Tullius divided the Roman people for the purpose of taxation”, which goes a long way towards explaining why English is such a difficult language to master. The general meaning we use here, though, is loosely borrowed from evolutionary taxonomy, implying “a group that shares certain inheritable traits”. The specific meaning in Python comes from Object-Oriented Programming and implies “a template for creating objects that share common inheritable state (attributes) and behavior (methods)”.

In Python you define a new type by creating a new NAME that is also a CALLABLE; from now on we’ll call that a CLASS. The [`class`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#class) keyword is used to start a new BLOCK that defines the *implementation* of that CLASS:

    class CLASS:
        pass

The CLASS can now be called to create a new instance of its type:

    NAME = CLASS()

Now from the above you might expect that instance to have *no* attributes or behavior, but in fact it does have the *minimal* interface that all OBJECTs share (it can be printed and used in comparisons, for instance, though not very usefully). It receives this because *all* new [`class`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#class) definitions implicitly inherit from [**object**](https://docs.python.org/3/library/functions.html#object), which is Python’s *base type*.

You can also specify a more generic CLASS (also known as a *superclass*) to inherit from:

    class CLASS(SUPERCLASS):
        pass

In fact you’ll often want to inherit from more than one superclass in order to mix together their various traits. This is done by separating the superclasses with commas:

    class CLASS(SUPERCLASS_A, SUPERCLASS_B):
        pass

The notion of [multiple inheritance](https://docs.python.org/3.7/tutorial/classes.html#multiple-inheritance) can get quite complicated when more than one superclass defines the same attribute or method NAMEs, so for now let’s just keep our classes simple and assume no such overlap.

Just defining the CLASS and its superclasses without giving it some attributes and methods of its own is unusual, so you’ll *normally* see at minimum a custom *initializer* method, which by convention is done by defining the special *double underscore* (or “dunder”) *instance method* **\_\_init\_\_**:

    class CLASS:
        def __init__(self, NAME):
            self.NAME = NAME

As you can see an instance method is just another kind of function definition made using [`def`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#def) . In fact a METHOD is just a FUNCTION that’s been added to the CLASS’s namespace. That’s right, the [`class`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#class) keyword also creates a new kind of local namespace, this one remains attached to the CLASS and allows names to be looked up on either the *instance* or the class itself using the *dot access* patterns INSTANCE.NAME and CLASS.NAME. Notice the **self** parameter name in the method definition above? That’s the name given by convention to the *first* parameter of any instance method, and it’s how you access attributes set on the instance itself.

This all sounds a little abstract, so let’s demonstrate it by building a CLASS for thinking about circles.

    from math import tau

    class Circle:
        def __init__(self, radius):
            self.radius = radius

        def diameter(self):
            return self.radius * 2

        def circumference(self):
            return self.radius * tau

        def area(self):
            return tau * self.radius ** 2 / 2

Now if we create an instance representing the *unit circle*:

    unit = Circle(1)

We can access and [**print**](https://docs.python.org/3/library/functions.html#print) the **self.radius** attribute:

    print(unit.radius)

And we can also call any of its methods, but notice how we never have to pass the radius of the circle as an argument, since the methods can all access that via **self**:

    print(unit.diameter())  

    print(unit.circumference())
    print(unit.area())

Since they’re the fundamental building block of *everything* in Python’s [data model](https://docs.python.org/3/reference/datamodel.html), there’s a *lot* than can be said [about classes in Python](https://docs.python.org/3.7/tutorial/classes.html#classes), and there’s a lot of subtleties that can go into their proper use (and improper abuse), so we’ll come back to them often in later articles in this series. For now though the important thing is to start to recognize how [`class`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#class) is used to create them, and how instances are used when accessing their attributes and methods. It’s also helpful to know that there are quite a few “dunder” methods, and that these are used to implement a lot of the common “under-the-hood” functionality that supports all the [builtin functions](https://docs.python.org/3/library/functions.html) we’ll start to meet in later articles.

### One for Working Within a Context <span id="one-for-working-within-a-context"></span>

Sometimes there are actions you *always* want to perform within a specific context, such as committing a database transaction or closing a network connection. These sort of things *usually* involve some form of *exception handling* or other boilerplate specific to the task, and that can lead to a lot of boilerplate that needs to be repeated. An example is something as simple as reading a file: opening the file must necessarily mean getting some resources from the underlying operating system, and you always want to free up those resources, even if you accidentally tried to open a file that didn’t exist or which you did not have permissions to read. The file is a *type* of OBJECT that will always carry that contextual need to manage a resource with it, and so you’ll need to write the same [`try`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#try) and [`finally`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#finally) boilerplate *every* time you open a file.

Unless the language you’re working in provides a convenient means of ensuring that it happens for you.[with](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#with)[docs](https://docs.python.org/3/reference/compound_stmts.html#the-with-statement)Starts a [*context manager*](https://docs.python.org/3/reference/datamodel.html#context-managers) BLOCK, which ensures that the indented STATEMENT(s) below it are performed within the context of the OBJECT being managed.Can also be marked with [`async`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#async) , to start an [`async with`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#async) , see below.

A Middle English preposition that takes its pronunciation from one Old English term, ***wið*** (“against”), but takes its modern meaning from another, ***mid*** (“in association with”) which in turn comes from the German ***mit***. The meaning in Python derives from ***within***, meaning “inside the scope or context of \[some thing or event\]“.

Any use of [`with`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#with) requires an EXPRESSION that evaluates to an OBJECT that satisfies the [context manager type](https://docs.python.org/3/library/stdtypes.html#context-manager-types)’s interface, and thus has implemented both the **\_\_enter\_\_** and **\_\_exit\_\_** “dunder” methods. From now on we’ll call that EXPRESSION a CONTEXT\_MANAGER, to make the examples clearer.

In the most basic usage you simply start a new BLOCK:

    with CONTEXT_MANAGER:
        STATEMENT

Which will enter the context by calling `CONTEXT_MANAGER.__enter__()`, execute the STATEMENT within the context, and then exit the context by calling `CONTEXT_MANAGER.__exit__()`.

But most often you’ll want to use [`as`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#as) to assign the OBJECT returned by `CONTEXT_MANAGER.__enter__()` to an alias NAME so the BLOCK can work with it:

    with CONTEXT_MANAGER as NAME:
        STATEMENT

This can save you a lot of boilerplate, especially with the many standard OBJECTs that already implement the context manager interface. For instance the recommended way to read a file’s contents:

    with open(path) as src:
        contents = src.read()

Is *much* simpler than what you’d otherwise have to write:

    src = open(path)
    try:
        contents = src.read()
    finally:
        src.close()

Occasionally you’ll want to work within more than one CONTEXT\_MANAGER:

    with CONTEXT_MANAGER_A as NAME_A, CONTEXT_MANAGER_B as NAME_B:
        STATEMENT

Which works exactly the same as nesting one [`with`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#with) inside another:

    with CONTEXT_MANAGER_A as NAME_A:
        with CONTEXT_MANAGER_B as NAME_B:
            STATEMENT

You’ll get to meet quite a few context managers as you work your way through the Python standard library. And now you know that building your own is just a matter of creating a new [`class`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#class) and implementing a couple of “dunder” methods.

### And, Finally… Two for Working Asynchronously <span id="and-finally-two-for-working-asynchronously"></span>

Any function or method you write with [`def`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#def) alone is, by definition, *synchronous*, meaning that the moment you call it your running code has to stop everything else and *wait*, however long it takes, for your function to either [`return`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#return) or [`yield`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#yield) control back to it before the rest of your code can be executed. For most tasks that happen on a local machine this is sensible and perfectly fine, especially when you *need* the answer before you can proceed any further.

In much modern programming though it’s often necessary to interact with things that *don’t* respond quickly, like network interactions with servers that could be a world away, and sometimes there’s *plenty* of work you could be doing while you wait for them to respond. You still *need* the answer, but you need it *eventually*. One way this can be addressed is via [asynchronous programming](https://en.wikipedia.org/wiki/Asynchrony_%28computer_programming%29), which as of Python 3.5 has become a first-class part of the Python language.

Asynchronous programming is an advanced topic that is fairly specialized, so using it is well outside the scope of this series. It’s also quite a new addition to the language, and its usage has fluctuated from version to version. Rather than try to summarize those changed I’ll just describe the very basics of using these keywords in Python 3.7 below. If, however, you’re curious there’s a [quite good async primer available here](https://realpython.com/async-io-python/) that seems to be kept up to date.

Because asynchronous code does the same work as synchronous code, but *schedules* the execution of that work differently, only two new keywords needed to be added to the language.[async](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#async)[docs](https://docs.python.org/3/reference/compound_stmts.html#coroutine-function-definition)Used to mark another KEYWORD as one that works asynchronously. As such, [`async`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#async) *cannot* appear on its own.With [`def`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#def) as [`async def`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#async) to define an asynchronous function, also known as a COROUTINE.With [`for`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#for) as [`async for`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#async) to loop over an *asynchronous iterator* inside an [`async def`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#async) .With [`with`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#with) as [`async with`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#async) to use an *asynchronous context manager* inside an [`async def`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#async) , see below.

As you may have guessed, this is a contraction of the Modern English word ***asynchronous***, which is formed by combining the Latin roots ***a-*** (“not”) and ***syn-*** (“together”) with ***Khronus***, the Ancient Greek personification of *time*. It unambiguously means “not occurring at the same time”. In Python it more specifically marks an operation as “not occurring in the same time as the caller”, which allows the caller to wait for the result of that operation, which will occur at *some* point in the future.

Because the meaning of [`async`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#async) is tied to the KEYWORD it marks, its usage is always the same:

    async KEYWORD

However, unlike other any other keyword we’ve seen, the usage of [`async`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#async) will *always* begin with the definition of a new COROUTINE:

    async def COROUTINE():
        STATEMENT

Both of the other forms of [`async`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#async) exist to allow you to work *within* a COROUTINE with *other* COROUTINEs, and thus they can only exist *inside* an [`async def`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#async) .

For instance you can use [`async for`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#async) to loop over an [asynchronous iterator](https://docs.python.org/3/reference/datamodel.html#asynchronous-iterators) such as a GENERATOR COROUTINE (which is simply a COROUTINE that uses [`yield`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#yield) instead of [`return`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#return) ).

    async def COROUTINE():
        async for item in GENERATOR_COROUTINE:
            STATEMENT

You can also use [`async with`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#async) to perform work within the context of an [asynchronous context manager](https://docs.python.org/3/reference/datamodel.html#asynchronous-context-managers):

    async def COROUTINE():
        async with CONTEXT_MANAGER_COROUTINE as NAME:
            STATEMENT

Virtually every COROUTINE will need to wait on other COROUTINE(s), which is why there’s another keyword that can only be used within an [`async def`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#async) .[await](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#await)[docs](https://docs.python.org/3/reference/expressions.html#await-expression)Used to suspend the execution of the COROUTINE it is found *within* and waits for the COROUTINE to its right to complete; can only be used inside an [`async def`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#async) .

From the Middle English verb ***awaiten*** (“to wait for”) from the Old French ***awaitier***/***agaitier*** (“to lie in wait for, watch, or observe”). The general sense is more active and hostile than ***wait***, which it’s a modification of. In asynchronous programming it means to “\[suspend execution\] and wait \[for something to finish\]“.

The [`await`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#await) keyword is always going to be used to call a COROUTINE inside an [`async def`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#async) :

    async def OUTER_COROUTINE():
        await COROUTINE()

Which will pause the execution of the outer COROUTINE and wait until the called COROUTINE, eventually, returns control. Any VALUE returned by the called COROUTINE is passed through [`await`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#await) , so you can think of `await COROUTINE()` as an asynchronous EXPRESSION that will, *eventually* evaluate to whatever the COROUTINE returns when called.

Of course now that you’ve got the basics of doing asynchronous work down, how do you actually *perform* such work? Well, as of Python 3.7 that still requires using functionality provided by the [asyncio](https://docs.python.org/3/library/asyncio.html) module, the details of which are *well* outside the scope of these articles. See the [async primer](https://realpython.com/async-io-python/) I mentioned earlier for details.

Whew… <span id="whew"></span>
-----------------------------

There you have them, Python’s 35 keywords: in and of themselves not enough to make you fluent in Python, but if you’ve read this far and digested it you’re well on your way to truly *understanding* (and not merely *using*) the skeleton of *what is going on* in one of the fastest growing general programming languages around. In the next post in this series we’ll take a step away from *words* and look instead at *symbols*, with a dive into Python’s slightly smaller, but thankfully *much* simpler, list of *operators*.

1.  Technically **def** is a [final clipping](https://en.wikipedia.org/wiki/Clipping_%28morphology%29%29) or [apocope](https://en.wikipedia.org/wiki/Apocope), a specific kind of contraction. English is hard enough already, so I’ll use the more general term. [↑](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#fnref:1)
2.  There are 35 keywords as of Python 3.7, the current major version of the language as of the time of writing. New Python keywords are added quite rarely, and it’s even more rare for keywords to be removed, but in whatever version you’re on you can use `from keyword import kwlist; print(kwlist)` to view the current list. [↑](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#fnref:2)
3.  Putting [`def`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#def) on a single line makes the equivalence with [`lambda`](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#lambda) more obvious, but for the sake of readability don’t do this very often. [↑](https://yawpitchroll.com/posts/the-35-words-you-need-to-python/#fnref:3)

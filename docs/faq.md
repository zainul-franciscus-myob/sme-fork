# Frequently asked questions

## What is this?
This is a list of common questions around `SME-Web` and `SME-Web-BFF`. This covers the implicit and explicit agreements that developers have when working with the SME Platform.
It is _highly important_ that we abide by these agreements in good faith. These patterns and practices have been designed to enable consistent and fast development in the Web.
&nbsp;

&nbsp;

## Why is everything duplicated?
We aim to be DRY (Don't Repeat Yourself) within a module, but WET (Write Every Time) across them. When a module imports components directly from another module this creates coupling between the two.
If changes are made to the component that has been shared both module's behaviours would need to be tested and verified. However, it is not obvious that a component is shared so the reliant modules won't be tested and bugs will be introduced in the pages that was not worked on.
Furthermore, we have found that while the UI experience may initially be the same for the two modules, over time the trend is that they will deviate which results in accidental complexity if the two shares components directly.
In short, we favour the cost of duplication over the cost of wrong abstraction, so don't directly import components from another module.
&nbsp;

&nbsp;

## Does this mean it's slow to develop in the Web if we have to rewrite everything?
No, the Web is designed to be very thin so there isn't much code behind each page.
All parts that make up the module is well understood and a majority of the components is from [Feelix](https://feelix.myob.com).
It is also possible to copy code from other modules as long as what is being copied is well understood and it is a deliberate action.
&nbsp;

&nbsp;

## What is our testing strategy?
In a reactive model, there are two types of tests:

1. For any given Props/State in, what is rendered out
2. How the actions and the reducers augment the State

These are two separate concerns, two types of tests, so please don't cross the streams.
For more details please see the [testing documentation](development/testing.md).
&nbsp;

&nbsp;

## Why do I have to follow the existing conventions?
To ensure consistency, maintainability and quality it is essential that everyone follows by these conventions.
&nbsp;

&nbsp;

## I still don’t understand or I disagree. Who should I talk to?
There are multiple channels to ask questions, raise concerns or suggestions:
- [`sme-web`](https://myob.slack.com/archives/CRPH00D3K) Slack channel
- SME.js which is a forum for everyone to chat about Web development
- Speak with your SWAG (SME Web Architecture Group) representative

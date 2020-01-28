# LeanEngage

LeanEngage is a surveying tool used in order to measure net promoter scores (NPS) and customer satisfaction scores (CSAT).

## Integration with SME WEB

The LeanEngage library is [initialised](/src/leanEngage/initializeLeanEngage.js) with a specific LeanEngage application Id assigned by the [LeanEngage platform](https://www.leanengage.com/).

We send over data such as the user's `userId` to the platform in order to identify users. These fields can be contributed to further in the future as needed.

## Surverys

There are 2 kinds of surveys:

### 1. Automatically appearing

These are configured to appear using the LeanEngage website and require no code change to trigger them.

### 2. Appear when user clicks on a link

Feelix provides a `LeanEngageSurvey` [component](https://feelix.myob.com/#/Components/Messaging/Lean%20engage%20survey) which can be used to trigger the survey.
The survey will be designed by product teams, however they will need to supply the following:

1. A survey id.
2. Survey type: `survey` or `feedback`

Example usage:

```
  <LeanEngageSurvey
    surveyName="survey-id"
    surveyType="survey|feedback"
    productName="This is used in the text displayed to the user"
  />
```


Note: all surveys are designed and themed on the LeanEngage website and require no code other than the above.

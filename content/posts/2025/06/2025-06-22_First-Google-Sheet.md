---
title: First Google Sheet
author: ["Keepin'"]
date: "2025-06-22"
description: "Setting up your first Google Sheet"
tags: ["Google Sheet", "Tracking"]
ShowToc: true
---
# Steps

## Tracking weight

1. Create a new Spreadsheet in your Google Drive
2. Name it Health
3. Name first tab "Weight"
4. Add a table and name "Weight" as well
5. Name the columns and set their types
    - Date: DateTime
    - Weight: Number
    - Variation: Percent
        - Set the first row value as the following formula:
        ```bash
        =IFERROR((B3 - INDEX(B:B, MATCH(MAX(FILTER(A:A, A:A < A3)), A:A, 0))) / B3, "")
        ````

## Tracking exercises

1. Create a new tab and name it "Exercise"
    - Add a table named "Exercise" as well
2. Create a new tab and name it "ExerciseEntry"
    - Add a table name "ExerciseEntry" as well
* The Exercise tab will contain the exercise we want to track, such as walking, running, push-ups and any other ones.
* The ExerciseEntry tab will be used to record every time we practice one exercise.
3. In the ExerciseEntry tab, set the following columns
    - Date: DateTime
    - Exercise: Dropdown (With a range) -> Select A2:A from the tab Exercise, which will be all exercises options
    - Quantity: Number
        - For now my exercises will be mostly quantity types, such as a number of Push-Ups, but I will probably eventually track some exercises in terms of duration. Then I will add a new column
4. In the Exercise tab, set the following columns
    - Exercise: Text
    - Notes: Text

[View template here](https://docs.google.com/spreadsheets/d/18xgeXS8voYKZwhM_dQPf3GR2VPs7V1mFSue0H_VPzX0/edit?usp=sharing)
* To make a copy
    1. File
    2. Make a copy
    3. It will now be available to edit in your Google Drive
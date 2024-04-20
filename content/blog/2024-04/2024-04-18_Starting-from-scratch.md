---
title: Starting from scratch
image: '/images/francislah.png'
---

Here we are, starting a business from scratch. Every decision might have big positive or negative impacts down the road.

So let's try to do everything right by starting with the two big basis to structure things right. Data and Security.

Today, we will mostly talk about Data, since I believe it is the foundation of every technology business, and even if not all businesses.

## What tools will use?
I decided to start by implementing an Appsheet solution since it's free plan is very versatile, and enable to create great solutions available on all platforms without hassle.

So let's create an account and a new app on their website: [Appsheet](https://about.appsheet.com/how-to-create-an-app/)

It is Google owned, so it integrates verywell within their products.

We are going to start with a blank app and go against the monster of business solutions: Create an accounting app.

## Where do we store our data?
The tool we just selected enable us to modify our data sources easily without breaking the whole solution. Knowing this, we will start by using Google Sheets since we know we might do a lot of changes and need to be able to do them easily.

Let's create a Google Sheets called Accounting into our business account and add a first table for transactions with the following columns: Date - Amount

## Connecting the data to the solution
In appsheet, under the Data side menu, we can add new data from the Google Sheet file we created. Once it is done, we can edit the data table settings, such as the type for amount to be a Price type for example.

Then we need to interact with the data. In the Views side menu, we can create a new view connected to the table Transactions we just added.

There we go. We now have an app that can add, edit and view data on all platforms, production ready.

## Starting the accounting
Let's start with the first purchase of Keepin'Tracks which is the domain name for a total of 10.26$.

I don't like how the date is displayed, so first I'll change it to a long format:
1. On the left of the column name in the data navigation
2. On the pencil to edit
3. Select Use long date formats in the Type Details section

When trying to enter another test data, we are shown an error that the date is already used as a key. Here we need to set a new unique key for this table since we absolutely can have more than one transaction per day. Using the row number is a bad practice since someone can play with the file and break things.

We will implement an id generator in appsheet with the function UNIQUEID() to create the id for each transaction. To do it so, we first need to add a column ID in the file.

After adding the column, if we try to use the app, we will get an error since it won't be able to understand how to interpret the data since the model are not the same in the file and in the app.

We need to regenerate the table schema by clicking on that button in the data view of the table.

Since the function returns Text, we need to change the type of the column to Text. Then we set the inital value to something unique and set it as the only key in the table.
Here the unique value can be generated like:
```sql
CONCATENATE([Date], '-',
    COUNT(
        FILTER(
            "Transactions",
            [Date]=[_THISROW].[Date])
        ) +1)
```
We can then uncheck the SHOW? box of the Id column to hide it. Just know that this way of generating the Id will cause issue if 2 user try to create a transaction at the same time since the key will already exist when the 2nd one will try to save. We could then add UNIQUEID() at the of the function to add more uniqueness.

That is all for today. Next stop we will implement the data visualization base project.


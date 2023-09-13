# Decision Tree Generator

A responsive web app for visually create decision trees using the C4.5 algorithm.

## How to use it

1. Create or upload a dataset (.csv file)
2. Remove the non-significant columns (e.g., "id" column)
3. Indicate whether the column is quantitative or qualitative
4. Select the column to predict
5. Hit the generate button!

## Examples

In the dataset folder you can find some CSV files to try the app.

This is the result after using the iris dataset:

<img alt="Logo" align="center" src="https://i.ibb.co/Fb7ZHGY/Captura-de-pantalla-2023-09-13-11-56-18.png" width="20%" />

## Used algorithm

C4.5 builds decision trees from a set of training data in the same way as ID3, using the concept of information entropy. [(See more)](https://en.wikipedia.org/wiki/C4.5_algorithm)

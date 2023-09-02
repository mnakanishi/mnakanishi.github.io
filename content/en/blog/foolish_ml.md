---
author: "Masaki Nakanishi"
title: "How to fool reviewers with machine learning"
date: 2023-08-04
description: "Guideline to conduct rigorous studies with machine learning"
tags: ["Machine learning", "Data leakage"]
thumbnail: https://cdn.pixabay.com/photo/2020/04/11/18/05/red-matrix-5031496_1280.jpg
draft: false
---


<!--more-->


Don’t get me wrong. 
I don't mean to suggest you do so. 
I have reviewed 100+ manuscripts submitted to scientific journals and conferences in the fields of biomedical signal processing and machine learning (ML) in the past years. 
What I realized in this experience is how easy it is to, hopefully unintentionally, achieve unfairly good results using ML. 

The most common mistake is data leakage, where information from test data is used to train ML models. 
It might sound like a mistake that only beginners make.
However, it happens more often than you may think. 
In fact, many studies in which data leakage occurred have been submitted, which means the senior authors gave go sign.
Even worse, such studies sometimes pass peer-review!! 

Here I introduce some of such examples without revealing the details of the studies. 
I hope it will help you avoid the same mistake when you conduct a study using ML.

## How data Leackage occurs

#### Using the exact identical data in training and test sets

ML is for prediction, not for modeling.
ML models, therefore, should be evaluated using different data from those used for its training. 


#### Non-causal preprocessing

The way you apply proprocessing to your data could cause leakage.


#### Overlapping sliding window plus random subsampling 

Sometimes I run into very creative ways to cause data leakage. 
Combining an overlapping sliding window and a random subsampling on time-series data is one of them. 

Let’s assume using a sliding window that overlaps 50 %, which means the second half of the prior window and first half of the second window are exactly the same. 
What if these two consecutive windows are separately allotted into training and test sets as the result of a random subsampling? 
Obviously, both sets would end up having the same information. 
Leakage!

The worst case I’ve ever seen was using 90 % overlapping sliding windows and then shuffling the windowed data. 
With this approach, I am sure that virtually every single time points were allotted into both training and test sets. 

#### Parameter optimization using test data



## How to avoid data leackage


#### Split data before applying any preprocessing


#### Use unified pipeline


#### Evaluate models with online applications


#### Evaluate models with simulated online scenarios


## Bottom line


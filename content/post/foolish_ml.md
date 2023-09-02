---
author: "Masaki Nakanishi"
title: "How to fool reviewers with machine learning"
date: 2023-08-04
description: "And how to avoid misconduct"
tags: ["Machine learning", "Data leakage"]
thumbnail: https://cdn.pixabay.com/photo/2017/10/29/14/43/arrows-2899885_1280.jpg
---


<!--more-->


I have reviewed more than 100 manuscripts related to electrophysiological signal processing and machine learning (ML) in the past years [[Publons](https://www.webofscience.com/wos/author/record/1479116?state=%7B%7D)]. What I realized in this experience is how easy it is to, hopefully unintentionally, achieve unfairly good results using ML. The most common mistake is data leakage, where information from test data is used to train ML models. It might sound like a mistake that only beginners make, but it happens more often than you might think. In fact, many studies in which data leakage occurred have been submitted (and some of them were accepted!) even though the senior authors have (or should have) reviewed them before submission. Here I introduce some of such examples without revealing the details of the studies. I hope it will help you avoid the same mistake when you conduct a study using ML.

### How data Leackage occurs

#### Using the exact identical data in training and test sets



#### Non-causal preprocessing


#### Parameter optimization using test data


#### Sliding window with overlapping plus shuffling

## How to avoid data leackage

#### Split data before applying any preprocessing

#### Use functions

#### Evaluate models with online applications

## Bottom line


---
author: "Masaki Nakanishi"
title: "Tips for Building Practical ML Models for BCI"
date: 2024-10-14
description: "Guideline to conduct rigorous studies with machine learning"
tags: ["Machine learning", "Data leakage", "Brain-Computer Interface", "EEG", "Filtering"]
thumbnail: /fool_ml/FreeSpelling300ms.gif
draft: false
---


<!--more-->


Over the past several years, I have reviewed over 100 manuscripts submitted to scientific journals and conferences on neural engineering and brain-computer interface (BCI). 
Most of these used machine learning (ML) to classify electrophysiological data, including electroencephalogram (EEG). 
This experience has made me realize how easy it is to achieve unjustifiably excellent results using ML, whether intentionally or unintentionally.

One of the most common mistakes is data leakage, where information from test data is used to train ML models. 
This might sound like a mistake only beginners make, but it happens more often than you might think. 
Another common mistake stems from a failure to envision an actual application. 
Such studies tend to process data or evaluate models using more resources than are available in real-world situations.

This article will present some examples of inappropriate use of ML in the context of BCIs that I have encountered. 
These mistakes should be obvious to experienced researchers and engineers but are easy to fall into if one is not careful. 
I don’t intend to provide a comprehensive guideline, but I hope it will help you avoid making similar mistakes when conducting your BCI research using ML.

<!--
In fact, many studies in which data leakage occurred have been submitted, which means the senior authors gave go sign.
Even worse, such studies sometimes pass peer-review.
-->

## Common Mistakes Leading to Unfair ML Results

### Allocate the Same Data into Training and Test Sets

This is the most basic mistake when testing the generalizability of an ML model. 
This type of data leakage is rarely seen since everyone knows it must be avoided. 
It can still occur due to programming errors.

I once saw this leakage in a journal paper that compared the performance of a proposed classification algorithm with an existing state-of-the-art method. 
The paper claimed that the proposed method achieved nearly perfect classification accuracy and dramatically outperformed the comparative one. 
However, the authors later published a commentary explaining that this performance improvement was due to data leakage occurring only in the code evaluating the proposed method.

Different programming scripts were likely used to evaluate these algorithms (Fig.1A), and the one for the proposed method accidentally used the same data for training and testing. 
With the increasing availability of programs of existing algorithms and the growing complexity of ML architectures, it is understandable that some researchers use completely different scripts to test each algorithm to save time implementing them from scratch.

![Scripting](/fool_ml/scripting.png)
*<small>Fig.1 Diagrams of how the evaluation scripts are prepared. (A) Preparing separate scripts for evaluating different algorithms/models. (B) Preparing a script for evaluating all algorithms/models. The former approach could cause more human errors than the latter one.</small>*

I usually prepare code that can evaluate all comparative algorithms in one script (Fig.1B) rather than preparing different scripts for each algorithm (Fig.1A). 
This approach minimizes the possibility of human errors, such as setting parameters differently or inputting different data across scripts. 
It is also crucial to repeatedly check that the code is implemented correctly, especially when desired results are obtained. 
People make mistakes, so don’t be overconfident.

<!--

In general, this can be properly done by Sklearn's `train_test_split` fucntion if you use Python. 
Sometimes you might need to generate a random sequence 

You do not usually see this type of leakage in submitted manuscripts and published articles because we all know this must be avoided. 
--> 


<!--
ML is for prediction, not for modeling.
ML models, therefore, should be evaluated using different data from those used for its training. 
-->



### Shuffle Overlapping Sliding Windowed Data

Sometimes I encounter very creative ways to cause data leakage. 
Shuffling overlapping sliding windows of time-series data is one of them. 
While shuffling can introduce randomness in splitting training and test sets, and the sliding window technique is commonly used to extract time-varying features from time-series data like EEG, combining these can cause problems.

Let’s assume using sliding windows that overlap by 50% (Fig.2). 
Two consecutive windows share the same data: the second half of a previous window is the same as the first half of the next window. 
If these two windows are separately allotted into training and test sets, both sets end up having the same information.

![Shuffling](/fool_ml/shuffle_windows.png)
*<small>Fig.2 Segmenting continuous data into epochs using sliding windows with (A) 0% and (B) 50% overlap. With 50% overlap, the second half of the n-1 th window and the first half of the th window (highlighted in pink) share the same data. If they are allocated to training and test sets separately by shuffling, both sets end up having the same information. Similar things also happen to the data chunks highlighted in light green.</small>*

The worst case I have seen was using 90% overlapping sliding windows and then randomly splitting the windowed data into training and test sets. 
This approach would have resulted in both sets having nearly all time points multiple times, leading to very high classification accuracy close to the training accuracy.

I understand the temptation to tweak validation pipelines to achieve better classification performance, but such inventions could be dangerous. 
Your validation pipeline should be designed based on what is appropriate, not performance. 
A general rule of thumb is to avoid random assignment of overlapping sliding windowed time-series data at any cost.

### Apply a Filter Before Segmenting Data

Preprocessing can cause unintentional data leakage. 
When you apply a filter to your data, how do you design it? 
Today, many useful libraries and tools are available for designing filters, allowing you to implement filters by setting cutoff frequencies without knowing other details. 
But have you ever checked the number of taps (the length, or the order), the impulse response function (IRF), and the frequency response of the filter you implemented?

Filtering is done by convoluting an IRF into input data, meaning the filtered value at a time point is computed using values at surrounding time points. 
If you design a filter with an ideal frequency response, it could require an infinite length of IRF. 
Applying this filter to your data before segmenting it into an ML-friendly form (e.g., sliding windowed data and epochs), you know what will happen (Fig.3A).

![Filtering](/fool_ml/filtering.png)
*<small>Fig.3 Difference between applying (A) a non-causal filter to continuous data and (B) a causal filter to epoched data. Applying a filter to continuous data could lead to unintentional data leakage due to the use of more past and future data points than what is realistically available. A filter should be applied after epoching data.</small>*

For example, the MNE-Python package provides a user-friendly function for filtering EEG/MEG data. 
If you do not specify any parameters other than cutoff frequencies, the library creates a non-causal finite impulse response (FIR) filter designed by the windowing method. 
It may require a filter length equivalent to tens of seconds or longer. 
Moreover, a non-causal filter requires future data. 
While this may be fine for scientific analyses, it may be infeasible depending on the real-time performance required by your target application.


### Normalize Test Features as a Batch

Data normalization is generally recommended to ensure each feature has a similar scale, leading to better performance and faster convergence.

You know you shouldn’t normalize features before splitting them into training and test sets. 
Additional care should be taken when normalizing test data, even if this step is followed. 
Test data shouldn’t be normalized as a batch. 
In a real situation, an ML model takes one data unit as input and outputs one prediction at a time. 
There is no test “set” so there is not enough data to compute the statistics (i.e., mean and standard deviation) for normalization unless you keep the past data.

Assuming data is stationary, test data can be normalized using the statistics of a training set.


## General Guideline for Evaluating Models


### Picture Your Target Application

You are building an ML model to predict something in the real world. 
So you know what your target application looks like. 
That includes how much real-time performance is required, how much data is available at a given time, etc. 
With a solid picture, it becomes clear what preprocessing can be applied and how your model should be evaluated.

The design of applications is up to you as long as it makes sense. 
For example, because EEG varies widely from person to person, it is not uncommon to employ user-specific models rather than a universal model. 
In such cases, performance evaluation should be done within each subject using the hold-out method. 
If you aim to build a universal model, it makes sense to have separate training and test subjects to estimate the model performance on unseen users. 
What must be avoided is mixing up data from all subjects and then applying cross-validation.

Once you split data, do not touch the test set. 
The entire validation pipeline, including preprocessing and hyperparameter tuning, should be done using the training set. 
If you have multiple models in mind and want to compare their performance, use the training set to select the best model. 
The test set should be used only to validate the generalizability of your model. 
After all, you want to know how well your model will perform on data you haven’t seen yet.

### Implement an Online Application

You might have heard that the best way to test the reproducibility of a study is to replicate it. 
The same is true for ML. 
However, this doesn't mean downloading code and data from a GitHub repository and running it on your computer. 
While publishing your code and data is good practice, reproducibility can only be verified by applying it to newly recorded data.

The most convincing way to show model generalizability is to demonstrate its online application. 
No one would doubt the validity of the model if they experience an online application that operates well. 
An online demonstration can prove that the model works properly on data not included in the training set. 
In fact, top-tier journals on BCIs have begun requiring results from online experiments.

When we submitted a manuscript about our high-speed BCI speller, I initially drafted it based on the results from offline analysis. 
However, we decided to add online experiments to further strengthen the study. 
The online results showed comparable performance to the offline analysis, proving the validity of our proposed algorithm. 
As a result, the manuscript was accepted and published in IEEE Transactions on Biomedical Engineering. 
The top image of this page is a demo video about our online BCI speller. 
Isn’t it more convincing than just figures and tables in a paper?


## Summary

This article presented common mistakes leading to unreasonably favorable results and its solutions. 
These mistakes may be inconceivable for experienced researchers, but they are all what I actually found while reading or reviewing papers. 
Your goal should be to create a real-world application using ML, not just to add a line to your publication list (although that is important). 
If you keep this in mind, you will never make such mistakes and accidentally fool reviewers, readers, and yourself.
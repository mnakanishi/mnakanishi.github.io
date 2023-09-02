---
author: "Masaki Nakanishi"
title: "My diet challenge in 2023"
date: 2023-08-29T22:41:30-07:00
description: "The track record of my diet challenge in 2023"
tags: ["Health", "Data visualization", "Matplotlib", "Pandas"]
thumbnail: https://cdn.pixabay.com/photo/2010/12/13/10/08/belly-2354_1280.jpg
draft: false
---

<!--more-->

My weight reached the highest in my life in July 2023. 
My height is 5' 8.5". 
I weighed 167 lb.
My BMI was 25, just barely classified as 'overweight'. 

I was shocked because I had been, or I thought I had been, pretty careful about my diet and exercising regularly. 
So I decided to review and improve my eating and exercising habits. 

This article is the track record of my diet challenge. 

## The goal of this challenge

My top priority is my health. 
But I have also been thinking that I want to have a sharp jaw, tight abs, and nice biceps for once in my life.

Now is the time to make that happen.

I set my tentative goal at **12% body fat**, where muscule usually begins to be revealed.
The corresponding body weight, BMI, and muscle mass would be about 154 lb, 23, and 130 lb, respectively.

Unfortunately, I found out the body composition scale I have was not really reliable (see below).
Therefore, I will evaluate the progress based on my body weight until I get a new scale. 

<!--This challenge should ultimately be evaluated by how I look.
Evaluating by weight alone can lead to an attempt to lose weight in a radical way such as fastingm which can lead to unhealthy results.

I planned to burn my body fat by heathy diet and building muscle. 
However, I need some objective indices by which I can know the progress.

Therefore, body weight and BMI is not appropriate as a key performance indecator. -->


## My diet strategy 

Since I wanted to reduce my body fat in a healthy and sustainable way, I did not take any drastic approaches such as fasting and low-carb diet. 

I watched YouTube videos and read net articles related to diet, and made my plan as follows: 
<!-- After reading quite a few blogs and watching YouTube videos talking about diet, I came to the conclusion that calculating and maintaining the good balance between calorie intake and consumption is the most effective approach. -->

- Calculate daily caloric intake and comsumption, and to ensure that intake does not exceed consumption.
My estimated BMR[^1] was approximately 1700 kcal, leading to the TDEE[^2] of 2350 kcal. I tried to keep daily caloric intake below 2000 kcal.
- Have a balanced diet of protein, fat, and carbs. 
I try to consume at least 120 grams of protein and no more than 45 grams of fat everyday, and intook the rest of calories from carbs.
- Have at least 2 liter of water a day. In addition, I usually have 1 tbs of apple vineger and 1 - 2 cup(s) of coffee everyday. 
- Attend 1 h-long class at the Orangetheory Fitness, in which I do HIIT[^3] style exercise, twice a week. In addition, I walk about 20 mins every morning.

[^1]: BMR: Basal Metabolism Rate
[^2]: TDEE: Total Daily Energy Expenditure
[^3]: HIIT: High Intensity Interval Training

## Results after six weeks

I started this diet challenge on July 12th 2023 and the following figure shows the changes in my body composition since then til now (Aug 29th 2023). 


![Body Composition Measured](/body_composition_changes.png)
***Fig. 1** Daily and weekly changes of my weight [lb], BMI, body fat [%], and muscle mass [lb]. The background colors indicate which diet approach I took on each day: (blue) PFC Controlled diet; (gray) PFC uncontrolled diet; (red) travel; (green) eat out. The figure was created using the Matplotlib package in Python.*


Fig.1 shows that all the body composition measures have been gradually descreasing.
My body weight, body fat, BMI and muscle mass have descreased 4.5 lb, 0.9 %, 0.6, and 1.7 lb, respectively, in the past six months. 
 
The results validated that my diet approach is somewhat effective. 

Interstingly, all the body composition measures are highly correlated (Peason's correlation: 0.93+), which seems unreasonable to me. 
For example, I ate out and had alcohol several times during this period, and it is reasonable my weight significantly increased the next day. 
However, can body fat and muscle mass increase that sudden? 

I suspect the scale I have might not be reliable except for the body weight. 
Unitl buying a better one, I will evaluate this challenge by my weight. 

## Future projection

Assuming I can maintain this diet and my metabolism, I can lose my body weight and fat constantly. 

Based on the current weight change, I forecasted my weight change over the next several months using the ARIMA[^4] model.
The model orders were set to 30 for AR, 1 for I, and 0 for MA, respectively.

[^4]: ARIMA: AutoregRessive Integrated Moving Average

The model was trained using Python with the StatsModels package.

![Weight Prediction](/weight_prediction.png)
***Fig. 2** The prediction of my weight change based on ARIMA model. The blue and red lines indicate the observed and predicted weight, respectively.*

Fig.2 suggests that I can achieve my target weight by Jan. 2024, although, in reality, it would be difficult to keep this pace because BMR decreases as weight is lost.

Nevertheless, this forecasting result motivates me to maintain the eating and exercising habits in the future. 

## Conclusion

My challenge seems to be going well so far. 

What's important in diet is to aim to achieve your goal in the long run, not be happy or sad with daily changes.
However, many lose motivation and quit along the way because it is difficult to see the progress. 

I found that using objective measures and predicting future changes can be a powerful motivator. 

I will update this article occasionally once I accumulate more data. 



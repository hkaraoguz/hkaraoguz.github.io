---
layout: post
title: Checklist for Object Detection Datasets
tags: [object-detection,computer-vision]
comments: true
thumbnail-img: /assets/img/object_detection.jpg
share-img: /assets/img/object_detection.jpg
show-avatar: false
---

I recently watched a [video](https://youtu.be/40GqhTrMcNA) of [Satya Mallick](https://www.linkedin.com/in/satyamallick/) in which he talks about common problems and mistakes of object detection datasets and how to tackle them. In the video, he particularly focused on object detection task but I think many of his remarks are applicable to other computer vision tasks such as semantic segmentation, classification, etc. 

One important emphasis of Satya is that, we should spend considerable amount of time on the data itself before diving deep into model training. Otherwise, the models will be GIGO (Garbage in Garbage out). I completely agree with this statement, since the same thing happened in one of my recent projects where the model was performing really bad and when I looked at the labeled data I immediately found out lots of inconsistencies and mislabelings which naturally affected model performance. Therefore, my first priority in a ML project is to ensure data quality before doing anything else. I listed below some of the important remarks that he made in the video.

### Checklist for Object Detection Datasets
* If the dataset has less than 10.000 images, the dataset should be downloaded locally and the images should be visually skimmed for understanding how the dataset and individual classes look like.
* If there are any images that have watermarks on it, those should be removed due to copyright issues.
* We should check the variety of the images. For example, if the dataset is created from the frames of a continuous video sequence, the variety of the data will most likely be low. Therefore, a model trained on this kind of data will not generalize well. 
* Following on the previous point, if the dataset is composed of frames of a continuous video sequence, the probability of data leakage between training and validation set will be high (due to consecutive frames with minimal scene changes). We should avoid this if we want our model to generalize well on unseen data. 
* Depending on the problem that we are solving, the dataset size should be proportional. For example, if we are trying to detect a manufactured part in a controlled inspection environment, we might get a good performance with few hundreds of samples, however if we are to detect trucks in wild, then we need to collect significant amount of representative data.
* We should look at the distribution of the classes to identify any class imbalance. This will allow us to develop strategies to counteract highly imbalanced data before jumping into model training.
* Not only we should check the images but also the annotations so that we can capture any inconsistencies, false labels or mislabelings. 
    

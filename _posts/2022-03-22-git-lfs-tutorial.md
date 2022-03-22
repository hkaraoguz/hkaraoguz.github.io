---
layout: post
title: Git Large File Storage (LFS) Tutorial
tags: [git-lfs, lfs, large file storage]
comments: true
---

In this post, I would like to give a brief introduction to Git Large File Storage (LFS). Git LFS can be very handy for keeping track of large files and/or datasets for your Machine Learning tasks.

### Setting up Git LFS 

Let's assume that you have the following data structure and you want to store this data on Git LFS.

```
📦Data
 ┣ 📂csv
 ┃ ┗ 📜example.csv
 ┣ 📂dog
 ┃ ┗ 📜dog.png
 ┗ 📂fox
 ┃ ┗ 📜fox.jpg
```
The first step for using Git LFS is to install the client to the local computer. The installation instructions can be found in this [page](https://github.com/git-lfs/git-lfs/wiki/Installation).

After installing the client, a remote repository should be created and Git LFS support should be enabled from the `Settings` page. Github has free LFS support for a maximum file size of 1GB and monthly 1GB bandwidth. Details can be found [here](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-storage-and-bandwidth-usage).

### Adding data to LFS and pushing it to remote repository

We can now clone the newly created repository to our local environment using 
```
git clone <repository_address>
```
We can move the `Data` folder under the empty repository folder. In order to enable LFS to track the `Data` folder and all its subfolders, run the following command in the root repository directory:
```
git lfs track "Data/**"
```
When the command is successfuly executed, a `.gitattributes` file should be automatically created in the root repository folder. If you view this file, you should see the following entry:
```
Data/** filter=lfs diff=lfs merge=lfs -text
```
This entry shows that LFS is set to track the whole `Data` folder. Now it is time to commit/push these changes:
```
git add .gitattributes Data/
git commit -m"Initial commit"
git push origin <branch_name>
```
These commands are the same as an ordinary Git commit/push. However, in a regular Git push, the original files are directly uploaded to the repository whereas in Git LFS, the tracked files are replaced with pointers while the actual files are stored elsewhere. A pointer file looks like this:
```
version https://git-lfs.github.com/spec/v1
oid sha256:4cac19622fc3ada9c0fdeadb33f88f367b541f38b89102a3f1261ac81fd5bcb5
size 84977953
```
### Listing the files tracked by Git LFS
The following command lists the files that are currently tracked by LFS:
```
git lfs ls-files
```
### Adding new files
In order to add new files to LFS, you should either place the files in a directory that is tracked by LFS or enable file tracking using `git lfs track ...` command. For this tutorial, let's assume that we added a directory named `cat` under `Data` folder. We can run the following command to add `cat` folder to LFS.
```
git add Data/
git commit -m"added cat folder to LFS"
git push origin <branch_name>
```

### Removing files
In order to remove a file from LFS (in this case `example.csv`), we can use the following commands:
```
git rm Data/csv/example.csv
git commit -m"removed example.csv file from LFS"
git push origin <branch_name>
```

### Pulling the whole data into a new location
Pulling the whole data into a new location is as simple as cloning the repository
```
git clone <repository_url>
```
### Excluding specific files at clone time
Here comes a handy feature of LFS that can be useful for avoiding large downloads if you only want to access to the specific part of the data. 

Let's assume, you only want to download `.csv` files and ignore the rest. You can do that so by using the following command:
```
git -c "lfs.fetchinclude=*.csv" clone <repository_url>
```
When the repository is cloned, you will observe that only the pointers of the image files are downloaded while the `example.csv` file under `csv` folder is downloaded fully.
If you want to download the remaining files later, you can run the command:
```
git lfs pull
```


### Excluding specific files both at clone time and onwards
There can be cases that you will never use some of the files that are tracked by LFS and you want to avoid downloading them at all times. 

In order to achieve this, you should first skip those files at clone time.
```
git -c "lfs.fetchexclude=*.jpg,*.png" clone <repository_url>
```
After the repository is cloned, you should navigate to the root of the repository and add a permanent rule in the local git config for skipping those files at all times.
```
git config lfs.fetchexclude "*.jpg,*.png"
```
This rule will ensure that lfs will not pull any files with extension `.jpg` and `.png`.
If you want to double check that the rule is added, you can view the git config:
```
git config -l
```

There are many other features of LFS such as locking files or enabling LFS support for existing repositories etc. but those are beyond the scope of this tutorial. 

I hope this tutorial will help you to understand basics of LFS usage and help you to start using it for your needs.
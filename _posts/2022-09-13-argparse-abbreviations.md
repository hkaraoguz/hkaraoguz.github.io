---
layout: post
title: Should argparse allow abbreviations?
tags: [python,argparse]
comments: true
thumbnail-img: /assets/img/python_logo.png
share-img: /assets/img/python_logo.png
show-avatar: false
---

In Python, `argparse` is the default module for parsing arguments from command line. The optional arguments in `argparse` can either be short options (single letter) such as `-s` or long options such as `--output_folder` which are usually defined with words. 

For long options, there is an interesting property of `argparse` which might be seen as a bug at first sight. Let's assume, we have a Python script that accepts two optional command line arguments `-s` as `bool` and `output_path` as `str`. Normally, these arguments are provided to the script as follows:
```
    python3 main.py -s True --output_folder <folder_name>
```
What happens if you try to run the same code like this:
```
    python3 main.py -s True --out /home/user/Documents
```
 Surprisingly, the script does not complain about unrecognized argument name `--out` and runs normally. This is because `argparse.ArgumentParser` method has a parameter called [`allow_abbrev`](https://docs.python.org/3/library/argparse.html#allow-abbrev) which is by default `True`. Thus, even if we don't type the whole long option name, it accepts the parameter unless it is unambiguous which means the first letter of the input argument `out` matches with the first letter of the optional argument `output_folder` . You can test this behavior with abbreviated inputs such as `--o` `--outp` etc.
 
If you want to allow only exact typing of your long options, you should initialize the argument parser as follows:
```
    parser = argparse.ArgumentParser(allow_abbrev=False)
```
This will disable the usage of abbreviated arguments and raise an unrecognized argument error when there is a mismatch between the input and given argument names. Here is an example [Colab](https://colab.research.google.com/drive/1p65PueCZHzWt6lgKfLp5u8JXFuf-NpKw?usp=sharing) notebook that shows the behavior of `allow_abbrev` parameter.

---
title: 0WM — OpMode installation guide
lang: en
description: Installation guide for the 0WM operator mode
p-install-opmode: true
sp-install: true
---

::: audience
**Target audience** Web administrators
:::

# Introduction

0WM OpMode is the operator dashboard for managing Wi-Fi surveys. It is currently used to upload floorplans, edit their boundaries and walls, georeference them on a world map, and send metadata to the 0WM Server. The project is not officially released, therefore its distribution channels are rather scarce at the moment. That being said, 0WM OpMode only consists of static HTML/JS code and does not need to be built.

# Website installation

We support two ways of installing the 0WM operator mode:

* With one of our [nightly Debian packages](#using-nightly-debian-packages);
* By [deploying its sources manually](#manually).

## Using nightly Debian packages

A convenient way for Debian users to install the operator mode is through the nightly Debian packages we provide. Currently, we package 0WM OpMode for the following distributions (architecture-independent):

| Distribution | Suites                  |
| ------------ | ----------------------- |
| Debian       | bookworm, trixie, forky |
| Ubuntu       | jammy, noble            |

Our nightly Debian packages are available in the [`nightly-deb` release page on GitHub](https://github.com/lab0-cc/0WM-OpMode/releases/tag/nightly-deb) and updated every day following a code change.

The Debian packages install 0WM OpMode’s static files into `/usr/share/0wm-opmode` and prompt for the URL at which the 0WM server’s API can be reached. This populates a `config.json` file which can later be modified manually (not recommended) or with:

```terminal
> dpkg-reconfigure 0wm-opmode
```

The files can then be served by the web server of your choice.

## Manually

If Debian is not your environment of choice or you want to contribute to the project’s code, 0WM OpMode can be fetched with:

```terminal
> git clone --recursive https://github.com/lab0-cc/0WM-OpMode.git
```

The only static files needed are `index.html` and the files located in the `css`, `fonts`, `img` and `js` directories. They can be copied to the directory of your choice, say `$MY_DIR`, with:

```terminal
> cp -rL css fonts img js index.html $MY_DIR
```

To work properly, 0WM OpMode requires a `config.json` file at its root telling the web page how to contact 0WM Server’s API. Assuming the API is reachable at `http://my-api:8080`, `config.json` should contain `{ "api": "http://my-api:8080" }`.


The files can then be served by the web server of your choice.

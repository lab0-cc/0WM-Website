---
title: 0WM
lang: en
description: 0WM project
p-index: true
---

# Introduction

0WM, pronounced /zʋʊm/ or /oʊm/, is a next-generation Wi-Fi mapping solution using off-the-shelf components and open standards to perform hassle-free, large-scale Wi-Fi surveys.

::: note
0WM is gradually shaping up to provide a production-grade infrastructure for Wi-Fi mapping. As we are smoothing out the rough edges, don’t hesitate to check back from time to time to see our progress.
:::

Wi-Fi has become so popular in recent years that your devices, at home or at work, are less and less likely to be connected to the Internet using a wire. Laptops themselves are slowly losing their Ethernet ports. And yet, deploying a reliable Wi-Fi network is no easy task, because of walls, urban wave pollution, or even weather radars. Professional Wi-Fi survey tools are so expensive that private individuals, associations, and small businesses cannot afford them, and free ones are too cumbersome.

The 0WM project strives to make high-quality Wi-Fi surveys affordable to everyone. Why would you need a dedicated device for Wi-Fi surveys when you already have a phone packed with sensors? Why would you need a dedicated wireless sensor when you already have factory-calibrated omnidirectional APs?

# Getting started

The 0WM software suite consists of the following components:

* [0WM Server](#zwm-server), 0WM’s backend, featuring all the hidden bits of logic, and exposing REST and WebSocket APIs;
* [0WM OpMode](#zwm-opmode), an operator frontend allowing to upload floorplans and position them on a map with precise georeferencing;
* [0WM Client](#zwm-client), a mobile frontend allowing to perform real-time Wi-Fi surveys;
* [0WM AP](#zwm-ap), pieces of software and configuration to properly setup an AP for 0WM.

## Prerequisites

To setup 0WM on a production environment, you need:

* A [supported platform](https://ocaml.org/tools/native-target#platform-support) to run the server;
* An access point with OpenWRT installed;
* A smartphone with WebXR support and a wired connection to the AP (most likely through a USB-C to Ethernet adapter).

## Software

### 0WM Server[](https://github.com/lab0-cc/0WM-Server) {#zwm-server}

The 0WM Server is the central backend of 0WM, handling all its core logic. It manages floorplans and Wi-Fi measurement sessions, stores the data, and exposes REST and WebSocket APIs used by the project’s frontends.

<p class="buttons">[Installation guide](install-server.md){.button}[User guide](guide-server.md){.button}</p>

### 0WM OpMode[](https://github.com/lab0-cc/0WM-OpMode) {#zwm-opmode}

The 0WM Opmode is an operator dashboard frontend that communicates with the server to upload floorplans, edit boundaries, and position them on a map with precise georeferencing.

<p class="buttons">[Installation guide](install-opmode.md){.button}[User guide](guide-opmode.md){.button}</p>

### 0WM Client[](https://github.com/lab0-cc/0WM-Client) {#zwm-client}

The 0WM Client is a mobile frontend that allows you to perform real-time Wi-Fi surveys. It fetches floorplans from the server, retrieves Wi-Fi scan data from an access point, uses WebXR to track position and movement, and streams measurements back to the server in real-time.

<p class="buttons">[Installation guide](install-client.md){.button}[User guide](guide-client.md){.button}</p>

### 0WM AP {#zwm-ap}

Unlike the other 0WM software components, this one is more of a collection of tools and settings to configure compatible access points (currently those running OpenWRT).

<p class="buttons">[Installation guide](install-ap.md){.button}</p>

## Your first survey

Once the software components are [configured and running](install.md) in your environment, a typical survey workflow operates as follows:

1. Upload your floorplan in 0WM OpMode and fill in the necessary information;
2. Perform the survey in 0WM Client by navigating in your building and taking measurements;
3. Review your survey in 0WM OpMode (feature not yet available).

You can find more information on how to use all the 0WM components in [our dedicated page](guides.md)

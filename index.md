---
title: 0WM
lang: en
description: 0WM project
---

# Introduction

0WM, pronounced /zʋʊm/ or /oʊm/, is a next-generation Wi-Fi mapping solution using off-the-shelf components and open standards to perform hassle-free, large-scale Wi-Fi surveys.

::: note
0WM is gradually shaping up to provide a production-grade infrastructure for Wi-Fi mapping. As we are smoothing out the rough edges, don’t hesitate to check back from time to time to see our progress.
:::

Wi-Fi has become so popular in recent years that your devices, at home or at work, are less likely to be connected to the Internet using a wire. Laptops themselves are slowly losing their 8P8C (RJ45 / Ethernet) ports. And yet, deploying a reliable Wi-Fi network is no easy task, because of walls, urban wave pollution, or even weather radars. Professional Wi-Fi survey tools are so expensive that private individuals, associations, and small businesses cannot afford them, and free ones are too cumbersome.

0WM makes high-quality Wi-Fi surveys affordable to everyone. Why would you need a dedicated device for Wi-Fi surveys when you already have a phone packed with sensors? Why would you need a dedicated wireless sensor when you already have factory-calibrated omnidirectional APs?

# Getting started

The 0WM software suite consists of the following components:

* **0WM Server**, 0WM’s backend, featuring all the hidden bits of logic, and exposing REST and WebSocket APIs;
* **0WM OpMode**, an operator frontend allowing to upload floorplans and position them on a map with precise georeferencing;
* **0WM Client**, a mobile frontend allowing to perform real-time Wi-Fi surveys;
* **0WM AP**, pieces of software and configuration to properly setup an AP for 0WM.

## Prerequisites

To setup 0WM on a production environment, you will need:

* A [supported platform](https://ocaml.org/tools/native-target#platform-support) to run the server;
* An access point with OpenWRT installed;
* A smartphone with WebXR support and a wired connection to the AP (most likely through a USB-C to Ethernet adapter).

## Software

### 0WM Server[](https://github.com/lab0-cc/0WM-Server)

The 0WM Server is the central backend of 0WM, handling all its core logic. It manages floorplans and Wi-Fi measurement sessions, stores the data, and exposes REST and WebSocket APIs used by the project’s frontends.

For full installation and configuration instructions, please refer to the [0WM-Server repository](https://github.com/lab0-cc/0WM-Server).

### 0WM OpMode[]("https://github.com/lab0-cc/0WM-OpMode")

The 0WM Opmode is an operator dashboard frontend that communicates with the server to upload floorplans, edit boundaries, and position them on a map with precise georeferencing.

When creating a new project, you will be prompted to upload a file. Select a clear, top-down floorplan image (PNG, JPEG, WebP) of the building you want to import, and draw its boundaries and walls in the **Floorplan Editor**. In the **Map Editor**, you will place 3 anchor points to map the floorplan to the real world. We recommend putting these anchors at places that easy to locate on both the floorplan and the world map, to ensure accurate positioning. Lastly, provide the altitude parameters (you only need to fill in 2 of the floor altitude, ceiling altitude, and height fields) in the **Additional Parameters** panel.

```{=html}
<img class="window" src="/img/opmode.png" alt="0WM OpMode">
```

### 0WM Client[](https://github.com/lab0-cc/0WM-Client)

The 0WM Client is a mobile frontend that allows you to perform real-time Wi-Fi surveys. It fetches floorplans from the server, retrieves Wi-Fi scan data from an access point, uses WebXR to track position and movement, and streams measurements back to the server in real-time.

For full installation and deployment instructions, please refer to the [0WM-Client repository](https://github.com/lab0-cc/0WM-Client).

<div class="phone">![0WM client](/img/client.png)</div>

### 0WM AP

Unlike the other 0WM software components, this one is more of a collection of tools and settings to configure compatible access points (currently, mock and OpenWRT APs). For detailed instructions on configuring supported access points, please see our dedicated [configuration guide](ap.md).

## Survey Workflow

Once the software components are running in your environment, a typical survey workflow operates as follows:

1. Start the **0WM Server** to act as the central hub;
2. Prepare the survey in the **0WM OpMode**: upload a floorplan image, draw walls and boundaries, define your geo-anchors and altitude parameters, and synchronize this data with the server;
3. Perform the survey in the **0WM Client**: connect to both the server and the AP, select your floorplan, walk around your surveying area and perform Wi-Fi measurements.

# Running the client

Testing the 0WM client requires specific network and browser configurations depending on your environment. Please see the detailed [client guide](client.md) for complete instructions and configuration examples.

# Environment

Before taking this course, you will need to download various pieces of software. This document will guide you through that process in a beginner-friendly manner. If you have any issues configuring your system, please seek help as soon as possible. You have the internet, office hours, and Campuswire at your disposal.

## Index

- [Runtime](#runtime)
  - [Installing Node.js and NPM](#installing-nodejs-and-npm)
- [Version Control: Git](#version-control-git)
  - [Installing Git](#installing-git)
- [Text Editor](#text-editor)

  - [Installing VScode](#installing-vscode)
    - [Extensions](#vscode-extensions)
    - [Configuration](#configuration)

- TL;DR
  - [Install Node.js and npm](#installing-nodejs-and-npm)
  - [Install Git](#installing-git)
  - [Install VSCode](#installing-vscode)
    - Watch: <https://www.youtube.com/watch?v=B-s71n0dHUk>

## (Optional) Windows Subsystem for Linux

If you are on Windows, it is worthwhile to consider installing [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/wsl/about). Windows is notoriously difficult to configure with software development applications. So switching now will save you a headache down the road.

Here is an [installation page](https://learn.microsoft.com/en-us/windows/wsl/install) if you are interested.

## Runtime

From the [Wikipedia page on Runtime Systems](https://en.wikipedia.org/wiki/Runtime_system):

> In computer programming, a runtime system or runtime environment is a sub-system that exists both in the computer where a program is created, as well as in the computers where the program is intended to be run.

In the past, you might have had to install Java on your system. You were installing the runtime responsible for executing your Java source code. In this course, you will be programming in TypeScript, which is compiled (transformed or made) into JavaScript, then run using a JavaScript runtime system.

[Node.js](https://nodejs.org/en/about/) is a popular JavaScript runtime designed for making web applications. It comes bundled with a complete standard library and access to a public repository of millions of third-party packages. It builds upon the JavaScript runtime that is used in Google Chrome.

### Installing Node.js and NPM

External Tutorials:

- [How to Install NodeJS/NPM on Windows (1m53s)](https://www.youtube.com/watch?v=6EwGA0StTeM)
- [How To Install NPM and NodeJs On Mac OS (1m22s)](https://www.youtube.com/watch?v=Ue6g4udgbdI)
- [Follow the documentation on the npm website for Linux](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

Text Tutorial (Windows and macOS):

- Go to the [Node.js download page](https://nodejs.org/en/download/) to download the installer for your system
  - Windows: Choose the Windows Installer (.msi)
    - If you don't know if you are 64-bit or 32-bit, [use this Microsoft Support Page](https://support.microsoft.com/en-us/topic/determine-whether-your-computer-is-running-a-32-bit-version-or-64-bit-version-of-the-windows-operating-system-1b03ca69-ac5e-4b04-827b-c0c47145944b)
  - macOS: Choose the macOS Installer (.pkg)
- Run the installer with the default options
- After the installer has finished, you can close it

To verify Node.js and `npm` installed:

- Open a Terminal
  - Windows: Press the Windows key and search for a program called "Powershell"
  - macOS: Use the spotlight search and search for "Terminal"
- Type in the command `node --version` and press enter
  - You should see something like `v18.10.0` printed
- Type in the command `npm --version` and press enter
  - You should see something like `8.19.2`

If you do not see both version numbers, you did not install them correctly.

## Version Control: Git

Sometime after the first midterm, there will be a lecture about version/source control. A version control system (VCS) is responsible for managing and tracking all changes to a collection of software files (called a repository). In team environments, it is extraordinarily useful. Each team member has their local copy of the repository and changes for specific files.

Git is the most popular version control system in use today. It might be helpful to familiarize yourself with Git before it is discussed in class. Here are some optional resources if you are interested:

- [Learn Git In 15 Minutes](https://www.youtube.com/watch?v=USjZcfj8yxE)

  - [Notes](https://www.notion.so/zarkom/Introduction-to-Git-ac396a0697704709a12b6a0e545db049)

- [Git and Github for Beginners (1 hour 28 minutes)](https://www.youtube.com/watch?v=RGOj5yH7evk)

It is perfectly OK if Git seems too daunting. In the meantime, it is a good idea to use something to back up your work until Git is covered:

- [Microsoft OneDrive](https://onedrive.live.com/)
- [Google Drive](https://www.google.com/drive/download/)
- [Dropbox](https://www.dropbox.com/desktop)

### Installing Git

External Tutorials:

- [How to install Git on Windows 10 (4m57s)](https://www.youtube.com/watch?v=6EwGA0StTeM)
- [How to install Git on Mac (4m36s)](https://www.youtube.com/watch?v=26hzQ6KWhDM)
  - Prerequisite: [How to install Homebrew on MacOs (4m52s)](https://www.youtube.com/watch?v=UBdiA0SJqLE)

Text Tutorial (**Windows**):

1. Navigate to the Git [Downloads for Windows](https://git-scm.com/download/win) page
2. Download the "Standalone Installer" for your system type
   - If you don't know if you are 64-bit or 32-bit, [use this Microsoft Support Page](https://support.microsoft.com/en-us/topic/determine-whether-your-computer-is-running-a-32-bit-version-or-64-bit-version-of-the-windows-operating-system-1b03ca69-ac5e-4b04-827b-c0c47145944b)
3. Run the installer with the default options
4. After the installer is finished, you can close it
5. Open Powershell (Press the Windows key -> Search for "Powershell")
6. Run the command `git --version`

You should see something like this:

```text
git version 2.39.0
```

Text Tutorial (**MacOS**):

To install `git` on macOS, you should first install [Homebrew](https://brew.sh/).

1. Open a terminal (Spotlight Search -> Search for "Terminal")
2. Paste the following command into the terminal and press enter: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
3. After the Homebrew is installed, close, then reopen the terminal
4. Run the command `brew install git`
5. After `git` has been installed, close, then reopen the terminal
6. Run the command `git --version`

```text
git version 2.39.0
```

## Text Editor

You are allowed to use any editor that you prefer. This class recommends that you use [VSCode](https://code.visualstudio.com/).

If you are unfamiliar with VSCode, it is recommended that you watch [this video (7m16s)](https://www.youtube.com/watch?v=B-s71n0dHUk) or read [this page](https://code.visualstudio.com/docs/editor/codebasics), particularly the sections on keyboard shortcuts, save/auto-save, and finding and replacing. There are a lot of features aimed to facilitate your productiveness - use them to your advantage.

The document on [editing homework](./EDITING.md) covers how to extract, open, and modify projects.

## Installing VSCode

1. Open the [VSCode download page](https://code.visualstudio.com/Download)
2. Download the installer for your system (click the large button under your system's icon)
   - Windows: If you don't know if you are 64-bit or 32-bit, [use this Microsoft Support Page](https://support.microsoft.com/en-us/topic/determine-whether-your-computer-is-running-a-32-bit-version-or-64-bit-version-of-the-windows-operating-system-1b03ca69-ac5e-4b04-827b-c0c47145944b)
3. Run the installer with the default options
4. After the installer has finished, you can close it

### VSCode Extensions

The majority of [VSCode is written in TypeScript](https://github.com/Microsoft/vscode), so a lot of TS/JS features come standard with the default installation. The following extensions may be useful:

- [VSCode ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [VSCode Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)

You can install these extensions through the [VSCode Extensions tab](https://code.visualstudio.com/docs/editor/extension-marketplace).

### Configuration

You can [configure VSCode](https://code.visualstudio.com/docs/getstarted/settings) to your liking (`File -> Preferences -> Settings`). Settings specific to TypeScript can be found by typing `typescript.` in the search bar.

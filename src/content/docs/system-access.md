---
title: System Access
description: Obtaining an Expanse account, logging in with SSH and 2FA, and using the Expanse User Portal.
---

As an ACCESS computing resource, _Expanse_ is accessible to ACCESS users who are given time on the system. To obtain an account, users may submit a proposal through the [ACCESS Allocation Request System](https://allocations.access-ci.org/) or request a [Trial Account](mailto:consult@sdsc.edu).

Interested parties may contact the [ACCESS Help Desk](https://support.access-ci.org/?check_logged_in=1) for help with an _Expanse_ proposal (see sidebar for contact information).

## Logging in to Expanse

_Expanse_ supports access via the command line using an ACCESS-wide password or ssh-keys with TOTP (see setup instructions below), and web-based access via the [Expanse User Portal](https://portal.expanse.sdsc.edu). While CPU and GPU resources are allocated separately, the login nodes are the same. To log in to _Expanse_ from the command line, use the hostname:

```bash
login.expanse.sdsc.edu
```

The following are examples of Secure Shell (ssh) commands that may be used to log in to _Expanse_:

```bash
ssh <your_username>@login.expanse.sdsc.edu
ssh -l <your_username> login.expanse.sdsc.edu
```

### Notes and hints

- When you log in to expanse.sdsc.edu, you will be assigned one of the two login nodes login0[1-2]-expanse.sdsc.edu. These nodes are identical in both architecture and software environment. Users should normally log in through login.expanse.sdsc.edu, but may specify one of the two nodes directly if they see poor performance.
- Please feel free to append your public key to your ~/.ssh/authorized_keys file to enable access from authorized hosts without having to enter your password. We accept RSA, ECDSA and ed25519 keys. Make sure you have a strong passphrase on the private key on your local machine.
  - You can use ssh-agent or keychain to avoid repeatedly typing the private key password.
  - Hosts which connect to SSH more frequently than ten times per minute may get blocked for a short period of time
- Do not use the login nodes for computationally intensive processes, as hosts for running workflow management tools, as primary data transfer nodes for large or numerous data transfers or as servers providing other services accessible to the Internet. The login nodes are meant for file editing, simple data analysis, and other tasks that use minimal compute resources. All computationally demanding jobs should be submitted and run through the batch queuing system.
- Login nodes are not the same as the batch nodes, Users should request an interactive sessions to compile programs.

## 2FA with Authenticator Authenticator (Required)

_Expanse_ uses two-factor authentication (2FA) when using a password to log in. 2FA adds a layer of security to your authentication process.

### Install Authenticator App:

Users will first need to Install an authenticator app on their smartphone or other device. Users can use any app that supports importing TOTP 2FA codes with a QR code. (Google Authenticator, DUO Mobile App, LastPass Authenticator App, etc) We suggest using the Google Authenticator app if you do not an athenticator application already istalled on your mobile device.

[Google Authenticator for Apple IOS](https://apps.apple.com/us/app/google-authenticator/id388497605)

[Google Authenticator for Android](https://authenticator.en.uptodown.com/android)

Once the authenticator app has been installed, users will need to enroll and pair the 2FA device with their _Expanse_ Account.

### To enroll:

1. Go to the website [https://passive.sdsc.edu](https://passive.sdsc.edu)
2. Select the appropriate option:

   **Login using Globus** – Select if you are an ACCESS allocated user. You will be redirected to the Globus OpenID connect authorization site. Please choose ACCESS CI as the organization (_not_ your home institution).

   **I have an invitation** - Select if you are **NOT** an ACCESS allocated user. You will need to contact SDSC support at [consult@sdsc.edu](mailto:consult@sdsc.edu) to receive an invitation.

3. Once logged in you can manage your 2FA enrollment. Click on the “Manage 2FA” button and follow the instructions to scan the QR code. Once the pairing is complete you can close the browser. (_NOTE: This change make take up to 15 minutes to update on the system_)
4. You can login to Expanse using any ssh client. For example, from a terminal window on a Mac you can do:

```bash
ssh <your_username>@login.expanse.sdsc.edu
ssh -l <your_username> login.expanse.sdsc.edu
```

You will either be prompted for a password (for ACCESS users this is their ACCESS portal password) followed by a prompt for the TOTP number from your authenticator app OR if you have a ssh key in place on Expanse, and the corresponding private key loaded in your ssh-agent, you will skip straight to the prompt for your TOTP code.

_Note: If you already enrolled in 2FA before Feb 24, 2025, you do not need to re-enroll as we will incorporate your existing 2FA information into the new setup_.

## Expanse User Portal

The [**Expanse User Portal**](https://portal.expanse.sdsc.edu) provides a quick and easy way for _Expanse_ users to log in, transfer and edit files, and submit and monitor jobs. The Portal provides a gateway for launching interactive applications such as MATLAB, RStudio, and an integrated web-based environment for file management and job submission. All ACCESS users with a valid _Expanse_ allocation have access via their ACCESS-based credentials.

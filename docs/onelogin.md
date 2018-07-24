# Strongbox: OneLogin Setup

**1.** Add a new application to OneLogin:

 1. Select `Apps > Add Apps` from the top bar.
 1. Search for "OneLogin SAML Test (IdP) w/ NameID (persistent)".
 1. Change the `Display Name` to "Strongbox".
 1. (Optional) Upload custom icons.
 1. Click `Save`.

 ![initial application configuration screenshot](https://raw.githubusercontent.com/wiki/sjansen/strongbox/images/onelogin-1-9749c1a6.png)

**2.** Switch to the `Configuration` tab and enter the values from Terraform:

 1. SAML Consumer URL
 1. SAML Audience
 1. SAML Single Logout URL
 1. ACS URL Validator

 ![Terraform output added screenshot](https://raw.githubusercontent.com/wiki/sjansen/strongbox/images/onelogin-2-6166dea9.png)

**3.** Switch to the `Parameters` tab and add parameters:

 ![adding a parameter screenshot](https://raw.githubusercontent.com/wiki/sjansen/strongbox/images/onelogin-3-63ec5da1.png)

   SAML Field | Value
 |------------|------------|
   email      | Email
   familyName | Last Name
   givenName  | First Name

 ![parameters added screenshot](https://raw.githubusercontent.com/wiki/sjansen/strongbox/images/onelogin-4-b1790076.png)

**4.** Save your changes, then select `More Actions > SAML Metadata` to download configuration details for Cognito.

 ![downloading SAML metadata screenshot](https://raw.githubusercontent.com/wiki/sjansen/strongbox/images/onelogin-5-db208cd6.png)

**5.** See the OneLogin documentation for instructions on how to add users and grant them access to applications.

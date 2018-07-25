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

**6.** Add a SAML identity provider to the user pool created by Terraform:

 1. Log in to the the AWS console and navigate to the user pool created by Terraform.
 1. Click on `Federation > Identity providers`
 1. Select the `SAML` identity provider option.
 1. Upload the SAML metadata file downloaded earlier.
 1. Enter "OneLogin" as the `Provider name`.
 1. Click `Enable IdP sign out flow` to enable it.
 1. Click `Create Provider`.

 ![SAML identity provider screenshot](https://raw.githubusercontent.com/wiki/sjansen/strongbox/images/onelogin-6-b033ae1e.png)

**7.** Configure the SAML identity provider's attribute mapping.

 1. Click on `Federation > Attribute mapping`
 1. Click on the `SAML` tab.
 1. Add the SAML sttributes configured in OneLogin earlier.
 1. Click `Save changes`.

   SAML Attribute | User Pool Attribute
 |----------------|---------------------|
   email          | Email
   familyName     | Family Name
   givenName      | Given Name

 ![attributes mapped screenshot](https://raw.githubusercontent.com/wiki/sjansen/strongbox/images/onelogin-7-e964a21b.png)

**8.** Configure the strongbox app client settings:

 1. Click on `App integration > App client settings`
 1. Click on the "OneLogin" identity provider to enable it.
 1. Enter "http://localhost:3000/cognito/signin" for the `Callback URL(s)`.
 1. Click `Authorization code grant` to enable it.
 1. Click `email`, `openid`, `aws.cognito.signin.user.admin`, and `profile` to enable them.
 1. Click `Save changes`.

 ![app client settings screenshot](https://raw.githubusercontent.com/wiki/sjansen/strongbox/images/onelogin-8-89e68f15.png)

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to SFCC versioning practice where the Year is the
first number and the Month is the second number. The third number will be
bumped for multiple releases during one month.

<!-- BEGIN RELEASE NOTES -->
### [Unreleased]

#### Added

- Added pre-commit to the repository and ran across all files

#### Changed

- Updated the legacy `_learnq` js object to the new `klaviyo` js object.

### [21.10.0] - 2021-10-14

#### Fixed

- Order Confirmation event will now correctly fire for orders with coupons.
- Order Confirmation will now correctly fire if product has no primary category.

#### Changed

- Rename sendEmail function to trackEvent
- Fix grammar/typos in comments and docstrings
- Remove unused functions from Core and SG cartridges
  - sendOrderEmail from Core emailUtils
  - sendKlaviyoShipmentEmail from SG Klaviyo.js controller
- Increased logging coverage for easier debugging
- Updated documentation included with cartridge

### [21.7.0] - 2021-7-27

#### Changed

- Remove unused functions from SFRA and Core cartridges
  - SFRA controller functions
    - FooterSubscribe
    - Subscribe
    - ShipmentConfirmation
  - buildCartDataLayer from SFRA klaviyoUtils
  - sendShipmentConfirmation from Core klaviyoUtils
- Removed unused pageFooter.isml file from SFRA cartridge

### [20.11.0] - 2020-11-25

#### Added

- Enable Prophet debugger to detect cartridge.
- Enable watch and upload cartridge with sgmf cli tool.
- Fix image size and email that can crash if empty.
- Add trackViewedItem for profile tracking.
<!-- END RELEASE NOTES -->

<!-- BEGIN LINKS -->
[Unreleased]: https://github.com/klaviyo/SFCC_Klaviyo/compare/21.10.0...HEAD
[21.10.0]: https://github.com/klaviyo/SFCC_Klaviyo/compare/21.7.0...21.10.0
[21.7.0]: https://github.com/klaviyo/SFCC_Klaviyo/compare/20.11.0...21.7.0
[20.11.0]: https://github.com/klaviyo/SFCC_Klaviyo/compare/20.1.0...20.11.0
[20.1.0]: https://github.com/klaviyo/SFCC_Klaviyo/compare/da798cc8d3aeda9465bc9c4bb65d5184e4116e4f...20.1.0
<!-- END LINKS -->

#### NOTE

- The CHANGELOG was created on 2020-11-25 and does not contain information about earlier releases

# Generative.xyz Ordinals Exporter

## Purpose
This script will allow you to export a Bitcoin Ordinals list from a specific collection on [generative.xyz](https://www.generative.xyz), that can then be used with other marketplaces such as [Magic Eden](https://magiceden.io/ordinals).  

This script requries the collection ID, which can be found in the URL when viewing the collection on [generative.xyz](https://www.generative.xyz).  For example, the Ordinal Dungeons collection available at [Ordinal Dungeons](https://generative.xyz/generative/1001895) has a url of: https://generative.xyz/generative/1001895.  

In this URL, 1001895 is the collection ID needed to by the script.

## Installation
To install this package, clone the repo using the button top right, then run the following command:
```bash
npm install
```

## Usage
To run the script and create the JSON required for Magic Eden and output it to the console, run the following command:
```bash
node ./index.js <collectionId> <maxIndex>
```

For example, to download the JSON for the above Ordinal Dungeons collection, which contains 128 different ordinals, run the following command:
```bash
node ./index.js 1001895 128 >dungeons.json
```

This command will output all 128 inscriptions from the Ordinal Dungeons collection, and redirect the output to a file called **dungeons.json** in the current directory.

## Example Output
The script will create a JSON file compatible with [Magic Eden](https://magiceden.io/ordinals).  An example output file is show in the [example_output.json](./example_output.json) in the root directory of the repo.

This has the following format:
```json
[{
  "id": "cfaecf0642df4dd419f0b45bc29a39fc9a6439149f3d2b0cc663636ccf2425abi0",
  "meta": {
    "name": "Ordinal Dungeons #1",
    "high_res_img_url": "https://cdn.generative.xyz/btc-projects/ordinaldungeons/svg.zip_unzip/svg/1.svg"
  }
}, {
  "id": "6373124483ca3ca127c6ef86fe604cd492447dcc2efff35bfbdc719fa9e11e53i0",
  "meta": {
    "name": "Ordinal Dungeons #2",
    "high_res_img_url": "https://cdn.generative.xyz/btc-projects/ordinaldungeons/svg.zip_unzip/svg/10.svg"
  }
}]
```

## Notes
This script was created by the [@Dungeons_NFT](https://twitter.com/dungeons_nft) developer [@steddyman](https://twitter.com/steddyman) for use in submitting the collection to Magic Eden.

It is possible that as the [generative.xyz](https://www.generative.xyz) site changes over time and this script may need updates.  

If you found this script useful, be sure to give me a follow on twitter at ([@steddyman](https://twitter.com/steddyman)).

Feel free to contribute to this project or let me know if it needs any updates.
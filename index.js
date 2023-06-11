const fetch = require('node-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const beautify = require('js-beautify').js;

// Check we have a single command line parametern and extract the value into a variable called collectionId
if (process.argv.length !== 4) {
    console.error('Usage: node index.js <collectionId> <numTokens>');
    process.exit(1);
}
const collectionId = process.argv[2];
const numTokens = process.argv[3];

(async () => {
    // async code here
    try {
        // Let's assume we have a function named fetchData() that returns a promise.
        const _mainUrl = `https://generative.xyz/generative/${collectionId}?mode=pro`
        // Load the collection page
        const res = await fetch(_mainUrl);
        // Get the HTML text
        const html = await res.text();
        // Parse the HTML text into a DOM tree
        const dom = new JSDOM(html);
        // Get the <script> tag whose src property includes the string "pages/_app-"
        const script = dom.window.document.querySelector('script[src*="pages/_app-"]');
        // set script url and load the contrents of the script using fetch
        const scriptUrl = `https://generative.xyz${script.src}`;
        const scriptResponse = await fetch(scriptUrl);
        // Get the script text
        const scriptText = await scriptResponse.text();
        // Beautify the script text
        let prettyPrintedScript = beautify(scriptText, {
            indent_size: 2,
            space_in_empty_paren: true
        });
        // Find the first occurence of the string 59662: function(e, t, r)
        const start = prettyPrintedScript.indexOf('59662: function(e, t, r)');
        // Search forward from this point for the definition of n where n is defined as 'let n = "number"' where number can be any hexadecimal string
        const ndef = prettyPrintedScript.indexOf('let n = "', start);
        // Get the value of n which is an hexacimal string and will be the project code
        const project = prettyPrintedScript.substring(ndef + 9, ndef + 9 + 42);
        // console.log(`Project code for collectionId ${collectionId} is ${project}`);
        // Get the collection overview for the name
        const collectionInfoUrl = `https://generative.xyz/generative/api/project/${project}/tokens/${collectionId}`;
        const collectionResponse = await fetch(collectionInfoUrl).then(res => res.json());
        // Check there are no errors
        if (collectionResponse.error != null) {
            console.error('Error downloading collection data:', traitsResponse.error);
            exit(1);
        }
        // Get collection name
        const collectionName = collectionResponse.data.name;
        // Get the collection info URL
        const url = `https://generative.xyz/generative/api/project/${collectionId}/tokens?sort=newest&limit=${numTokens}`;
        const response = await fetch(url).then(res => res.json());
        // Check there are no errors
        if (response.error != null) {
            console.error('Error downloading collection data:', response.error);
            exit(1);
        }
        const data = response.data.result;
        // Cycle through the collection and build the collection data for postbin
        let traits = [];
        for(let i = 0; i < data.length; i++) {
            const token = data[i];
            const id = token.tokenID;
            const image = token.image;
            const index = token.orderInscriptionIndex;
            traits.push({
                id: id,
                meta: {
                    name: `${collectionName} #${index}`,
                    high_res_img_url: image
                }
            });
        }
        // convert to json
        const traitsJSON = JSON.stringify(traits);
        // pretty print the traits json
        let prettyPrintedJSON = beautify(traitsJSON, {
            indent_size: 2,
            space_in_empty_paren: true
        });
        // console.log('Collection data:')
        console.log(prettyPrintedJSON);
        // console.dir(traits, { depth: null });
    } catch (error) {
        console.error('Error:', error);
    }
})();
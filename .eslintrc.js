module.exports = {
    "extends": "airbnb",
    "env": {
      "browser": true
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      "vars-on-top": 1,
      "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }]
    }
};

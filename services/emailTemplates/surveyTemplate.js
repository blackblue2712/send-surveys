const keys = require("../../config/keys");

module.exports.defaultTemplate = survey => {
    return `
        <style>
            * { color: red }
        </style>
        <div style="text-align: center;">
            <h3>I'd like your input</h3>
            <p>Please answer the following question: </p>
            <p>${survey.body}</p>
            <div>
                <a href="${keys.redirectDomain}/services/surveys/${survey._id}/yes">Yes</a>
            </div>
            <div>
                <a href="${keys.redirectDomain}/services/surveys/${survey._id}/no">No</a>
            </div>
        </div>
    `
}
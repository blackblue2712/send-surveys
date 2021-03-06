const keys = require("../../config/keys");

module.exports.defaultTemplate = (survey, isTrackingData) => {
    let buttonTracking = "";
    isTrackingData == "true" ?
    buttonTracking = `<a style="text-decoration: none; margin-right: 1rem; padding: .5rem 1rem; background-color: #c5ffd2; border-radius: 1rem;" href="${keys.redirectDomain}/services/surveys/${survey._id}/yes/${survey.owner}">Yes</a>
                        <a style="text-decoration: none; margin-right: 1rem; padding: .5rem 1rem; background-color: #ffd4d4; border-radius: 1rem;" href="${keys.redirectDomain}/services/surveys/${survey._id}/no/${survey.owner}">No</a>`
                   : "";
    return `
    <div>
        <h3 style="text-align: center;">[Surveys] # <a style="text-decration: none;" href="${keys.redirectDomain}">Liars Surveys</a></h3>
        <p style="padding: 1rem 0">${survey.body}</p>
        <p style="text-align: center">
            ${ buttonTracking }
        </p>
    </div>
    `
}
exports.add = async (req, res)=>{

    const {google} = require("googleapis");
    
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })

    const client = await auth.getClient();

    const googleSheets = google.sheets({
        version: "v4",
        auth: client
    })

    spreadsheetId = ""; //add your spreadsheet Id

    const row = await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Página1",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[ req.body.code ]]
        }        
    })
    console.log(row)
    res.json({ row })
}

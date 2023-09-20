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

    spreadsheetId = "1q6uH00wREt22NxNnWysoyIaSdyWG6NBGYcY08CbRDBI";
    const {
        Nserie,
        patrimonio,
        local,
        inventariante,
        obs,
        statusBem,
        tipoBem
    } = req.body;

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const dataAtual = today.toLocaleDateString(); 
    const horaAtual = today.toLocaleTimeString(); 

    const row = await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Página1",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                [   
                    dataAtual.concat(' ' + horaAtual ),
                    patrimonio, 
                    Nserie, 
                    inventariante, 
                    local, 
                    obs, 
                    statusBem, 
                    tipoBem  
                ]
            ]
        }        
    })
    console.log(row)
    res.json({ row })
}

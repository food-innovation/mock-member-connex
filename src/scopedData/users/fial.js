const json = `{
  "firstname":"Testy",
  "mail":"testy.mctestface@test.tes",
  "Employer":[
     {
        "Company":[
           {
              "Group":[
                 {
                    "name":"Business - Small",
                    "type":"Stakeholder Type"
                 }
              ],
              "name":"TestyCorp Pty Ltd",
              "id": 12265
           }
        ],
        "role":"Account",
        "department":"Finance"
     }
  ],
  "telmobile":"021 345 678",
  "id":13616,
  "fullname":"Testy McTestface",
  "lastname":"McTestface"
}`

module.exports = JSON.parse(json)
